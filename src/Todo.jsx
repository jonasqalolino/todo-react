import React, { useState } from 'react';
import {
  ListItem,
  ListItemText,
  List,
  Modal,
  makeStyles,
  Backdrop,
  Fade,
  Button,
  FormControl,
  Container,
  Input,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import db from './firebase';
import './Todo.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTodo = () => {
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      {/* <Modal open={handleOpen} onClose={() => setOpen(false)}>
        <div>
          <h1>Modal</h1>
          <button onClick={() => setOpen(false)}></button>
        </div>
      </Modal> */}

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>Update</h2>
            <FormControl id='transition-modal-description'>
              <Input
                onChange={(e) => setInput(e.target.value)}
                placeholder={props.todo.todo}
              />
              <div className='modal-btn'>
                <Button onClick={updateTodo} color='primary' variant='outlined'>
                  Okay
                </Button>
              </div>
            </FormControl>
          </div>
        </Fade>
      </Modal>
      <Container maxWidth='sm'>
        <List>
          <div className='list'>
            {/* Content */}
            <div className='todo-content'>
              <ListItem>
                <ListItemText primary={props.todo.todo} />
              </ListItem>
            </div>

            {/* Buttons */}
            <div className='todo-buttons'>
              <div className='edit'>
                <Button color='default' variant='outlined' onClick={handleOpen}>
                  Edit
                </Button>
              </div>
              <div className='delete'>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={(e) =>
                    db.collection('todos').doc(props.todo.id).delete()
                  }>
                  <DeleteForeverIcon></DeleteForeverIcon>
                </Button>
              </div>
            </div>
          </div>
        </List>
      </Container>
    </>
  );
}

export default Todo;
