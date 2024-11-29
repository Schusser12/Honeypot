#!/bin/bash

export LD_LIBRARY_PATH=~/delister/usr/lib64:$LD_LIBRARY_PATH

npm install puppeteer@10

ips ()
{
    if [ "$1" == '-6' ]; then
        /sbin/ip -o -6 addr | awk '{printf "%-10s %-15s\n", $2, $4}';
    else
        if [ "$1" == '-o' ]; then
            /sbin/ifconfig | awk 'BEGIN{RS="\n\n"} {if ($1 !~ /lo/) {mac=$5; ip=$7;} else {mac=""; ip=$6} {printf "%-9s %-18s %s\n", $1, mac, ip}} ' | /bin/sed -e 's|addr:||';
        else
            if ! grep --color=auto -q 'CentOS release 6' /etc/redhat-release; then
                dig +short "$(hostname)" | awk '{printf "%-10s %-15s\n", "public", $1}';
            fi;
            /sbin/ip -o -4 addr | awk '{printf "%-10s %-15s\n", $2, $4}';
        fi;
    fi
}

# Extract the public IP using the 'ips' function
public_ip=$(ips | awk '/public/ {print $2}')

# Check if a public IP was found
if [ -z "$public_ip" ]; then
    echo "Error: Public IP not found."
    exit 1
fi

# Store the public IP in a temporary file
echo "$public_ip" > public_ip.txt

# Pass the public IP to the Node.js script
node delist.js "$(cat public_ip.txt)"

rm -rf ~/delister*
