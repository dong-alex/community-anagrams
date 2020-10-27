# community-anagrams

Go/React/TypeScript SPA that checks if two words are anagrams. As well, provide statistics on the words requested. We store information behind a PostgreSQL database via a local server.

# Go Server

The Go client has two main endpoints that the SPA will call.

### GET "/top"

Upon loading, the SPA will communicate with the server to pull the the top 10 most made requests between two words (less than 10 if there has been <10 unique requests). The returned data will be in descending order based on the number of requests.

### POST "/anagrams"

After a user inputs two valid words, the server will validate whether or not the two words are anagrams or not. Afterwards, the server will store the words into its database to track how many requests to the words have been made over the lifetime of the application. This provides the data that when the endpoint **GET "/top"** is called, it will display the top 10 requests made in order as well as the total count.

# Go Setup

To run in a development environment, we can simply use the command in the main server directory:

`go run main.go`

To run a production executable, we build the program and then run the exe

`go build`
`./[executable]`

# React Client

The client displays a form where a user will be able to check if two words are anagrams. As well, a 'leaderboard' will be displayed that showcases the top 10 requests made during the lifetime of the app.

### Setup

`yarn.lock` has been included, but if updates are needed, run `yarn`. Client was created using `CRA` and `mdreact` as the layout framework.

### Development

Run `yarn start` for development

### Production

Run `yarn build` and then `yarn serve`
