package main

import (
	"api/models"
	"bytes"
	"encoding/json"
	"fmt"
	"io"
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
	err := router.Run("192.168.81.153:8083")

	if err != nil {
		log.Fatal(err)
	}
}

type LockWaitTimeoutError struct {
	Message string
}

type CombinedData struct {
	data           []models.Shipper `json:"data"`
	operation_time map[string]int64 `json:"time"`
}

type CombinedDataCountId struct {
	data           []models.EmployeeId `json:"data"`
	operation_time map[string]int64    `json:"time"`
}

func (e *LockWaitTimeoutError) Error() string {
	return e.Message
}

func getAllShippers(c *gin.Context) {
	shippers, operation_time := models.GetShippers()

	combined := CombinedData{
		data:           shippers,
		operation_time: operation_time,
	}

	shipperStrings := fmt.Sprintf("%v", combined)

	fmt.Println("new", combined)

	c.Header("Content-Type", "text/plain; charset=utf-8")
	c.String(200, shipperStrings)

}

func getEmployeeIDCount(c *gin.Context) {
	countId, operation_time := models.GetCountNumId()

	combined := CombinedDataCountId{
		data:           countId,
		operation_time: operation_time,
	}

	countIdString := fmt.Sprintf("%v", combined)

	fmt.Println("new", combined)

	c.Header("Content-Type", "text/plain; charset=utf-8")
	c.String(200, countIdString)
}

func newCategory(c *gin.Context) {
	lastId, operation_time := models.NewCategoryInsert()

	combinedString := fmt.Sprintf("Inserted Id is %d, Backend operation took %dms", lastId, operation_time)
	c.Header("Content-Type", "text/plain; charset=utf-8")
	c.String(200, combinedString)
}

// func UpdateCustomer(c *gin.Context) {
// 	updatedId := models.UpdateCustomer()

// 	c.IndentedJSON(http.StatusOK, updatedId)
// }

func UpdateCustomer(c *gin.Context) {
	updatedId, operation_time, err := models.UpdateCustomerWithRetry()
	fmt.Println("operation time, ", operation_time)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(updatedId)
	combinedString := fmt.Sprintf("Updated Id. Backend operation took %dms", operation_time)
	c.Header("Content-Type", "text/plain; charset=utf-8")
	c.String(200, combinedString)
}

func DeleteSalesorder(c *gin.Context) {
	updatedId, operation_time := models.DeleteSalesOrder()
	print(updatedId)

	combinedString := fmt.Sprintf("Updated Id. Backend operation took %dms", operation_time)
	c.Header("Content-Type", "text/plain; charset=utf-8")
	c.String(200, combinedString)
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
