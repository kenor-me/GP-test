import { Box, Typography } from '@mui/material';

export const Feedback = ({ comment, phoneNumb }) => {
  return (
    <Box sx={{ p: '25px 0' }}>
      <Typography
        component="p"
        variant="h6"
        sx={{ fontWeight: 'bold', p: '5px 0 0', color: 'grey.700' }}
      >
        Phone
      </Typography>
      <Typography
        component="p"
        variant="h6"
        sx={{
          fontWeight: '500',
          fontSize: '16px',
          color: 'grey.800',
        }}
      >
        {phoneNumb}
      </Typography>
      <Typography
        component="p"
        variant="h6"
        sx={{ fontWeight: 'bold', p: '5px 0 0', color: 'grey.700' }}
      >
        Comment
      </Typography>
      <Typography
        component="p"
        variant="h6"
        sx={{
          fontWeight: '500',
          fontSize: '16px',
          color: 'grey.800',
        }}
      >
        {comment}
      </Typography>
    </Box>
  );
};
