package utils

import (
	"strings"
	"errors"
)

// helper function to determine if a string a valid
func checkString(str string) bool {  
	for _, char := range str {  
	 if (char < 'a' || char > 'z') && (char < 'A' || char > 'Z') {  
		return false  
	 }  
	}  
	return true  
 }  

// CheckAnagram returns true if two words are anagrams, or false and an error if the words are not valid (contains numbers or special characters)
func CheckAnagram(word1 string, word2 string) (bool, error) {
	// handle any special characters and numbers
	if !checkString(word1) || !checkString(word2) {
		return false, errors.New("invalid word entries")
	}

	if len(word1) != len(word2) {
		return false, nil
	}

	// convert the input into lower case
	word1 = strings.ToLower(word1)
	word2 = strings.ToLower(word2)

	word1Letters := make(map[rune]int)
	word2Letters := make(map[rune]int)

	letters := "abcdefghijklmnopqrstuvwxyz"
	
	for _, r := range letters {
		word1Letters[r] = 0
		word2Letters[r] = 0
	}

	for _, r := range word1 {
		// c := string(r) // starts initially as bytes
		word1Letters[r]++
	}

	for _, r := range word2 {
		word2Letters[r]++
	}

	// mismatch of counts = not anagram
	for _, r := range letters {
		if word1Letters[r] != word2Letters[r] {
			return false, nil
		}
	}

	return true, nil
}