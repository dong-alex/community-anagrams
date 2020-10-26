
package models

// TopAnagramRequestResponse saves the top request after being grouped and counted
type TopAnagramRequestResponse struct {
	FirstWord string
	SecondWord string
	Count int64
}
