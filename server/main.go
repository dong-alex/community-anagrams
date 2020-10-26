package main

import (

	"log"
	"net/http"
  "github.com/gorilla/mux"
	"github.com/rs/cors"
	
	"github.com/dong-alex/community-anagrams/db"
	"github.com/dong-alex/community-anagrams/handlers"
)

func main() {
	database := db.InitializeDB()

	router := mux.NewRouter()

	// dependency injection for flexibility
	dbService := db.NewDatabaseService(database)
	apiHandler := handlers.NewAnagramController(dbService)

	router.HandleFunc("/", apiHandler.GetAnagramRequests).Methods("GET")
	router.HandleFunc("/top", apiHandler.GetTopAnagramRequests).Methods("GET")
	router.HandleFunc("/anagrams", apiHandler.AddAnagramRequests).Methods("POST")

	handler := cors.Default().Handler(router)

  log.Fatal(http.ListenAndServe(":8080", handler))
}
