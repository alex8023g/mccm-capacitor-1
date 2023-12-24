import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useClientStore } from '../../zustand/store';
import { Client } from '../AddClientPage';
import { Box, Button, Typography } from '@mui/material';
import { ClientEditForm } from '../../components/forClients/ClientEditForm';

// import styles from './clienteditpage.css';

export function EditClientPage() {
  const [trySbmt, setTrySbmt] = useState(false);
  const [isPhoneNCorrect, setIsPhoneNCorrect] = useState(true);

  // const clients = useClientStore((state) => state.clients);
  const updClient = useClientStore((state) => state.updClient);
  const navigate = useNavigate();
  const {
    state: { clientInitial },
  } = useLocation();
  const [client, setClient] = useState<Client>(
    clientInitial || {
      id: '',
      phoneNumber: '',
      name: '',
      notes: '',
      preffMsgr: null,
      tgChatId: null,
      tgUserName: null,
    }
  );
  return (
    <>
      <Typography variant='h6' mb={2}>
        Редактирование данных клиента
      </Typography>

      {/* <ClientEditForm client={client} setClient={setClient} /> */}
    </>
  );
}
