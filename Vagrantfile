Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"

  config.vm.hostname = "appvm"

  # VM provider resources
  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  # Network: forward host 8080 -> guest 80 (nginx)
  config.vm.network "forwarded_port", guest: 80, host: 8080
  # Optional HTTPS forwarding if you want host:8443 -> guest:443
  config.vm.network "forwarded_port", guest: 443, host: 8443


  # Sync project folder into VM at /vagrant
  config.vm.synced_folder ".", "/vagrant"

  # Provision using the shell script
  config.vm.provision "shell", path: "provisions.sh"
end
