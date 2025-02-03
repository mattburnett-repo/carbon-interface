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
        maxWidth: '600px',  // Mobile device feel while staying desktop-friendly
        margin: '0 auto',   // Centers the layout
        border: '1px solid grey',  // Added border
      }}
    >
      <Box
        sx={{
          height: '34%',
          padding: '10px',
          overflow: 'auto',
          border: '1px dashed grey'  // Added interior border
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
          border: '1px dashed grey'  // Added interior border
        }}
      >
        {displaySection}
      </Box>
    </Box>
  );
}; 