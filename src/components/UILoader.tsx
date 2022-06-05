import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const UILoader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
      <CircularProgress />
    </Box>
  );
}

export default UILoader