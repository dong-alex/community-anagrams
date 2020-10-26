package models

import (
	"fmt"
)

// AnagramRequest to be stored and queried later
type AnagramRequest struct {
    ID	int `json:"id"`
		FirstWord string `json:"firstWord"`
		SecondWord string `json:"secondWord"`
		Result bool `json:"result"`
}

func (s AnagramRequest) String() string {
	return fmt.Sprintf("AnagramRequest<%d %s %s>", s.ID, s.FirstWord, s.SecondWord)
}