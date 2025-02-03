import React from 'react'
import { Grid, Typography, Button, useTheme } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { tokens } from '../../theme'
import AirportSelect from './AirportSelect'
import CabinClassSelect from './CabinClassSelect'
import { type iLeg } from '../../scenes/estimates/flight/types'

interface FlightLegProps {
  legs?: iLeg[]
  onLegsChange?: (legs: iLeg[]) => void
  onUnsavedChanges?: (hasChanges: boolean) => void
  showOnly?: 'departure' | 'destination' | 'cabin' | 'review';
}

interface FlightLegFormValues {
  departure_airport: string
  destination_airport: string
  cabin_class: 'economy' | 'business' | 'first'
}

const initialValues: FlightLegFormValues = {
  departure_airport: 'Select Airport',
  destination_airport: 'Select Airport',
  cabin_class: 'economy'
}

const validationSchema = yup.object().shape({
  departure_airport: yup
    .string()
    .test('valid-airport', 'Departure airport is required',
      value => value !== 'Select Airport' && value !== '')
    .required('Departure airport is required'),
  destination_airport: yup
    .string()
    .test('valid-airport', 'Destination airport is required',
      value => value !== 'Select Airport' && value !== '')
    .required('Destination airport is required')
    .test('different-airports', 
      'Departure and destination airports must be different',
      function(value) {
        return value !== this.resolve(yup.ref('departure_airport'))
      }
    )
})

const FlightLeg = ({ legs = [], onLegsChange = () => {}, onUnsavedChanges }: FlightLegProps): JSX.Element => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {},
    validateOnChange: true,
    enableReinitialize: true
  })

  // Add useEffect to check for unsaved changes
  React.useEffect(() => {
    onUnsavedChanges?.(formik.dirty && formik.isValid)
  }, [formik.dirty, formik.isValid])

  const handleAddLeg = (): void => {
    if (!formik.isValid || !formik.dirty) return

    const newLeg: iLeg = {
      departure_airport: formik.values.departure_airport,
      destination_airport: formik.values.destination_airport,
      cabin_class: formik.values.cabin_class
    }

    onLegsChange([...legs, newLeg])
    
    // Reset just the form fields, not the entire form
    formik.setValues({
      departure_airport: 'Select Airport',
      destination_airport: 'Select Airport',
      cabin_class: 'economy'
    })
    formik.setTouched({})
  }

  const handleRemoveLeg = (index: number): void => {
    const updatedLegs = legs.filter((_, i) => i !== index)
    onLegsChange(updatedLegs)
  }

  return (
    <Grid item>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item>
          <Typography>Legs</Typography>
        </Grid>
        <Grid item xs>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item>
              <AirportSelect
                parentState={formik}
                endpoint='departure_airport'
                title='Departure Airport'
              />
              {formik.touched.departure_airport && formik.errors.departure_airport && (
                <Typography color="error" variant="caption">
                  {formik.errors.departure_airport}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <AirportSelect
                parentState={formik}
                endpoint='destination_airport'
                title='Destination Airport'
              />
              {formik.touched.destination_airport && formik.errors.destination_airport && (
                <Typography color="error" variant="caption">
                  {formik.errors.destination_airport}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <CabinClassSelect parentState={formik} />
            </Grid>
            <Grid item>
              <Button
                onClick={handleAddLeg}
                disabled={!formik.isValid || !formik.dirty}
                aria-label="Add leg"
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

      {legs.map((leg, index) => (
        <Grid
          container
          key={`leg-${index}`}
          spacing={2}
          alignItems="center"
          marginBottom={1}
        >
          <Grid item>{index + 1}</Grid>
          <Grid item>{leg.departure_airport}</Grid>
          <Grid item>{leg.destination_airport}</Grid>
          <Grid item>{leg.cabin_class}</Grid>
          <Grid item>
            <Button
              onClick={() => handleRemoveLeg(index)}
              aria-label="Remove leg"
              sx={{
                color: colors.primary[100],
                '&:hover': { color: colors.redAccent[500] }
              }}
            >
              <RemoveIcon />
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}

export default FlightLeg
