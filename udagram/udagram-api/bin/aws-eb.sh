# Installing AWS EB CLI
sudo apt-get -y -qq update
#sudo apt-get install python3-pip python-dev build-essential
sudo apt-get update && sudo apt-get install -y python3-pip
sudo pip3 install --upgrade pip
sudo pip3 install --upgrade setuptools
sudo pip3 install 'botocore>=1.35.0,<1.36.0'
sudo pip3 install awsebcli --upgrade