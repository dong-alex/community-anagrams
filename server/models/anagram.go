package models

import (
	"fmt"
)

// AnagramRequest to be stored and queried later
type AnagramRequest struct {
    ID	int
		FirstWord string
		SecondWord string
		Result bool
}

func (s AnagramRequest) String() string {
	return fmt.Sprintf("AnagramRequest<%d %s %s>", s.ID, s.FirstWord, s.SecondWord)
}