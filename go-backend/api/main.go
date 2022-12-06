package main

import (
	"api/models"
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.Use(cors.Default())

	router.GET("/go/all-shippers", getAllShippers)
	router.Run("localhost:8083")
}

func getAllShippers(c *gin.Context) {
	shippers := models.GetShippers()
	fmt.Print(shippers)

	if shippers == nil || len(shippers) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		// fmt.Print(c.IndentedJSON(http.StatusOK, shippers))
		c.Writer.Header().Set("Content-Type", "application/json; charset=utf-8")
		c.IndentedJSON(http.StatusOK, shippers)
	}
}
