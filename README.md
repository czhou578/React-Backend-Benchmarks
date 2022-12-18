# React-Backend-Benchmarks

This project was for me to experiment with the query speeds of RESTful API's that were built with three different
programming languages: JavaScript, Python, and Go. A React frontend is connected to all three backends to serve as a
common entry point for making requests.

Users of the application would be able to run iterations of a specific query using a particular language. The results of
the runs are displayed in the accordion on the frontend.

I utilized the Microsoft Northwinds database to run queries on. The SQL file is provided.

Open 3 terminals in your code editor. 

In the first terminal, navigate to the app folder and run 

```
npm run server

```

In the second terminal, navigate to the go-backend/api folder and run

```
go run .

```

In the third terminal, navigate to the python-backend folder and run

```
py ./main.py

```

You will now be able to make requests as you please. 

### Note: The small delay time on the UI is not counted in the overall performance time calculation.
