#!/bin/bash

start_server() {
  echo -e "Starting Server process... \n"
  cd ../.. && pnpm run dev > /dev/null 2>&1 &

  echo -n "Waiting for server to start..."
  until lsof -i :3001 > /dev/null; do
    sleep 1
    echo -n "."
  done
  echo -e "\nServer is up\n"
}

close_server() {
  echo -e "Closing server process on http://localhost:3001 \n"
  local PID=$(lsof -t -i :3001)
  kill -9 $PID
}

server_status=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/health)

if [ $server_status -eq 200 ]; then
  echo "Server running..."
elif [ $server_status -eq 000 ]; then
  echo "❌ Server is not running (status: $server_status)"
  start_server
else 
  echo "❌ Server failed to start (status: $server_status)"
  exit 1
fi

# can easily add more scripts to test other modules here
chmod u+x share.sh && ./share.sh

echo "🙌 All tests passed 🙌"

close_server

exit 0