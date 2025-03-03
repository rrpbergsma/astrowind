#!/bin/bash

# Test script for the contact form API using curl
# This script simulates a form submission to the contact form API

API_URL="http://localhost:4321/api/contact"
ADMIN_EMAIL="richard@bergsma.it"

echo "Starting contact form test with curl..."
echo "API URL: $API_URL"

# Step 1: Get CSRF token
echo "Getting CSRF token..."
CSRF_RESPONSE=$(curl -s "$API_URL?csrf=true")
echo "CSRF Response: $CSRF_RESPONSE"

# Extract CSRF token
CSRF_TOKEN=$(echo $CSRF_RESPONSE | grep -o '"csrfToken":"[^"]*"' | cut -d'"' -f4)
echo "CSRF Token: $CSRF_TOKEN"

if [ -z "$CSRF_TOKEN" ]; then
  echo "Failed to get CSRF token. Aborting test."
  exit 1
fi

# Step 2: Submit the form
echo "Submitting form..."
FORM_RESPONSE=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -H "Accept: application/json" \
  -H "User-Agent: test-contact-curl-script" \
  --data-urlencode "name=Test User" \
  --data-urlencode "email=$ADMIN_EMAIL" \
  --data-urlencode "message=This is a test message from the test-contact-curl.sh script. $(date)" \
  --data-urlencode "disclaimer=on" \
  --data-urlencode "csrf_token=$CSRF_TOKEN" \
  --data-urlencode "timestamp=$(date +%s)")

echo "Form submission response: $FORM_RESPONSE"

# Check if submission was successful
if echo "$FORM_RESPONSE" | grep -q '"success":true'; then
  echo "Form submission successful!"
else
  echo "Form submission failed."
  echo "Response: $FORM_RESPONSE"
  exit 1
fi

echo "Test completed successfully."