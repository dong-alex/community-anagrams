
package models

// TopAnagramRequestResponse saves the top request after being grouped and counted
type TopAnagramRequestResponse struct {
	FirstWord string `json:"firstWord"`
	SecondWord string `json:"secondWord"`
	Count int64 `json:"count"`
}
