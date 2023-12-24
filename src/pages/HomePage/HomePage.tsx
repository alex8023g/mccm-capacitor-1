import React, { useState } from 'react';
import styles from './homepage.module.css';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppState } from '../../zustand/store';
import { SchedulePage } from '../SchedulePage';
import { SchedulePage2 } from '../SchedulePage2';

export function HomePage() {
  const scheduleView = useAppState((state) => state.scheduleView);

  if (scheduleView === 'allDayScroll') {
    return <SchedulePage />;
  } else {
    return <SchedulePage2 />;
  }

  // return (
  //   <Box padding={2}>
  //     <Typography variant='h4'>Главная страница</Typography>
  //     <ul>
  //       <li>
  //         <Link to='/addtask'>Добавить задачу</Link>
  //       </li>
  //       <li>
  //         <Link to='/schedule'>Расписание на день</Link>
  //       </li>
  //       <li>
  //         <Link to='/msg'>Сообщения в телеграм</Link>
  //       </li>
  //       <li>
  //         <Link to='/addclient' state={{ fromHomePage: true }}>
  //           Добавить клиента
  //         </Link>
  //       </li>
  //     </ul>
  //   </Box>
  // );
}
