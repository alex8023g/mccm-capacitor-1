import React, { useState } from 'react';
// import styles from './addclientpage.css';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useClientStore } from '../../zustand/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../App';
import { produce } from 'immer';
import parsePhoneNumber from 'libphonenumber-js';
import { randomStr } from '../../lib/randomStr';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import { ClientEditForm } from '../../components/forClients/ClientEditForm';

type PreffMsgr = 'whatsapp' | 'telegram' | null;
export interface Client {
  id: string;
  phoneNumber: string;
  name: string;
  notes: string;
  preffMsgr: PreffMsgr;
  tgChatId: string | null;
  tgUserName: string | null;
}

export function AddClientPage() {
  const [trySbmt, setTrySbmt] = useState(false);
  const [client, setClient] = useState<Client>({
    id: '',
    phoneNumber: '',
    name: '',
    notes: '',
    preffMsgr: null,
    tgChatId: null,
    tgUserName: null,
  });
  const [isPhoneNCorrect, setIsPhoneNCorrect] = useState(false);

  const addClient = useClientStore((state) => state.addClient);
  const navigate = useNavigate();
  let { state } = useLocation();

  return (
    <>
      <Typography variant='h6' mb={2}>
        Добавить клиента
      </Typography>

      {/* <ClientEditForm client={client} setClient={setClient} /> */}
    </>
  );
}
