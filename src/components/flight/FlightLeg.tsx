// FIXME: resolve the issue with no-floating-promises
/* eslint-disable @typescript-eslint/no-floating-promises */

// TODO: sort out field validation

import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Grid, Typography, Button, useTheme } from '@mui/material'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import { tokens } from '../../theme'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { useFormik } from 'formik'
import * as yup from 'yup'

//  FIXME: resolve ts-expect error eslint @'s
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import AirportSelect from './AirportSelect.jsx'
// @ts-expect-error (fix this by typing ./contryCodes file, later)
import CabinClassSelect from './CabinClassSelect.jsx'

import {
  type iLeg,
  type iDisplayInitialValues
} from '../../scenes/estimates/flight/types'

const initialValues: iDisplayInitialValues = {
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

  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const formik = useFormik({
    initialValues,
    validationSchema,
    // right now, onSubmit doesn't do anything in this component
    //    can't have a form inside of a form (this component is inside of the FlightForm component)
    onSubmit: () => {}
  })

  const handleAddLeg = (): void => {
    if (
      formik.values.departure_airport !== '' &&
      formik.values.destination_airport !== ''
    ) {
      const leg: iLeg = JSON.parse(
        JSON.stringify({
          departure_airport: formik.values.departure_airport,
          destination_airport: formik.values.destination_airport,
          cabin_class: formik.values.cabin_class
        })
      )

      formik.values.legs.push(leg)
      parentState.push(leg)

      // do this to re-render the form and update the leg/s array display
      // FIXME: find a better way to do this.
      navigate(`/estimates/${initialValues.type}`)
    }
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
              <AirportSelect
                parentState={formik}
                endpoint='departure_airport'
                title='Departure Airport'
              />
            </Grid>
            <Grid item>
              <AirportSelect
                parentState={formik}
                endpoint='destination_airport'
                title='Destination Airport'
              />
            </Grid>
            <Grid item>
              <CabinClassSelect parentState={formik} />
            </Grid>
            <Grid item margin={'auto'} marginTop={'2rem'}>
              <Button
                onClick={handleAddLeg}
                sx={{
                  '&:hover': {
                    color: colors.primary[900],
                    backgroundColor: colors.grey[200]
                  },
                  color: colors.primary[100]
                }}
              >
                <AddIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {formik.values.legs.map((leg: iLeg, i: number) => (
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
