# Docker project structure for slordle

FOR BACKEND ON LINUX:
```sh
chmod +x backend/gradlew
```

FIRST-TIME CERTIFICATE GENERATION (pre build):
```sh
sudo docker run --rm -it --network host \
  -v /full/path/to/nginx/certs:/etc/letsencrypt \
  certbot/certbot certonly \
  --standalone \
  --preferred-challenges http \
  -d (example-domain.com)
```
Replace the DOMAIN_NAME in nginx.conf with the domain used by the server.


Should build and start correctly with `docker compose up --build -d`
