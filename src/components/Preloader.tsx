import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export const Preloader = (): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        component="p"
        variant="h6"
        sx={{ fontWeight: 'bold', pb: '15px', color: 'grey.700' }}
      >
        Loading ...
      </Typography>
      <CircularProgress color="success" />
    </Box>
  );
};
