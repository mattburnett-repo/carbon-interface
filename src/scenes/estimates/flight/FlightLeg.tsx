// FIXME: resolve the issue with no-floating-promises
/* eslint-disable @typescript-eslint/no-floating-promises */

// TODO: sort out field validation

import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Grid,
  Typography,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
  Button
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useFormik } from 'formik'
import * as yup from 'yup'

import {
  useAirportCodes
  //  FIXME: resolve ts-expect error eslint @'s
  // @ts-expect-error (fix this by typing ./airportCodes file, later)
} from '../../../data/airportCodes.js'

const airportCodes = useAirportCodes()

interface iFlightLeg {
  departure_airport: string
  destination_airport: string
  cabin_class: string
}
interface iAirportSelectOptiion {
  code: string
  name: string
}

interface iInitialValues {
  type: string
  departure_airport: string
  destination_airport: string
  cabin_class: string
  legs: iFlightLeg[]
}

const initialValues: iInitialValues = {
  type: 'flight',
  departure_airport: '',
  destination_airport: '',
  cabin_class: 'economy',
  legs: []
}

const validationSchema = yup.object().shape({
  departure_airport: yup.string().required('Departure airport is required.'),
  destination_airport: yup
    .string()
    .required('Destination airport is required.'),
  legs: yup.array().min(1, 'At least one leg is required.')
})

const FlightLeg = (props: any): JSX.Element => {
  const { parentState } = props

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues,
    validationSchema,
    // right now, onSubmit doesn't do anything in this component
    //    can't have a form inside of a form (this component is inside of the FlightForm component)
    onSubmit: () => {}
  })

  const handleAddLeg = (): void => {
    const leg: iFlightLeg = JSON.parse(
      JSON.stringify({
        departure_airport: formik.values.departure_airport,
        destination_airport: formik.values.destination_airport,
        cabin_class: formik.values.cabin_class
      })
    )

    formik.values.legs.push(leg)
    parentState.push(leg)

    console.log('parentState legs: ', parentState)
    // do this to re-render the form and update the leg/s array display
    // FIXME: find a better way to do this.
    navigate(`/estimates/${initialValues.type}`)
  }

  const handleRemoveLeg = (
    e: React.MouseEvent<HTMLElement>,
    i: number
  ): void => {
    formik.values.legs.splice(i, 1)
    parentState.splice(i, 1)

    // do this to re-render the form and update the leg/s array display
    // FIXME: find a better way to do this.
    navigate(`/estimates/${initialValues.type}`)
  }

  return (
    <Grid item>
      <Grid container gridTemplateColumns={'2'} marginBottom={'1rem'}>
        <Grid item>
          <Typography paddingRight='0.5rem'>Legs</Typography>
        </Grid>
        <Grid item>
          <Grid container columnGap={'2rem'}>
            <Grid item>
              <Typography>Departure Airport</Typography>
              <Autocomplete
                disablePortal
                id='departure_airport'
                onChange={(e, v) => {
                  formik.setFieldValue('departure_airport', v?.code)
                }}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                // autoSelect={true}
                options={airportCodes}
                getOptionLabel={(option: iAirportSelectOptiion) => option.code}
                renderInput={(params) => <TextField {...params} />}
              />
              {formik.touched.departure_airport !== undefined &&
              formik.errors.departure_airport !== undefined ? (
                <div>{formik.errors.departure_airport}</div>
              ) : null}
            </Grid>
            <Grid item>
              <Typography>Destination Airport</Typography>
              <Autocomplete
                disablePortal
                id='destination_airport'
                onChange={(e, v) => {
                  formik.setFieldValue('destination_airport', v?.code)
                }}
                // {...formik.getFieldProps('destination_airport')}
                isOptionEqualToValue={(option, value) =>
                  option.code === value.code
                }
                options={airportCodes}
                getOptionLabel={(option: iAirportSelectOptiion) => option.code}
                renderInput={(params) => <TextField {...params} />}
              />
              {formik.touched.destination_airport !== undefined &&
              formik.errors.destination_airport !== undefined ? (
                <div>{formik.errors.destination_airport}</div>
              ) : null}
            </Grid>
            <Grid item>
              <Typography>Cabin Class</Typography>
              <Select id='cabin_class' {...formik.getFieldProps('cabin_class')}>
                <MenuItem key={'economy'} value={'economy'}>
                  Economy
                </MenuItem>
                <MenuItem key={'premium'} value={'premium'}>
                  Premium
                </MenuItem>
              </Select>
            </Grid>
            <Grid item margin={'auto'}>
              <Button onClick={handleAddLeg}>
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {formik.values.legs.map((leg: iFlightLeg, i: number) => (
        <Grid
          container
          key={`flight-leg-container-${i}`}
          columnGap={'2rem'}
          justifyContent={'space-between'}
        >
          <Grid item key={`leg-${i}`}>
            {i}
          </Grid>
          <Grid item key={`departure-${i}`}>
            {leg.departure_airport}
          </Grid>
          <Grid item key={`destination-${i}`}>
            {leg.destination_airport}
          </Grid>
          <Grid item key={`cabin_class-${i}`}>
            {leg.cabin_class}
          </Grid>
          <Grid item key={'handleAddLeg-$[i]'}>
            <Button
              key={`remove-button-${i}`}
              onClick={(e) => {
                handleRemoveLeg(e, i)
              }}
            >
              <RemoveIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
      {formik.values.legs.length < 1 ? (
        <Grid item>
          {/* <Typography margin={'auto'} width={'fit-content'}>
            At least one flight leg is required.
          </Typography> */}
          <Typography margin={'auto'} width={'fit-content'}>
            Select a departure airport, a destination airport and a cabin class,
            then click the plus (+) sign.
          </Typography>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default FlightLeg

/* eslint-enable @typescript-eslint/no-floating-promises */
