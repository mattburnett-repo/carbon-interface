# Carbon Interface API Frontend

## What
This is a React application that provides a front end for the [Carbon Interface Estimates API](https://www.carboninterface.com/).

It was created using the [Vite framework](https://vitejs.dev/).

(need a deploy link here)

## Tech Used
* React 18
  * useState / useEffect / useQuery
  * Lazy module loading
* Typescript
* Formik
* Yup
* Sass CSS compiler
* Material UI v5
  * @mui/material
    * The Autocomplete component is especially useful
  * @mui/x-data-grid
* [iso3166-2-db](https://www.npmjs.com/package/iso3166-2-db)
* [airport-iata-codes](https://www.npmjs.com/package/airport-iata-codes)
* [react-pro-sidebar](https://www.npmjs.com/package/react-pro-sidebar)
* Postman (api has a [Collection](https://carbon-interface.s3.ca-central-1.amazonaws.com/assets/Carbon+Interface.postman_collection.json) that is useful for development )

## Installation and start up
git clone, etc...

copy sample.env to .env

get [api key](https://www.carboninterface.com/account/api_credentials) and enter into .env

## Todo
* Clean out todo and fixmes
* Deploy (Vercel, or...?)
  * update this doc when deployment is complete
* Resolve duplicate key problem with Vehicle Models
  
## Nice-to-have
* Tests. Try using Vitest.
* Some sort of HOC to reduce repeated code in forms and estimates components.
* Start on app for [Carbon Ledger api / functionality](https://docs.carboninterface.com/#/?id=carbon-ledger-api).