#!/bin/bash

# Array to hold the process IDs of the server instances
pids=()

# Function to stop all servers
stop_servers() {
    echo "Stopping all servers..."
    for pid in "${pids[@]}"; do
        kill $pid 2>/dev/null
    done
}

# Trap SIGINT (Ctrl+C) and SIGTERM signals to stop servers before exiting
trap stop_servers SIGINT SIGTERM

# Start the Node.js server
npm --prefix ./app run server &
pids+=($!)
echo "Running Node.js server"

# Start the Go server
cd ./go-backend/api/
go run . &
pids+=($!)
echo "Running Go server"
cd -

# Start the Python Flask server
python3 ./python-backend/main.py &
pids+=($!)
echo "Running Python Flask server"

# Start the Spring server
cd /home/czhou578/React-Backend-Benchmarks
/usr/bin/env /usr/lib/jvm/java-17-openjdk-amd64/bin/java @/tmp/cp_64xhp6hseq0h6ede0xsi4t43y.argfile com.example.demo.DemoApplication &
pids+=($!)
echo "Running Spring server"

# Wait for all background processes to finish
wait

# Cleanup after all servers have stopped
stop_servers
