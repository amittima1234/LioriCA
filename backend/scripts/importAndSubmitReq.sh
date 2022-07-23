#!/bin/bash

cd $1
echo $1 $2 $3 $4
$1/easyrsa import-req $2 $3 
echo "import for $3 is done."
$1/easyrsa sign-req $4 $3 << EOF
yes
EOF
echo "signing for $3 is done."