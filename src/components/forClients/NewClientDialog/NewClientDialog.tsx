import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { SetStateAction, useEffect, useState } from 'react';
// import styles from './newclientdialog.css';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import { ClientEditForm } from '../ClientEditForm';
import { Client } from '../../../pages/AddClientPage';
import { useClientStore } from '../../../zustand/store';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export function NewClientDialog() {
  // const [open, setOpen] = useState(false);
  const editableClient = useClientStore((state) => state.editableClient);
  const [client, setClient] = useState<Client>({
    id: '',
    phoneNumber: '',
    name: '',
    notes: '',
    preffMsgr: null,
    tgChatId: null,
    tgUserName: null,
  });

  const isClientDialogOpen = useClientStore((state) => state.isClientDialogOpen);
  const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    setIsClientDialogOpen(false);
  };

  return (
    <>
      {/* <Button variant='outlined' sx={{ mb: 2, width: '100%' }} onClick={handleClickOpen}>
        Новый клиент
      </Button> */}
      <Dialog
        fullScreen
        open={isClientDialogOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Новый клиент
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
          <ClientEditForm
          // client={
          //   selectedClient || {
          //     id: '',
          //     phoneNumber: '',
          //     name: '',
          //     notes: '',
          //     preffMsgr: null,
          //     tgChatId: null,
          //     tgUserName: null,
          //   }
          // }
          // setClient={setClient}
          />
          {/* <Stack direction='row' spacing={2} useFlexGap flexWrap='nowrap'>
            <Button variant='outlined' sx={{ flexGrow: 0.5 }} onClick={handleClose}>
              отмена
            </Button>
            <Button variant='contained' sx={{ flexGrow: 0.5 }}>
              сохранить
            </Button>
          </Stack> */}
        </Box>
      </Dialog>
    </>
  );
}
