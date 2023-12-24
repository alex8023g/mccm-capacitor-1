import React from 'react';
import st from './schedulepage.module.css';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import { halfHoursArr, weekDaysArr } from '../../lib/const';
import cx from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DaySchedule } from '../../components/forSchedulePage/DaySchedule';
// import { theme } from '../AddTaskPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTaskStore } from '../../zustand/store';
import { AddTaskBtn } from '../../components/forSchedulePage/AddTaskBtn';

// const weekDaysArr = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
// const monthArr = [
//   'Янв',
//   'Фев',
//   'Март',
//   'Апр',
//   'Май',
//   'Июнь',
//   'Июль',
//   'Авг',
//   'Сент',
//   'Окт',
//   'Нояб',
//   'Дек',
// ];

const days30Arr = Array.from(Array(30).keys());

const today = dayjs();

export function SchedulePage() {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    // <ThemeProvider theme={theme}>
    //   <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
    <>
      <Box>
        <table>
          <tbody>
            {days30Arr.map((i) => {
              const date = today.add(i, 'd');
              const dateStr = date.format().substring(0, 10);
              const tasksOfDay = tasks.filter(
                (task) =>
                  (!task.isTaskRegular && task.dateTime?.substring(0, 10) === dateStr) ||
                  (task.isTaskRegular && task.weekDays.includes(date.day()))
                // task.weekDays.includes(weekDaysArr[date.day()].shortName)
              );
              // console.log(String(date.day()), tasks, tasksOfDay);
              return <DaySchedule today={date} i={i} tasksOfDay={tasksOfDay} />;
            })}
          </tbody>
        </table>
      </Box>
      {/* <Box sx={{ position: 'fixed', bottom: 2, right: 2, zIndex: 200 }}> */}
      <AddTaskBtn />
      {/* </Box> */}
    </>
    //   </LocalizationProvider>
    // </ThemeProvider>
  );
}
