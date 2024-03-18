# API CRUD Test Cases
> This project demonstrates testing of GET, POST, PUT and DELETE endpoints of a [public API](https://calm-plum-jaguar-tutu.cyclic.app/todos)

Technologies used:
- npm
- cypress

## Installation

1. install npm [HERE](https://nodejs.org/en/download)
2. run cypress by command  ```npx cypress open```
3. choose E2E testing
4. choose your favorite browser
5. open spec ``` api.cy.js```

## Usage example

You can access this API and cypress tests for free, just in case you need a CRUD API.
For this API URL rate limit 5 requests/minute for (POST, PUT, DELETE) and 2 requests/second for GET have been set.
Only for this reason test cases contain wait commands to avoid reaching the rate limit

## Meta

Maros Spusta – [@M4RoS3K](https://github.com/M4RoS3K) – maros.spusta@gmail.com


## Contributing

1. Fork it (<https://github.com/M4RoS3K/cypress-api-crud-tests>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request