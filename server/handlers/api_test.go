package handlers

import (
	"testing"
	"errors"
	"fmt"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	
	sqlmock "github.com/DATA-DOG/go-sqlmock"
	// mocks "github.com/dong-alex/community-anagrams/mocks"
	db "github.com/dong-alex/community-anagrams/db"
	assert "github.com/stretchr/testify/assert"
	
	"github.com/dong-alex/community-anagrams/models"

	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)

var (
	dsnCount int64
)

type errReader int 

func (errReader) Read(p []byte) (n int, err error) {
	return 0, errors.New("test error")
}

func SetupTest() (*gorm.DB, sqlmock.Sqlmock, error) {
	// setup databse before running the tests
	sqlMockDB, mock, err := sqlmock.New()
	mockDB, err := gorm.Open(postgres.New(postgres.Config{ Conn: sqlMockDB}), &gorm.Config{})

	return mockDB, mock, err
}

func TestGetAnagramRequests(t *testing.T) {
	mockDB, mock, err := SetupTest()

	fmt.Println("GET '/' : GetAnagramRequests")
	rows := sqlmock.NewRows([]string{"ID", "FirstWord", "SecondWord", "Result"}).AddRow(1, "dog", "god", true).AddRow(2, "aba", "aaa", false).AddRow(2, "www", "www", true)

	mock.ExpectQuery(`^SELECT (.+) FROM "anagram_requests"$`).WillReturnRows(rows)
	mockDBService := db.NewDatabaseService(mockDB)
	apiController := NewAnagramController(mockDBService)

	response := httptest.NewRecorder()

	// mock the database from the original implementation

	req, err := http.NewRequest("GET", "http://localhost:8080/", nil)

	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}


	apiController.GetAnagramRequests(response, req)

	// test output
	output := response.Result()

	var anagrams []*models.AnagramRequest
	err = json.NewDecoder(output.Body).Decode(&anagrams)

	assert.Equal(t, len(anagrams), 3)

	if err := mock.ExpectationsWereMet(); err != nil {
    fmt.Println("there were unfulfilled expectations:", err)
	}
}

func TestGetTopAnagramRequests(t *testing.T) {
	mockDB, mock, err := SetupTest()
	fmt.Println("GET '/top' : GetTopAnagramRequests")

	rows := sqlmock.NewRows([]string{"FirstWord", "SecondWord", "Count"}).AddRow("www", "www", 12).AddRow("dog", "god", 10).AddRow("aba", "aaa", 3)

	mock.ExpectQuery(`^SELECT first_word, second_word, count((.+)) FROM "anagram_requests" GROUP BY first_word, second_word ORDER BY count((.+)) desc LIMIT 10$`).WillReturnRows(rows)

	mockDBService := db.NewDatabaseService(mockDB)
	apiController := NewAnagramController(mockDBService)
	response := httptest.NewRecorder()
	// mock the database from the original implementation

	req, err := http.NewRequest("GET", "http://localhost:8080/top", nil)

	if err != nil {
		t.Fatalf("could not create request: %v", err)
	}

	apiController.GetTopAnagramRequests(response, req)

	// test output
	output := response.Result()

	var results []*models.TopAnagramRequestResponse
	err = json.NewDecoder(output.Body).Decode(&results)

	// first place should be 12 - after sorting
	assert.Equal(t, int64(12), (*results[0]).Count)

	if err := mock.ExpectationsWereMet(); err != nil {
    fmt.Println("there were unfulfilled expectations:", err)
	}
}

func TestAddAnagramRequest(t *testing.T) {
	mockDB, mock, err := SetupTest()
	fmt.Println("POST '/anagrams' : AddAnagramRequest")

	if err != nil {
		panic("failed to setup tests for the api")
	}

	t.Run("Good Input", func(t *testing.T) {
		var jsonStr = []byte(`{"FirstWord": "hello", "SecondWord": "world"}`)
	
		mock.ExpectBegin()
		mock.ExpectQuery(`INSERT INTO "anagram_requests" (.+) RETURNING`).WithArgs("hello", "world", false).WillReturnRows(sqlmock.NewRows([]string{"ID"}).AddRow(1))
		mock.ExpectCommit()
	
		mockDBService := db.NewDatabaseService(mockDB)
		apiController := NewAnagramController(mockDBService)
		response := httptest.NewRecorder()
		// mock the database from the original implementation
	
		req, err := http.NewRequest("POST", "http://localhost:8080/anagrams", bytes.NewBuffer(jsonStr))
	
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}
	
		apiController.AddAnagramRequests(response, req)
	
		output := response.Result()
	
		var results error
		err = json.NewDecoder(output.Body).Decode(&results)
	
		assert.Nil(t, results)
	
		if err := mock.ExpectationsWereMet(); err != nil {
			fmt.Println("there were unfulfilled expectations:", err)
		}
	})
	t.Run("Bad Body Input", func(t *testing.T) {
		mockDBService := db.NewDatabaseService(mockDB)
		apiController := NewAnagramController(mockDBService)
		response := httptest.NewRecorder()
		// mock the database from the original implementation
	
		req, _ := http.NewRequest("POST", "http://localhost:8080/anagrams", errReader(0))
	
		apiController.AddAnagramRequests(response, req)
	
		output := response.Result()
		assert.Equal(t, output.StatusCode, 400)
	
		if err := mock.ExpectationsWereMet(); err != nil {
			fmt.Println("there were unfulfilled expectations:", err)
		}
	})
	t.Run("Bad Field Input", func(t *testing.T) {
		var jsonStr = []byte(`{"FirstWord": "hello123", "SecondWord": "world"}`)
	
		mock.ExpectBegin()
		mock.ExpectQuery(`INSERT INTO "anagram_requests" (.+) RETURNING`).WithArgs("hello", "world", false).WillReturnRows(sqlmock.NewRows([]string{"ID"}).AddRow(1))
		mock.ExpectCommit()
	
		mockDBService := db.NewDatabaseService(mockDB)
		apiController := NewAnagramController(mockDBService)
		response := httptest.NewRecorder()
		// mock the database from the original implementation
	
		req, err := http.NewRequest("POST", "http://localhost:8080/anagrams", bytes.NewBuffer(jsonStr))
	
		if err != nil {
			t.Fatalf("could not create request: %v", err)
		}
	
		apiController.AddAnagramRequests(response, req)
	
		output := response.Result()
		assert.Equal(t, output.StatusCode, 400)
	})
}
