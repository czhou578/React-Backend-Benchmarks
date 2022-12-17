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
	router.PUT("/go/new-category", newCategory)
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
	// if shippers == nil || len(shippers) == 0 {
	// 	c.AbortWithStatus(http.StatusNotFound)
	// } else {
	// 	// fmt.Print(c.IndentedJSON(http.StatusOK, shippers))
	// }
}

func getEmployeeIDCount(c *gin.Context) {
	countId := models.GetCountNumId()

	c.IndentedJSON(http.StatusOK, countId)
}

func newCategory(c *gin.Context) {
	lastId := models.NewCategoryInsert()

	c.IndentedJSON(http.StatusOK, lastId)
	// if lastId == 0 {
	// 	c.AbortWithStatus(http.StatusNotFound)
	// } else {
	// }
}
