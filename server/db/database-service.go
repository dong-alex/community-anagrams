package db

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
	
	"github.com/dong-alex/community-anagrams/models"
	
  "gorm.io/driver/postgres"
  "gorm.io/gorm"
)

var (
	database *gorm.DB
)

// DatabaseService used as a structure for easier mocking and handles all of the database requests
type DatabaseService interface {
	GetAllAnagrams() []*models.AnagramRequest
	GetTopRequests() []*models.TopAnagramRequestResponse
	SaveRequest(*models.AnagramRequest, bool) error
}

type service struct {}

// NewDatabaseService exposes a service for the other modules to utilize
func NewDatabaseService(db *gorm.DB) DatabaseService {
	database = db
	return &service{}
}

// InitializeDB returns a function used to give the database connection. Allows flexibility to what databse connection will be used with the service
func InitializeDB() (*gorm.DB) {
	godotenv.Load(".env")

	var dbURI = fmt.Sprintf("host=localhost port=5432 user=%v dbname=%v sslmode=disable password=%v", os.Getenv("POSTGRESQL_USER"), os.Getenv("POSTGRESQL_DB"), os.Getenv("POSTGRESQL_PASS"))

  gormDB, err := gorm.Open(postgres.Open(dbURI), &gorm.Config{})

  if err != nil {
    panic("failed to connect database")
	}

	gormDB.AutoMigrate(&models.AnagramRequest{}) // add missing fields only

	return gormDB
}

// GetAllAnagrams contacts the database to pull all anagram requests
func (*service) GetAllAnagrams() ([]*models.AnagramRequest) {
	var anagrams []*models.AnagramRequest
	database.Find(&anagrams)
	return anagrams
}

// GetTopRequests returns top 10 requests that were being searched
func (*service) GetTopRequests() ([]*models.TopAnagramRequestResponse) {
	var requests []*models.TopAnagramRequestResponse

	database.Table("anagram_requests").Select("first_word, second_word, count(1)").Group("first_word, second_word").Order("count(1) desc").Limit(10).Scan(&requests)
	return requests
}

// SaveRequest will store whether it is an anagram for a specific request
func (*service) SaveRequest(body *models.AnagramRequest, isAnagram bool) (error) {
	body.Result = isAnagram
	result := database.Create(body)
	return result.Error
}

