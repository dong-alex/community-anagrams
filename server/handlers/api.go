package handlers

import (
	"encoding/json"
	"log"
	"net/http"
		
	"github.com/dong-alex/community-anagrams/models"
	"github.com/dong-alex/community-anagrams/utils"
	"github.com/dong-alex/community-anagrams/db"
)

var (
	databaseService db.DatabaseService
)

type controller struct {}

// AnagramController templates the handler functions for the server endpoints
type AnagramController interface {
	GetAnagramRequests(w http.ResponseWriter, r *http.Request)
	GetTopAnagramRequests(w http.ResponseWriter, r *http.Request)
	AddAnagramRequests(w http.ResponseWriter, r *http.Request)
}

// NewAnagramController exposes the controller used to handle the requests
func NewAnagramController(service db.DatabaseService) AnagramController {
	databaseService = service
	return &controller{}
}

// GetAnagramRequests is responsible for GET "/", returns all anagrams requests made
func (*controller) GetAnagramRequests(w http.ResponseWriter, r *http.Request) {
	anagrams := databaseService.GetAllAnagrams()
  json.NewEncoder(w).Encode(anagrams)
}

// GetTopAnagramRequests can have two approaches for the GET "/top" endpoint
func (*controller) GetTopAnagramRequests(w http.ResponseWriter, r *http.Request) {
	topRequests := databaseService.GetTopRequests()
	json.NewEncoder(w).Encode(topRequests)
}

// AddAnagramRequests handles the POST "/anagrams" endpoint, saves the request instance for the top 10 requests made, and returns the payload including the result of the request 
func (*controller) AddAnagramRequests(w http.ResponseWriter, r *http.Request) {
	var requestBody *models.AnagramRequest

	err := json.NewDecoder(r.Body).Decode(&requestBody)

	if err != nil {
		w.WriteHeader(400)
		log.Printf("Error reading body: %v", err)
		http.Error(w, "Unable to read body", http.StatusBadRequest)
		return
	}

	// determine if it is an anagram
	result, anagramErr := utils.CheckAnagram(requestBody.FirstWord, requestBody.SecondWord)

	// if the words contained special characters or numbers
	if anagramErr != nil {
		w.WriteHeader(400)
		http.Error(w, "Invalid word format", http.StatusBadRequest)
		return
	}

	err = databaseService.SaveRequest(requestBody, result)

	if err != nil {
		w.WriteHeader(400)
		http.Error(w, "Database error", http.StatusBadRequest)
		return
	}

	json.NewEncoder(w).Encode(&result)
}
