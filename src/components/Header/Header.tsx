import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
// import styles from './header.css';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { routes } from '../../App';
import { SideNavigation } from '../SideNavigation';
import { SearchField } from '../SearchField';
import AddIcon from '@mui/icons-material/Add';
import { useClientStore, useTypeOfTaskStore } from '../../zustand/store';
import { ScheduleViewToggleBtn } from '../ScheduleViewToggleBtn';

// type TRoute = keyof typeof routes;
// type TRoute2 = typeof routes[keyof typeof routes];

// const pages = Object.keys(routes) as TRoute[];

// pages.map((page) => routes[page]);
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);
  const setEditableClient = useClientStore((state) => state.setEditableClient);
  const setIsTypeOfTaskDialogOpen = useTypeOfTaskStore(
    (state) => state.setIsTypeOfTaskDialogOpen
  );
  const setEditableTypeOfTask = useTypeOfTaskStore(
    (state) => state.setEditableTypeOfTask
  );
  // const navigate = useNavigate();
  // const { pathname } = window.location;
  console.log(pathname);
  const isClientsPage = pathname === routes.clientsPage.route;
  const isTypesOfTaskPage = pathname === routes.typesOfTaskPage.route;

  const isHomePage = pathname === routes.homePage.route;
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position={'fixed'}>
          {/* <AppBar position={pathname === '/schedule' ? 'static' : 'sticky'}> */}
          <Toolbar>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              sx={{ mr: 2 }}
              onClick={() => {
                setIsMenuOpen((st) => !st);
              }}
            >
              <MenuIcon />
            </IconButton>
            {!isClientsPage && (
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Mcrm
              </Typography>
            )}
            {isHomePage && <ScheduleViewToggleBtn />}
            {isClientsPage && <SearchField />}
            {!isClientsPage && <Button color='inherit'>Login</Button>}
            {isClientsPage && (
              <Button
                variant='contained'
                onClick={() => {
                  setEditableClient({
                    id: '',
                    phoneNumber: '',
                    name: '',
                    notes: '',
                    preffMsgr: null,
                    tgChatId: null,
                    tgUserName: null,
                  });
                  setIsClientDialogOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            )}
            {isTypesOfTaskPage && (
              <Button
                variant='contained'
                onClick={() => {
                  setEditableTypeOfTask({
                    id: '',
                    taskName: '',
                    taskDuration: 1,
                    taskDurationText: '1 час',
                    byDefault: false,
                  });
                  setIsTypeOfTaskDialogOpen(true);
                }}
              >
                <AddIcon />
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {/* <Drawer
          // anchor={anchor}
          open={isMenuOpen}
          onClose={() => setIsMenuOpen((st) => !st)}
        >
          <List>
            {pages.map(
              // {['Главная', 'доб. клиента', 'Расписание', 'доб. Задачу'].map(
              (page, index) => (
                <ListItem key={routes[page].route} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(routes[page].route);
                    }}
                  >
                    <ListItemText primary={routes[page].name} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Drawer> */}
        <SideNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </Box>
      <Box sx={{ pt: 8, pl: 2, pr: 2 }}>
        <Outlet />
      </Box>
    </>
  );
}
