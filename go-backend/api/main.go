package main

import (
	"api/models"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/go/all-shippers", getAllShippers)
	router.GET("/go/count-employee-id", getEmployeeIDCount)
	router.POST("/go/new-category", newCategory)
	router.PUT("/go/update-customer", UpdateCustomer)
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
