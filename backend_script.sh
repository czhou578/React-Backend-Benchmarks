#!/bin/bash

npm --prefix ./app run server &
echo "Running Node.js server"

cd ./go-backend/api/
go run . &
echo "Running Go server" 

cd -
python3 ./python-backend/main.py
echo "Running Python Flask server"