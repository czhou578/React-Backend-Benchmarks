#!/bin/bash

npm --prefix ./app run server &
echo "Running Node.js server"

cd ./go-backend/api/
go run . &
echo "Running Go server" 

cd -
python3 ./python-backend/main.py &
echo "Running Python Flask server"

cd /home/czhou578/React-Backend-Benchmarks ; /usr/bin/env /usr/lib/jvm/java-17-openjdk-amd64/bin/java @/tmp/cp_64xhp6hseq0h6ede0xsi4t43y.argfile com.example.demo.DemoApplication &
echo "Running Spring server"
