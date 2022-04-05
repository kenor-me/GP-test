import { TextField } from '@mui/material';

type TPropsInput = {
  inputName: string;
};

export const Input: React.FC<TPropsInput> = ({ inputName }): JSX.Element => {
  return (
    <li>
      <TextField
        sx={{ width: '100%' }}
        id={inputName}
        name={inputName}
        label={inputName}
        variant="filled"
        color="success"
        autoComplete="off"
      />
    </li>
  );
};
