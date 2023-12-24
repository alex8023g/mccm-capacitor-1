import {
  Box,
  Button,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import styles from './clienteditform.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import parsePhoneNumber from 'libphonenumber-js';
import { Client } from '../../../pages/AddClientPage';
import { useClientStore } from '../../../zustand/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../App';
import { randomStr } from '../../../lib/randomStr';

type PreffMsgr = 'whatsapp' | 'telegram' | null;

interface Props {
  client: Client;
  setClient: Dispatch<SetStateAction<Client>>;
}

export function ClientEditForm() {
  // { client, setClient }: Props
  const client = useClientStore((state) => state.editableClient);
  const setClient = useClientStore((state) => state.setEditableClient);
  const [phoneN, setPhoneN] = useState(
    parsePhoneNumber(client.phoneNumber, 'RU')?.formatNational()
  );
  const [formatedPhoneN, setFormatedPhoneN] = useState(
    parsePhoneNumber(client.phoneNumber, 'RU')?.formatNational()
  );
  const [isPhoneNCorrect, setIsPhoneNCorrect] = useState(true);
  const [trySbmt, setTrySbmt] = useState(false);
  const navigate = useNavigate();
  const updClient = useClientStore((state) => state.updClient);
  const addClient = useClientStore((state) => state.addClient);
  const { pathname } = useLocation();
  const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);
  const setSelectedClient = useClientStore((state) => state.setSelectedClient);

  console.log(pathname);
  let btnText = '';
  if (pathname === routes.addClientPage.route) {
    btnText = 'Добавить клиента';
  } else if (pathname === routes.editClientPage.route) {
    btnText = 'Сохранить изменения';
  }
  function handleChangePreffMsgr(
    event: React.MouseEvent<HTMLElement>,
    selectedItem: PreffMsgr
  ) {
    console.log('nextView', selectedItem);
    setClient({ ...client, preffMsgr: selectedItem });
    // setClient((cl) => ({ ...cl, preffMsgr: selectedItem }));
  }

  return (
    <>
      <Box
        component={'form'}
        sx={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => {
          e.preventDefault();
          console.log('submit');
          setTrySbmt(true);
          if (!isPhoneNCorrect || !phoneN) {
            console.log('phoneN не корректный');
            return;
          }
          if (client.preffMsgr === 'telegram' && !client.tgUserName) {
            console.log('необходимо указать tgUserName');
            return;
          }

          if (client.id) {
            updClient(client);
          } else {
            addClient({ ...client, id: randomStr(8) });
          }
          if (pathname === routes.addTaskPage.route) {
            setSelectedClient(client);
          }
          setIsClientDialogOpen(false);
        }}
      >
        <TextField
          id='outlined-basic'
          label='№ телефона'
          variant='outlined'
          type='tel'
          error={(!isPhoneNCorrect || !phoneN) && trySbmt}
          sx={{ mb: 2 }}
          value={phoneN}
          onChange={(e) => {
            setPhoneN(e.target.value);
            const parsedPhoneN = parsePhoneNumber(e.target.value, 'RU');
            setFormatedPhoneN(parsedPhoneN?.formatNational() || '');
            setClient({ ...client, phoneNumber: parsedPhoneN?.number || '' });
            setIsPhoneNCorrect(parsedPhoneN?.isValid() || false);
          }}
          helperText={formatedPhoneN || phoneN}
        />

        <TextField
          // id='outlined-controlled'
          label='Имя'
          // required
          sx={{ mb: 2 }}
          value={client.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setClient({ ...client, name: e.target.value });
          }}
        />
        <TextField
          // id='outlined-textarea'
          label='Примечания'
          sx={{ mb: 2 }}
          multiline
          minRows={2}
          value={client.notes}
          onChange={(e) => {
            setClient({ ...client, notes: e.target.value });
          }}
        />
        <Typography>Предпочитаемый мессенджер</Typography>

        <ToggleButtonGroup
          orientation='vertical'
          value={client.preffMsgr}
          exclusive
          color='primary'
          sx={{ mb: 2 }}
          onChange={handleChangePreffMsgr}
        >
          <ToggleButton value='whatsapp' aria-label='list'>
            <WhatsAppIcon
            // color={client.preffMsgr === 'whatsapp' ? 'primary' : 'action'}
            />
          </ToggleButton>
          <ToggleButton value='telegram' aria-label='module'>
            <TelegramIcon
            // color={client.preffMsgr === 'telegram' ? 'primary' : 'action'}
            />
          </ToggleButton>
        </ToggleButtonGroup>
        {client.preffMsgr === 'telegram' && (
          <TextField
            label='@UserName (имя пользователя в телеграм)'
            // required
            autoFocus
            sx={{ mb: 2 }}
            value={client.tgUserName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setClient({ ...client, tgUserName: e.target.value });
            }}
            error={client.preffMsgr === 'telegram' && !client.tgUserName && trySbmt}
            helperText={
              client.preffMsgr === 'telegram' &&
              !client.tgUserName &&
              trySbmt &&
              'для telegram необходимо указанть @UserName'
            }
          />
        )}
        <Stack direction='row' spacing={2} useFlexGap flexWrap='nowrap'>
          <Button
            variant='outlined'
            sx={{ flexGrow: 0.5 }}
            onClick={() => {
              setIsClientDialogOpen(false);
            }}
          >
            отмена
          </Button>
          <Button type='submit' variant='contained' sx={{ flexGrow: 0.5 }}>
            сохранить
          </Button>
        </Stack>
      </Box>
    </>
  );
}
