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
        maxHeight: '85vh',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid grey',
      }}
    >
      <Box
        sx={{
          flex: '0 0 auto',
          minHeight: '30%',
          maxHeight: '40%',
          padding: '10px',
          overflow: 'auto',
          border: '1px dashed grey'
        }}
      >
        {formSection}
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          border: '1px dashed grey',
          overflow: 'auto'
        }}
      >
        {displaySection}
      </Box>
    </Box>
  );
}; 