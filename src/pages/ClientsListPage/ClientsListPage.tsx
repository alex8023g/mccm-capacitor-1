import React, { useEffect, useState } from 'react';
import { useSearchStore, useClientStore } from '../../zustand/store';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Fab,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  alpha,
  styled,
} from '@mui/material';
// import styles from './clientslistpage.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import parsePhoneNumber from 'libphonenumber-js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { routes } from '../../App';
import SearchIcon from '@mui/icons-material/Search';
import { Client } from '../AddClientPage';
import { ClientListItem } from '../../components/forClients/ClientListItem';
import { NewClientDialog } from '../../components/forClients/NewClientDialog';

export function ClientsListPage() {
  const clients = useClientStore((state) => state.clients);
  const searchValue = useSearchStore((state) => state.searchValue);
  const setSearchValue = useSearchStore((state) => state.setSearchValue);

  useEffect(() => {
    setSearchValue('');
  }, []);

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

  return (
    <>
      <Box position='relative'>
        <h2>Клиенты</h2>
        <List>
          {filteredClients.map(
            (client: Client, i: number, { length }: { length: number }) => (
              <>
                <ClientListItem client={client} />
                {i + 1 !== length && <Divider variant='inset' component='li' />}
              </>
            )
          )}
        </List>
      </Box>
      <NewClientDialog />
    </>
  );
}
