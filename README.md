# Slordle vagrant VM
**Wordle v slovenskem jeziku**

Zahtevani programi:
Vagrant
Oracle VM VirtualBox

Navodila za namestitev: 
```bash
git clone -b vagrant-setup https://github.com/KickTheApple/Slordle.git
cd Slordle
```
Navodila za zagon:
```sh
vagrant up
```

Ob zagonu vagrant:
* Posodobi Ubuntu packages
* Namesti MariaDB + create database + create user
* Namesti OpenJDK 21
* Namesti Nginx
* Namesti certificates (either provided or self-signed)
* Konfigurira Nginx HTTPS reverse proxy
* Namesti in omogoči systemd service za Spring Boot JAR
* Servira obličje (angl. frontend) preko HTTPS
* Reverse proxy /api/** na zaledje

### Obličje - Nginx strežnik - React spletna aplikacija
API preko
```
location /api/ {
    proxy_pass http://127.0.0.1:8080;
}
```
### Zaledje - Java Spring boot strežnik
[Service]
ExecStart=/usr/bin/java -jar /vagrant/backend/backend-app.jar

### Podatkovna baza - MariaDB, dostop preko
```sh
jdbc:mariadb://localhost:3306/johnData
```

**App access:**
- `Frontend: http://localhost:8080`
- `Frontend (HTTPS): https://localhost:8443`
- `Backend API: http://localhost:8080/api/`

Demo video:
[(I didn't make a thumbnail)](https://raw.githubusercontent.com/KickTheApple/Slordle/vagrant-setup/demo_video_cut.mp4)
