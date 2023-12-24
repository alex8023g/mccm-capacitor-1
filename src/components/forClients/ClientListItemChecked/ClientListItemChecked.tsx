import {
  Avatar,
  Checkbox,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import parsePhoneNumber from 'libphonenumber-js';
import { Client } from '../../../pages/AddClientPage';
import {
  useClientStore,
  useEditableTaskStore,
  useTaskStore,
} from '../../../zustand/store';

interface Props {
  client: Client;
  selectSeveral: boolean;
  handleClose: () => void;
}
export function ClientListItemChecked({ client, selectSeveral, handleClose }: Props) {
  // const setSelectedClient = useClientStore((state) => state.setSelectedClient);
  const selectedClients = useEditableTaskStore((state) => state.editableTask.clients);
  const addSelectedClient = useEditableTaskStore((state) => state.addSelectedClient);
  const delSelectedClient = useEditableTaskStore((state) => state.delSelectedClient);
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);

  return (
    <ListItem
      disablePadding
      sx={{ maxWidth: 400 }}
      secondaryAction={
        selectSeveral && (
          <Checkbox
            edge='end'
            checked={selectedClients.findIndex((item) => item.id === client.id) >= 0}
            onChange={(e) => {
              if (e.target.checked) {
                addSelectedClient(client);
              } else {
                delSelectedClient(client.id);
              }
              // setChecked2(e.target.checked);
            }}
            inputProps={{ 'aria-labelledby': client.id }}
          />
        )
      }
    >
      <ListItemButton
        sx={{ py: 0.5 }}
        onClick={() => {
          if (!selectSeveral) {
            // setSelectedClient(client);
            setEditableTask({ ...editableTask, clients: [client] });

            // if (editableTask) {
            //   setEditableTask({ ...editableTask, clients: [client] });
            // }
            handleClose();
          }
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
