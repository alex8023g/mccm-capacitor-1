import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { useRef, useState } from 'react';
// import styles from './clientlistitem.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import parsePhoneNumber from 'libphonenumber-js';
import { Client } from '../../../pages/AddClientPage';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useClientStore } from '../../../zustand/store';
import { Link, useNavigate } from 'react-router-dom';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TelegramIcon from '@mui/icons-material/Telegram';
import PhoneIcon from '@mui/icons-material/Phone';
import { routes } from '../../../App';

export function ClientListItem({ client }: { client: Client }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const deleteClient = useClientStore((state) => state.deleteClient);
  const navigate = useNavigate();
  const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);
  // const setSelectedClient = useClientStore((state) => state.setSelectedClient);
  const setEditableClient = useClientStore((state) => state.setEditableClient);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setMenuOpen(false);
  };
  return (
    <ListItem
      disablePadding
      sx={{ maxWidth: 400 }}
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => {
            setMenuOpen((mo) => !mo);
          }}
          ref={anchorRef}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton sx={{ py: 0.5 }}>
        {/* <ListItemIcon> */}
        <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
        {/* </ListItemIcon> */}
        <ListItemText
          primary={client.name}
          secondary={parsePhoneNumber(client.phoneNumber, 'RU')?.formatNational()}
        />
      </ListItemButton>
      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-end'
        transition
        // disablePortal
        sx={{ popper: { zIndex: 1300 } }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top',
            }}
          >
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={menuOpen}
                  // id='composition-menu'
                  // aria-labelledby='composition-button'
                  // onKeyDown={handleListKeyDown}
                >
                  {/* <MenuItem
                      onClick={() => {
                        // increasePomodoroTotal(task);
                      }}
                    >
                      <AddCircleOutlineIcon sx={style.mr8} />
                      Увеличить
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        decreasePomodoroTotal(task);
                      }}
                      disabled={task.pomodoroTotal === 1 ? true : false}
                    >
                      <RemoveCircleOutlineIcon sx={style.mr8} />
                      Уменьшить
                    </MenuItem> */}
                  {client.preffMsgr === 'whatsapp' && (
                    <MenuItem
                      onClick={(e) => {
                        window
                          .open(
                            `whatsapp://send?phone=${client.phoneNumber}&text=Добрый день!`,
                            '_blank'
                          )
                          ?.focus();
                        handleClose(e);
                      }}
                    >
                      <WhatsAppIcon sx={{ mr: 1 }} />
                      сообщ. в whatsapp
                    </MenuItem>
                  )}
                  {client.preffMsgr === 'telegram' && (
                    <MenuItem
                      onClick={(e) => {
                        window
                          .open(`tg://resolve?domain=${client.tgUserName}`, '_blank')
                          ?.focus();
                        handleClose(e);
                      }}
                    >
                      <TelegramIcon sx={{ mr: 1 }} />
                      сообщ. в telegram
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={(e) => {
                      window.open(`tel:${client.phoneNumber}`, '_blank')?.focus();
                      handleClose(e);
                    }}
                  >
                    <PhoneIcon sx={{ mr: 1 }} />
                    позвонить
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      // navigate(routes.editClientPage.route, {
                      //   state: { clientInitial: client },
                      // });
                      setEditableClient(client);
                      setIsClientDialogOpen(true);
                    }}
                  >
                    <ModeEditOutlineIcon sx={{ mr: 1 }} />
                    Редактировать
                  </MenuItem>

                  <MenuItem
                    onClick={(e) => {
                      deleteClient(client.id);
                      handleClose(e);
                    }}
                  >
                    <DeleteOutlineIcon sx={{ mr: 1 }} />
                    Удалить
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ListItem>
  );
}
