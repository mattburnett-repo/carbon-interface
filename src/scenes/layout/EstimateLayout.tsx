import { Box } from "@mui/material";
import { ReactNode } from "react";

interface EstimateLayoutProps {
  formSection: ReactNode;
  displaySection: ReactNode;
}

export const EstimateLayout = ({ formSection, displaySection }: EstimateLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid grey',
      }}
    >
      <Box
        sx={{
          height: '34%',
          padding: '10px',
          overflow: 'auto',
          border: '1px dashed grey'
        }}
      >
        {formSection}
      </Box>

      <Box
        sx={{
          height: '66%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px dashed grey'
        }}
      >
        {displaySection}
      </Box>
    </Box>
  );
}; 