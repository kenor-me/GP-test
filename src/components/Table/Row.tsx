import { ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';

type TProps = {
  color: string;
  disabled: boolean;
  visibility: boolean | string;
  name: string;
  onClick: () => void;
  id: string;
};

export const Row: React.FC<TProps> = ({
  color,
  disabled,
  visibility,
  name,
  onClick,
  id,
}): JSX.Element => {
  return (
    <>
      <ListItem disablePadding>
        <ListItemButton id={id} onClick={onClick} disabled={disabled} sx={{ p: '8px 0' }}>
          <ListItemIcon sx={{ visibility: `${visibility}` }}>
            {disabled && <ClearIcon fontSize="large" />}
            {!disabled && <CheckCircleOutlineIcon fontSize="large" color="success" />}
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: `${color}`,
              fontWeight: 'bold',
              variant: 'body1',
            }}
            primary={name}
          />
        </ListItemButton>
      </ListItem>
    </>
  );
};
