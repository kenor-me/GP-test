import { useState } from 'react';
import { Row } from './Row';
import { DialogFeedback } from './DialogFeedback';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { TableTitle, TableList } from './Table.styles';

export const Table = ({ resultList, setLoad }) => {
  const { totalPeople, dietBook } = resultList;
  const clearLocalStorage = () => {
    localStorage.clear();
    setLoad(true);
  };
  const [open, setOpen] = useState(false);
  const [id, setId] = useState();
  const [starId, setStarId] = useState(2);
  const [isLocal, setIsLocal] = useState(false);
  const [comment, setComment] = useState('');
  const [phoneNumb, setPhoneNumb] = useState('');

  const getStars = (e) => {
    if (e.target.closest('svg[id]') && !isLocal) {
      const id = e.target.closest('svg[id]').id;
      setStarId(id);
    }
  };

  const handleClickOpen = (e) => {
    const id = e.currentTarget.id;
    setId(id);
    if (localStorage.getItem(`${id}`)) {
      const { stars, comment, phone } = JSON.parse(localStorage.getItem(`${id}`));
      setIsLocal(true);
      setStarId(+stars);
      setComment(comment);
      setPhoneNumb(phone);
    } else {
      setIsLocal(false);
      setStarId(2);
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
      <TableTitle>Feedback list</TableTitle>
      <TableList>
        {totalPeople.map(({ name, eatsPizza }, index) => (
          <Row
            onClick={handleClickOpen}
            color={isVegan(name) ? 'green' : 'grey.800'}
            name={name}
            disabled={eatsPizza ? false : true}
            key={index}
            id={index}
            visibility={eatsPizza && !localStorage.getItem(`${index}`) ? 'hidden' : false}
          />
        ))}
      </TableList>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button color="error" variant="contained" onClick={clearLocalStorage} icon={<DeleteIcon />}>
          Clear app
        </Button>
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
        display={isLocal ? 'none' : false}
      />
    </>
  );
};
