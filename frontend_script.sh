#!/bin/bash

# Function to kill the process on port 3000
kill_process_on_port_3000() {
    echo "Freeing up port 3000..."
    PID=$(lsof -t -i:3000)
    if [ -n "$PID" ]; then
        kill -9 "$PID"
        echo "Process $PID killed."
    else
        echo "No process found on port 3000."
    fi
}

# Trap SIGINT (Ctrl+C) and execute the kill_process_on_port_3000 function
trap 'kill_process_on_port_3000; exit' SIGINT

# Start your web application here (replace with your actual start command)
npm --prefix ./app run start &
echo "Web app running" 

# Wait for the web app process to exit
wait

# Cleanup
kill_process_on_port_3000
