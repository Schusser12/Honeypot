#!/bin/bash

# Prompt the user for the input file
read -p "Enter the IP list filename: " IP_FILE

# Check if the file exists
if [[ ! -f "$IP_FILE" ]]; then
    echo "IP list file '$IP_FILE' not found."
    exit 1
fi

while read -r ip; do
    html=$(curl -s "https://www.projecthoneypot.org/ip_${ip}" | tr '\n' ' ')

    # Extract all relevant WHITELIST NOTICE blocks
    notices=$(echo "$html" | grep -oP 'WHITELIST NOTICE:.*?<span style="color:#888888;">.*?</span>')

    if [[ -n "$notices" ]]; then
        # Build list of [timestamp]|[full message]
        full_entries=$(echo "$notices" | while read -r line; do
            msg=$(echo "$line" | grep -oP 'WHITELIST NOTICE:.*?(?=<span)' | sed -e 's/^[[:space:]]*//')
            date=$(echo "$line" | grep -oP '<span style="color:#888888;">.*?</span>' | sed -e 's/<[^>]*>//g')
            echo "$date|$msg"
        done)

        # Get the latest one based on date
        latest=$(echo "$full_entries" | sort -r | head -n1)
        latest_date=$(echo "$latest" | cut -d'|' -f1)
        latest_msg=$(echo "$latest" | cut -d'|' -f2)

        # Classify the latest message
        if echo "$latest_msg" | grep -q "REMOVED from Project Honey Pot whitelists"; then
            status="Blacklisted (Previously Whitelisted)"
        elif echo "$latest_msg" | grep -q "has been whitelisted"; then
            status="Currently Whitelisted"
        elif echo "$latest_msg" | grep -q "marked to be included"; then
            status="Scheduled for Whitelist"
        else
            status="Unknown"
        fi

        echo "IP: $ip | Status: $status | As of: $latest_date"
    else
        echo "IP: $ip | Status: No whitelist data found"
    fi
done < "$IP_FILE"
