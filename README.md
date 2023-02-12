# Carbon Interface API Frontend

This is a React application that provides a front end for the [Carbon Interface Estimates API](https://www.carboninterface.com/).

It is deployed [here](https://carbon-interface.vercel.app/).

There is a limit of 200 api requests per month. The api/app will return an error if this monthly limit has already been exceeded.

---

## Tech Used
* React 18
* Typescript
* Formik
* Yup
* [iso3166-2-db](https://www.npmjs.com/package/iso3166-2-db) (for standardized international country / region codes)
* [airport-iata-codes](https://www.npmjs.com/package/airport-iata-codes)
* [react-pro-sidebar](https://www.npmjs.com/package/react-pro-sidebar)
* Material UI v5
* Sass CSS compiler
* Postman (api has a [Collection](https://carbon-interface.s3.ca-central-1.amazonaws.com/assets/Carbon+Interface.postman_collection.json) that is useful for development )

## Installation and start up
* Clone the repo 
  ```bash
  git clone https://github.com/mattburnett-repo/carbon-interface.git
  ```
* Copy sample.env to .env
  ```bash
  cp sample.env .env
  ```
* [Get an api key](https://www.carboninterface.com/account/api_credentials) and enter it into .env file
  ```bash
  VITE_API_KEY=your.api.key.goes.here
  ```
* Start the app
  ```bash
  yarn dev
  ```
## To Do
* Tests. Try using Vitest.
* Some sort of HOC / wrapper components to reduce repeated code in forms and estimates components.
* Start on app for [Carbon Ledger api / functionality](https://docs.carboninterface.com/#/?id=carbon-ledger-api).
