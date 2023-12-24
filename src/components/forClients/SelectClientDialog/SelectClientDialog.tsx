import {
  AppBar,
  Avatar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Client } from '../../../pages/AddClientPage';
import { ClientListItem } from '../ClientListItem';
import {
  useSearchStore,
  useClientStore,
  useTaskStore,
  useEditableTaskStore,
} from '../../../zustand/store';
import { ClientListItemSimple } from '../ClientListItemSimple';
// import styles from './selectclientdialog.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import parsePhoneNumber from 'libphonenumber-js';
import { SearchField } from '../../SearchField';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CloseIcon from '@mui/icons-material/Close';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import CheckIcon from '@mui/icons-material/Check';
import { ClientListItemChecked } from '../ClientListItemChecked';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

// useClientStore.setState({ selectedClient: null });
useSearchStore.setState({ searchValue: '' });

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export function SelectClientDialog({ open, setOpen }: Props) {
  // const [open, setOpen] = useState(false);

  const clients = useClientStore((state) => state.clients);
  // const selectedClient = useClientStore((state) => state.selectedClient);
  const selectedClients = useEditableTaskStore((state) => state.editableTask.clients);
  const [selectSeveral, setSelectSeveral] = React.useState(!!selectedClients[1]);
  const searchValue = useSearchStore((state) => state.searchValue);
  const delSelectedClient = useEditableTaskStore((state) => state.delSelectedClient);
  // const setSelectedClient = useClientStore((state) => state.setSelectedClient);
  // const editableTask = useTaskStore((state) => state.editableTask);
  // const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);

  let filteredClients = structuredClone(clients);

  if (searchValue) {
    filteredClients = clients.filter(
      (client) =>
        client.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        client.phoneNumber.includes(
          String(parsePhoneNumber(searchValue, 'RU')?.number)
        ) ||
        client.phoneNumber.includes(searchValue)
    );
  }
  function handleAlignment(
    event: React.MouseEvent<HTMLElement>,
    newAlignment: boolean | null
  ) {
    if (newAlignment !== null) {
      setSelectSeveral(newAlignment);
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <List sx={{ mb: 2, py: 0, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        {selectedClients.map((client, index) => (
          <>
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={() => {
                    delSelectedClient(client.id);
                  }}
                  // ref={anchorRef}
                >
                  <HighlightOffIcon />
                </IconButton>
              }
            >
              <ListItemButton sx={{ py: 0.5 }} onClick={handleClickOpen}>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={client?.name}
                  secondary={parsePhoneNumber(
                    client?.phoneNumber || '',
                    'RU'
                  )?.formatNational()}
                />
              </ListItemButton>
            </ListItem>
            {index !== selectedClients.length - 1 && <Divider />}
          </>
        ))}
      </List>
      {/* {selectedClients.length === 0 && (
        <Button
          variant='outlined'
          sx={{ mb: 2, width: '100%' }}
          onClick={handleClickOpen}
        >
          Выбрать клиента
        </Button>
      )} */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <SearchField />
            <IconButton
              // edge='end'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List sx={{ py: 8 }}>
          {filteredClients.map(
            (client: Client, i: number, { length }: { length: number }) => (
              <>
                {/* <ClientListItemSimple client={client} handleClose={handleClose} /> */}
                <ClientListItemChecked
                  client={client}
                  selectSeveral={selectSeveral}
                  handleClose={handleClose}
                />
                {i + 1 !== length && <Divider variant='inset' component='li' />}
              </>
            )
          )}
        </List>
        <Stack
          spacing={2}
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            mb: 2,
            px: 2,
            bgcolor: 'white',
          }}
        >
          {selectSeveral && (
            <Button
              variant='contained'
              onClick={() => {
                handleClose();
                // if (editableTask) {
                //   setEditableTask({ ...editableTask, clients: selectedClients });
                // }
              }}
            >
              ok
            </Button>
          )}
          <ToggleButtonGroup
            color='primary'
            // sx={{ px: 2 }}
            value={selectSeveral}
            exclusive
            onChange={handleAlignment}
            aria-label='Platform'
          >
            {/* <ToggleButton value='selectOne' sx={{ flexGrow: 0.5 }}> */}
            <ToggleButton value={false} sx={{ flexGrow: 0.5 }}>
              <CheckIcon />
            </ToggleButton>
            <ToggleButton value={true} sx={{ flexGrow: 0.5 }}>
              <ChecklistRtlIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Dialog>
    </>
  );
}
