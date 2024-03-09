import requests
from concurrent.futures import ThreadPoolExecutor, as_completed

def getData():
    url = "https://randomuser.me/api/?results=20"
    requests_data = requests.get(url)

    return requests_data.json()

# with ThreadPoolExecutor() as executor:
#     futures = [executor.submit(task, t) for t in tasks]

#     for future in as_completed(futures):
#         result = future.result()
#         print(result)


# from concurrent.futures import ThreadPoolExecutor, as_completed

# # Function to simulate asynchronous tasks
# def task(i):
#     return i * i

# # List of tasks
# tasks = [1, 2, 3, 4, 5]

# # Create a ThreadPoolExecutor
# with ThreadPoolExecutor() as executor:
#     # Submit all tasks to the executor
#     futures = [executor.submit(task, t) for t in tasks]
    
#     # Wait for all tasks to complete
#     for future in as_completed(futures):
#         result = future.result()
#         print(result)
