package main

import (
	"api/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	router.GET("/go/all-shippers")
	router.Run("localhost:8083")
}

func getAllShippers(c *gin.Context) {
	shippers := models.GetShippers()

	if shippers == nil || len(shippers) == 0 {
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		c.IndentedJSON(http.StatusOK, shippers)
	}
}
