FROM golang:alpine

WORKDIR /app

# install dependencies
COPY go.mod .
COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o ./app/main .

EXPOSE 8080

CMD ["./app/main"]