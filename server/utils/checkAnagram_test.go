package utils

import (
	"fmt"
	"errors"
	"testing"
	"reflect"
)

var ErrBadEntry = errors.New("invalid word entries")

// TestCheckString checks the validity of the function CheckString
func TestCheckString(t *testing.T) {
	var tests = []struct {
		testString string
		expected bool
	}{
		{"a", true},
		{"abc", true},
		{"123", false},
		{"abc1", false},
		{"!@#", false},
		{"!", false},
		{"abc123!@#", false},
		{"!@#$%^&*()_+?><:", false},
		{`\\`, false},
	}

	for _, tt := range tests {
		testname := fmt.Sprintf("Testing: %v", tt.testString)
		t.Run(testname, func (t *testing.T) {
			answer := checkString(tt.testString)
			if answer != tt.expected {
				t.Errorf("Got %v, expected %v", tt.testString, tt.expected)
			}
		})
	}
}

func TestCheckAnagram(t *testing.T) {
	var tests = []struct {
		word1 string
		word2 string
		out bool
		err error
	}{
		{"hello", "world", false, nil},
		{"dog", "god", true, nil},
		{"limit", "none", false, nil},
		{"abby", "baby", true, nil},
		{"abc1", "cba1", false, ErrBadEntry},
		{"abc!", "cba1", false, ErrBadEntry},
		{"Acsd", "dsca", true, nil},
		{"abc123", "123acb", false, ErrBadEntry},
	}

	for _, tt:= range tests {
		testname := fmt.Sprintf("Testing: %v, %v", tt.word1, tt.word2)
		t.Run(testname, func (t *testing.T) {
			answer, errAnswer := CheckAnagram(tt.word1, tt.word2)
			if answer != tt.out {
				t.Errorf("Got %v, expected %v", answer, tt.out)
			}
			if !reflect.DeepEqual(errAnswer, tt.err) {
				t.Errorf("Got %v, expected %v", errAnswer, tt.err)
			}
		})
	}
}