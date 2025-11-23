#!/usr/bin/env bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# -----------------------
# User-configurable values
# -----------------------
DB_NAME="johnData"
DB_USER="application"
DB_PASS="admin"
SPRING_APP_DIR="/vagrant/backend"
REACT_DIR="/vagrant/frontend"
CERTS_DIR="/vagrant/certs"   # optional: mkcert output there
# -----------------------

# Update and basic tools
apt-get update
apt-get install -y curl gnupg2 ca-certificates lsb-release apt-transport-https

# -----------------------
# Install MariaDB server
# -----------------------
apt-get install -y mariadb-server
systemctl enable mariadb
systemctl start mariadb

# Secure / create DB & user (noninteractive)
mysql -u root <<SQL
CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;
CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost' IDENTIFIED BY '${DB_PASS}';
GRANT ALL PRIVILEGES ON \`${DB_NAME}\`.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;
SQL

# -----------------------
# Install Java (OpenJDK 21)
# -----------------------
apt-get install -y openjdk-21-jdk


# #If you'd want to build the project when making the VM instead of starting with the build then uncomment this
# -----------------------
# Build Spring Boot backend
# -----------------------
#if [ -d "${SPRING_APP_DIR}" ]; then
#  cd "${SPRING_APP_DIR}"
#  # if gradlew exists, make executable and build
#  if [ -f "./gradlew" ]; then
#    chmod +x ./gradlew
#    ./gradlew clean bootJar -x test
#    mv build/libs/*.jar /vagrant/backend-app.jar || true
#  else
#    echo "No gradlew found in ${SPRING_APP_DIR}. Skipping build."
#  fi
#fi

# -----------------------
# Create application.properties for Spring if not present
# -----------------------
#SPRING_PROPS="/vagrant/backend/src/main/resources/application.properties"
#if [ ! -f "${SPRING_PROPS}" ]; then
#  mkdir -p "$(dirname "${SPRING_PROPS}")"
#  cat > /vagrant/backend/src/main/resources/application.properties <<EOF
#spring.datasource.url=jdbc:mariadb://localhost:3306/${DB_NAME}
#spring.datasource.username=${DB_USER}
#spring.datasource.password=${DB_PASS}
#spring.jpa.hibernate.ddl-auto=update
#spring.jpa.database-platform=org.hibernate.dialect.MariaDBDialect
#server.port=8080
#EOF
#  echo "Wrote a default application.properties in your backend project (you can override it)"
#fi

# -----------------------
# Create systemd unit for Spring Boot (auto-start)
# -----------------------
cat > /etc/systemd/system/springapp.service <<'UNIT'
[Unit]
Description=Slordle spring boot backend
After=network.target mariadb.service

[Service]
User=root
WorkingDirectory=/vagrant
ExecStart=/usr/bin/java -jar /vagrant/backend/backend-app.jar
SuccessExitStatus=143
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
UNIT

systemctl daemon-reload
systemctl enable springapp
# start service only if jar exists
if [ -f /vagrant/backend-app.jar ]; then
  systemctl start springapp || journalctl -u springapp --no-pager -n 200
else
  echo "Spring jar not found, service created but not started."
fi


# Uncomment if starting from unbuilt project
# -----------------------
# Install Node.js & build React
# -----------------------
#curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
#apt-get install -y nodejs
#if [ -d "${REACT_DIR}" ]; then
#  cd "${REACT_DIR}"
#  npm ci || npm install
#  npm run build || echo "React build failed; if using older react-scripts check your config"
#  # copy build to web root
#  mkdir -p /var/www/myapp
#  cp -r build/* /var/www/myapp/
#fi

# -----------------------
# Install nginx and configure
# -----------------------
apt-get install -y nginx

# If certs provided by host (mkcert), use them; otherwise create self-signed
SSL_CERT="/etc/ssl/certs/appvm.crt"
SSL_KEY="/etc/ssl/private/appvm.key"
if [ -d "${CERTS_DIR}" ] && [ -f "${CERTS_DIR}/appvm.pem" ] && [ -f "${CERTS_DIR}/appvm-key.pem" ]; then
  cp "${CERTS_DIR}/appvm.pem" "${SSL_CERT}"
  cp "${CERTS_DIR}/appvm-key.pem" "${SSL_KEY}"
else
  echo "No host certs found in ${CERTS_DIR}. Generating self-signed cert (browser will warn)."
  openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout "${SSL_KEY}" -out "${SSL_CERT}" -subj "/C=US/ST=State/L=City/O=Org/CN=appvm"
fi
chmod 600 "${SSL_KEY}"

# Nginx config (serves static build and reverse-proxies /api to Spring Boot)
cat > /etc/nginx/sites-available/appvm <<'NGINX'
server {
    listen 80;
    server_name _;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name _;

    ssl_certificate /etc/ssl/certs/appvm.crt;
    ssl_certificate_key /etc/ssl/private/appvm.key;

    root /vagrant/frontend;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Proxy API requests to Spring Boot running on localhost:8080
    location /api/ {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header X-Forwarded-Proto $scheme;
    }
}
NGINX

ln -s /etc/nginx/sites-available/appvm /etc/nginx/sites-enabled/appvm || true
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx
systemctl restart springapp

echo "===================== Provisioning complete. ====================="
