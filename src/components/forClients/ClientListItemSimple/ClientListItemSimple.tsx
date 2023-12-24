import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
// import styles from './clientlistitemsimple.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import parsePhoneNumber from 'libphonenumber-js';
import { Client } from '../../../pages/AddClientPage';
import { useClientStore } from '../../../zustand/store';

interface Props {
  client: Client;
  handleClose: () => void;
}
export function ClientListItemSimple({ client, handleClose }: Props) {
  const setSelectedClient = useClientStore((state) => state.setSelectedClient);
  return (
    <ListItem disablePadding sx={{ maxWidth: 400 }}>
      <ListItemButton
        sx={{ py: 0.5 }}
        onClick={() => {
          setSelectedClient(client);
          handleClose();
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={client.name}
          secondary={parsePhoneNumber(client.phoneNumber, 'RU')?.formatNational()}
        />
      </ListItemButton>
    </ListItem>
  );
}
