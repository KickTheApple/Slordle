# Docker project structure for slordle

FOR BACKEND ON LINUX:
```sh
chmod +x backend/gradlew
```

FIRST-TIME CERTIFICATE GENERATION (pre build):
```sh
docker run --rm -it \
  -v $(pwd)/nginx/certs:/etc/letsencrypt \
  certbot/certbot certonly \
  --standalone \
  --preferred-challenges http \
  -d (example_domain.com)
```

Should build and start correctly with `docker compose up --build -d`
