// main.go
package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	// Указываем путь к HTML-шаблонам
	router.LoadHTMLGlob("templates/*")

	// Подключаем статические файлы
	router.Static("/static", "./static")

	// Главная страница
	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run("127.0.0.1:8080")
}
