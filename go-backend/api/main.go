package main

import (
	"api/models"
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/go/all-shippers", getAllShippers)
	router.GET("/go/count-employee-id", getEmployeeIDCount)
	router.GET("/go/graphql/get", getCEORoadster)
	router.POST("/go/new-category", newCategory)
	router.PUT("/go/update-customer", UpdateCustomer)
	router.DELETE("/go/delete-salesorder", DeleteSalesorder)
	err := router.Run("localhost:8083")

	if err != nil {
		log.Fatal(err)
	}
}

func getAllShippers(c *gin.Context) {
	shippers := models.GetShippers()
	fmt.Print(shippers)

	c.Writer.Header().Set("Content-Type", "application/json; charset=utf-8")
	c.IndentedJSON(http.StatusOK, shippers)
}

func getEmployeeIDCount(c *gin.Context) {
	countId := models.GetCountNumId()

	c.IndentedJSON(http.StatusOK, countId)
}

func newCategory(c *gin.Context) {
	lastId := models.NewCategoryInsert()

	c.IndentedJSON(http.StatusOK, lastId)
}

func UpdateCustomer(c *gin.Context) {
	updatedId := models.UpdateCustomer()

	c.IndentedJSON(http.StatusOK, updatedId)
}

func DeleteSalesorder(c *gin.Context) {
	updatedId := models.DeleteSalesOrder()
	print(updatedId)

	c.IndentedJSON(http.StatusOK, updatedId)
}

func getCEORoadster(c *gin.Context) {
	jsonData := map[string]string{
		"query": `
			{
				company {
					ceo
				}
				roadster {
					apoapsis_au
				}	
			}
		`,
	}
	jsonValue, _ := json.Marshal(jsonData)
	request, _ := http.NewRequest("POST", "https://api.spacex.land/graphql/", bytes.NewBuffer(jsonValue))
	client := &http.Client{Timeout: time.Second * 10}
	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)
	if err != nil {
		fmt.Printf("HTTP request failed")
	}

	data, _ := io.ReadAll(response.Body)
	// fmt.Printf(string(data))
	c.IndentedJSON(http.StatusOK, string(data))

}
