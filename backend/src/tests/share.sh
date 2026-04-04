#!/bin/bash

close_server() {
  echo -e "Closing server process on http://localhost:3001 \n"
  local PID=$(lsof -t -i :3001)
  kill -9 $PID
}

# create share link
response=$(curl -s -w "\n%{http_code}" \
  -X POST http://localhost:3001/api/share-link/create \
  -H "Content-Type: application/json" \
  -d '{"data": "testing-testing"}'
)

status=$(echo "$response" | tail -n 1 | tr -d -c '[:digit:]')
body=$(echo "$response" | sed '$d')

if [[ "$status" == "200" ]] && [[ "$body" == *"success"* ]] && [[ "$body" == *"true"* ]]; then

  # looks for "code":"example" and extracts it
  code=$(echo "$body" | grep -oE '"code":"[^"]+"' | cut -d'"' -f4)
  
  echo -e "✅ Test Passed: Generate Share Link (Code: $code)\n"

  # lookup a share link
  response=$(curl -s -w "\n%{http_code}" \
    -X GET "http://localhost:3001/api/share-link/find/$code" \
    -H "Content-Type: application/json"
  )

  status=$(echo "$response" | tail -n 1 | tr -d -c '[:digit:]')
  body=$(echo "$response" | sed '$d')

  if [[ "$status" == "200" ]] && [[ "$body" == *"found"* ]] && [[ "$body" == *"true"* ]] && [[ "$body" == *"testing-testing"* ]]; then
    echo -e "✅ Test Passed: Lookup Share Link\n"
  else
    echo -e "❌ Test Failed: Lookup Share Link"
    echo "Expected 200, got $status. Body: $body"
    close_server
    exit 1
  fi
else 
  echo -e "❌ Test Failed: Generate Share link"
  echo "Expected 200, got $status. Body: $body"
  close_server
  exit 1
fi

