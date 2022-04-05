import Button from '@mui/material/Button';

export const ButtonPrimary = ({ icon, color, children, className, id, ...other }) => {
  return (
    <Button
      {...other}
      id={id}
      variant="contained"
      color={color}
      startIcon={icon}
      sx={{ minWidth: '120px' }}
    >
      {children}
    </Button>
  );
};
