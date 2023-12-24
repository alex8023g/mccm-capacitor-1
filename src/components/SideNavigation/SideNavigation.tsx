import React from 'react';
import { pages, routes, TRoute } from '../../App';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useEditableTaskStore, useTypeOfTaskStore } from '../../zustand/store';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

// import styles from './sidenavigation.css';
dayjs.extend(utc);

interface Props {
  isMenuOpen: boolean;
  setIsMenuOpen: (st: boolean) => void;
}

// const pages = Object.keys(routes) as TRoute[];
// type TRoute = keyof typeof routes;

export function SideNavigation({ isMenuOpen, setIsMenuOpen }: Props) {
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);
  const typesOfTask = useTypeOfTaskStore((state) => state.typesOfTask);
  const navigate = useNavigate();

  return (
    <nav>
      <Drawer
        // anchor={anchor}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h6' sx={{ my: 1.4 }}>
            MCRM
          </Typography>
        </Box>

        <Divider />
        <List>
          {pages.map(
            // {['Главная', 'доб. клиента', 'Расписание', 'доб. Задачу'].map(
            (page, index) =>
              ![
                'editClientPage',
                'editTypeOfTaskPage',
                'addClientPage',
                'addTypeOfTaskPage',
                'editTaskPage',
              ].includes(page) ? (
                <ListItem key={routes[page].route} disablePadding>
                  <ListItemButton
                    onClick={() => {
                      setIsMenuOpen(false);
                      if (page === 'addTaskPage') {
                        const typeOfTaskByDefault =
                          typesOfTask.findIndex((tot) => tot.byDefault === true) >= 0
                            ? [typesOfTask.find((tot) => tot.byDefault === true)!]
                            : [];
                        setEditableTask({
                          id: '',
                          isTaskRegular: false,
                          weekDays: [],
                          dateTime: dayjs().hour(0).minute(0).format(),
                          clients: [],
                          typesOfTask: typeOfTaskByDefault,
                        });
                      }
                      navigate(routes[page].route);
                    }}
                  >
                    {/* <Link to={routes[page].route}> */}
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                      {routes[page].icon}
                    </ListItemIcon>
                    <ListItemText primary={routes[page].name} />
                    {/* </Link> */}
                  </ListItemButton>
                </ListItem>
              ) : null
          )}
        </List>
      </Drawer>
    </nav>
  );
}
