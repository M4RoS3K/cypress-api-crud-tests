<h1 align="center">
  API CRUD Test Cases
  <br>
</h1>

<h4 align="center">A simple project built on top of Cypress</h4>

## Key Features
* Endpoints GET, POST, PUT and DELETE of a [public API](https://calm-plum-jaguar-tutu.cyclic.app/todos) covered by various test scenarios
* Multi-broser support
* Live Test results in your favorite browser

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/M4RoS3K/cypress-api-crud-tests

# Go into the repository
$ cd cypress-api-crud-tests

# Install dependencies
$ npm install cypress --save-dev

# Run the app
$ npx cypress open
```
> **Note**
> Test execution is open in a browser of your choice and spec file _api.cy.js_ needs to be chosen in for test exection to be started

## Usage example

You can access this API and cypress tests for free, just in case you need a CRUD API.
For this API URL rate limit 5 requests/minute for (POST, PUT, DELETE) and 2 requests/second for GET have been set.
Only for this reason test cases contain wait commands to avoid reaching the rate limit

## Meta

Maros Spusta – [@M4RoS3K](https://github.com/M4RoS3K) – maros.spusta@gmail.com

## Credits

This software uses the following open source packages:

- [Node.js](https://nodejs.org/)
- [Cypress.io](https://www.cypress.io/)

## Contributing

1. Fork it (<https://github.com/M4RoS3K/cypress-api-crud-tests>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request