# Slordle vagrant VM
**Wordle v slovenskem jeziku**

Zahtevani programi:
Vagrant
Oracle VM VirtualBox

Navodila za namestitev: 
```bash
git clone -b cloudinit-begin https://github.com/KickTheApple/Slordle.git
cd Slordle
```
Navodila za zagon:
```sh
vagrant up
```

Ob zagonu vagrant:
* Posodobi Ubuntu packages
* Namesti OpenJDK 21
* Namesti Nginx
* Namesti MariaDB
* Namesti Git
* Namesti NodeJS
* Namesti NPM
* Konfigurira Datoteko "/etc/nginx/sites-available/slordle.conf"
* Klonira github repo projekta
* Posodobi NPM na novejšo verzijo
* Zažene MariaDB strežnik + nastavi uporabnika in podatkovno bazo
* Namesti dependencije in kompiliramo Frontend v pod direktorij "dist"
* Zgradi Backend in ga zažene
* Rekurzivno iz korena dodeli pravice 777 celotnem operacijskem sistemu

### V nginx directoriju pišemo v datoteko "slordle.conf"

V datoteki povemo nginx kje se nahaja naš root in kje je naš začetek izvajanja.
```
root /home/ubuntu/Slordle/dist;
index index.html;

location / {
    try_files $uri $uri/ /index.html;
}
```
Izvajanje Backenda na ražširitviji /api/ nastavimo na 8080 namesto 8443
``` 
location /api/ {
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```
### Backend - Java Spring boot strežnik
[Service]
Dostopen preko: http://localhost:8080/api/
```sh
./gradlew bootRun &
```
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
