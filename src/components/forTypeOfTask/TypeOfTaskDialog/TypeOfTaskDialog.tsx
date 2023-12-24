import {
  AppBar,
  Box,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
// import styles from './typeoftaskdialog.css';
import CloseIcon from '@mui/icons-material/Close';
import { TypeOfTaskEditForm } from '../TypeOfTaskEditForm';
import { TransitionProps } from '@mui/material/transitions';
import { useTypeOfTaskStore } from '../../../zustand/store';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export function TypeOfTaskDialog() {
  const isTypeOfTaskDialogOpen = useTypeOfTaskStore(
    (state) => state.isTypeOfTaskDialogOpen
  );
  const setIsTypeOfTaskDialogOpen = useTypeOfTaskStore(
    (state) => state.setIsTypeOfTaskDialogOpen
  );

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    setIsTypeOfTaskDialogOpen(false);
  };

  return (
    <>
      {/* <Button variant='outlined' sx={{ mb: 2, width: '100%' }} onClick={handleClickOpen}>
        Новый клиент
      </Button> */}
      <Dialog
        fullScreen
        open={isTypeOfTaskDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Добавить вид работ
            </Typography>
            {/* <Button autoFocus color='inherit' onClick={handleClose}>
              save
            </Button>{' '} */}
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ px: 2, pt: 5 }}>
          <TypeOfTaskEditForm />
        </Box>
      </Dialog>
    </>
  );
}
