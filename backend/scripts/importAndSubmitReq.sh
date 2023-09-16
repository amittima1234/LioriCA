#!/bin/bash


ca_folder_path=$1
req_file_path=$2
cert_name=$3
cert_type=$4
ca_pass="Aa123456"

cd $ca_folder_path
echo $ca_folder_path $req_file_path $cert_name $cert_type
$ca_folder_path/easyrsa import-req $req_file_path $cert_name
echo "import for $cert_name is done."

expect -c "
    set timeout -1

    spawn $ca_folder_path/easyrsa sign-req $cert_type $cert_name 

    expect \"Confirm request details: \"
    send -- \"yes\n\"

    expect \"Enter pass phrase for $ca_folder_path/pki/private/ca.key:\"
    send -- \"$ca_pass\n\"

    expect eof"

echo "signing for $cert_name is done."
