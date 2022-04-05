import { useState } from 'react';
import { ButtonPrimary } from './ButtonPrimary';
import { Row } from './Row';
import { DialogFeedback } from './DialogFeedback';
import { List, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const Table = ({ resultList, setLoad }) => {
  const { totalPeople, dietBook } = resultList;
  const clearLocalStorage = () => {
    localStorage.clear();
    setLoad(true);
  };
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [starId, setstarId] = useState(2);
  const [isLocal, setIsLocal] = useState(false);
  const [comment, setComment] = useState('');
  const [phoneNumb, setPhoneNumb] = useState('');

  const getStars = (e) => {
    if (e.target.closest('svg[id]') && !isLocal) {
      const id = e.target.closest('svg[id]').id;
      setstarId(id);
    }
  };

  const handleClickOpen = (e) => {
    const id = e.currentTarget.id;
    setId(id);
    if (localStorage.getItem(`${id}`)) {
      const { stars, comment, phone } = JSON.parse(localStorage.getItem(`${id}`));
      setIsLocal(true);
      setstarId(+stars);
      setComment(comment);
      setPhoneNumb(phone);
    } else {
      setIsLocal(false);
      setstarId(2);
      setComment('');
      setPhoneNumb('');
    }
    setOpen(true);
  };

  const isVegan = (item) => {
    const diet = dietBook.filter((el) => el.name === item);
    return diet.length === 1 ? diet[0].isVegan : false;
  };

  return (
    <>
      <Typography
        component="p"
        variant="h6"
        sx={{
          fontWeight: 'bold',
          pb: '15px',
          color: 'grey.800',
          textAlign: 'center',
          textTransform: 'uppercase',
        }}
      >
        Feedback list
      </Typography>
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          m: '20px auto',
          p: '0 25px',
          bgcolor: 'background.paper',
          border: 1,
          borderColor: 'grey.300',
          borderRadius: 1,
        }}
        aria-label="contacts"
      >
        {totalPeople.map((item, index) => (
          <Row
            onClick={handleClickOpen}
            color={isVegan(item.name) ? 'green' : 'grey.800'}
            name={item.name}
            disabled={item.eatsPizza ? false : true}
            key={index}
            id={index}
            visibility={item.eatsPizza && !localStorage.getItem(`${index}`) ? 'hidden' : false}
          />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <ButtonPrimary color="error" onClick={clearLocalStorage} icon={<DeleteIcon />}>
          Clear app
        </ButtonPrimary>
      </Box>
      <DialogFeedback
        open={open}
        setOpen={setOpen}
        name={id ? totalPeople[id].name : ''}
        nameId={id}
        starId={starId}
        getStars={getStars}
        isLocal={isLocal}
        comment={comment}
        phoneNumb={phoneNumb}
        // disabled={isLocal ? true : false}
        display={isLocal ? 'none' : false}
      />
    </>
  );
};
