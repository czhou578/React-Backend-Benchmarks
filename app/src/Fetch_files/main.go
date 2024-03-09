package main

import (
    "fmt"
    "io/ioutil"
    "net/http"
    "sync"
)

func fetchData(url string, wg *sync.WaitGroup, ch chan string) {
    defer wg.Done()

    // Make a GET request to the API
    response, err := http.Get(url)
    if err != nil {
        fmt.Printf("Error fetching data from %s: %s\n", url, err)
        ch <- ""
        return
    }
    defer response.Body.Close()

    // Read the response body
    data, err := ioutil.ReadAll(response.Body)
    if err != nil {
        fmt.Printf("Error reading response body from %s: %s\n", url, err)
        ch <- ""
        return
    }

    // Send the data through the channel
    ch <- string(data)
}

func main() {
    // URLs of the REST APIs
    urls := []string{
        "https://randomuser.me/api/?results=20",
        "https://randomuser.me/api/?results=20",
        "https://randomuser.me/api/?results=20",
    }

    // WaitGroup to wait for all API calls to finish
    var wg sync.WaitGroup
    wg.Add(len(urls))

    // Channel to receive data from goroutines
    ch := make(chan string, len(urls))

    // Make concurrent API calls
    for _, url := range urls {
        go fetchData(url, &wg, ch)
    }

    // Wait for all API calls to finish
    wg.Wait()

    // Close the channel to signal that all data has been received
    close(ch)

    // Collect results from the channel
    var results []string
    for data := range ch {
        results = append(results, data)
    }

    // Handle the results
    for i, result := range results {
        fmt.Printf("Result from API %d: %s\n", i+1, result)
    }
}
