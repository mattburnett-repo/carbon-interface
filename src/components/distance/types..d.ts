import { FC } from 'react'

interface DistanceUnitsProps {
  parentState: {
    getFieldProps: (fieldName: string) => any
  }
}

declare const DistanceUnits: FC<DistanceUnitsProps>
export default DistanceUnits