#!/bin/bash

# 1. installation
mkdir ~/ca
cd ~/ca
rm -r easy-rsa
wget $1 -O easy-rsa
tar xvf easy-rsa
rm -r easy-rsa
mv E* easy-rsa # we are using E* because we want the script to be as general as possible
sudo chmod 700 easy-rsa 


# 2. setup vars
cd easy-rsa
touch vars
echo 'set_var EASYRSA_REQ_COUNTRY    "CM"
set_var EASYRSA_REQ_PROVINCE   "Centre"
set_var EASYRSA_REQ_CITY       "Yaounde"
set_var EASYRSA_REQ_ORG        "LINUXSHARE"
set_var EASYRSA_REQ_EMAIL      "admin@linuxshare.com"
set_var EASYRSA_REQ_OU         "Com"
set_var EASYRSA_ALGO           "ec"
set_var EASYRSA_DIGEST         "sha512"' >> vars


# 3. start the CA
./easyrsa init-pki
echo -e "Aa123456\nAa123456\nLiori\n" | ./easyrsa build-ca