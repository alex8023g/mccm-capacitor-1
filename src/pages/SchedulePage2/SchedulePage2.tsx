import React, { useEffect } from 'react';
import st from './schedulepage.module.css';
import {
  Box,
  Button,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { halfHoursArr, monthArr, weekDaysArr } from '../../lib/const';
import cx from 'classnames';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DaySchedule } from '../../components/forSchedulePage/DaySchedule';
// import { theme } from '../AddTaskPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEditableTaskStore, useTaskStore } from '../../zustand/store';
import { AddTaskBtn } from '../../components/forSchedulePage/AddTaskBtn';
import { DaysOfWeekToggleBtn } from '../../components/DaysOfWeekToggleBtn';
import { TaskArea } from '../../components/forSchedulePage/TaskArea';

const days30Arr = Array.from(Array(30).keys());

const today = dayjs();
// useEditableTaskStore.setState({
//   editableTask: {
//     id: '',
//     isTaskRegular: false,
//     weekDays: [],
//     dateTime: dayjs().hour(0).minute(0).second(0).format(),
//     clients: [],
//     typesOfTask: [],
//   },
// });

export function SchedulePage2() {
  const tasks = useTaskStore((state) => state.tasks);
  const currentDateStr = useEditableTaskStore((state) => state.editableTask.dateTime);
  const setEditableTaskDate = useEditableTaskStore((state) => state.setEditableTaskDate);
  const currentDate = dayjs(currentDateStr);
  console.log(currentDateStr);

  useEffect(() => {
    setEditableTaskDate(dayjs().hour(0).minute(0).second(0).format());
  }, []);

  const tasksOfDay = tasks.filter(
    (task) =>
      (!task.isTaskRegular &&
        task.dateTime?.substring(0, 10) === currentDateStr?.substring(0, 10)) ||
      (task.isTaskRegular && task.weekDays.includes(currentDate.day()))
  );
  console.log(tasksOfDay);

  return (
    <>
      <Box>
        <table>
          <tbody>
            <tr key={currentDateStr}>
              <th className={st.th1}></th>
              <th className={st.th2}>
                <Typography variant='h6'>
                  {/* {weekDaysArr[today.day()].name} {today.date()}{' '} */}
                  {weekDaysArr.find((wd) => wd.v === currentDate.day())?.name}{' '}
                  {currentDate.date()} {monthArr[currentDate.month()]?.shortName}
                </Typography>
              </th>
            </tr>

            {halfHoursArr.map((time, i) => {
              const taskAtTime = tasksOfDay.find(
                (task) => task.dateTime?.substring(11, 16) === time
              );

              return (
                <tr key={today.format() + String(i)} className={st.tr1}>
                  <td className={st.td1}>{i % 2 === 0 ? time : ''}</td>
                  <td className={st.td2}>
                    {!!taskAtTime && <TaskArea taskAtTime={taskAtTime} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
      <AddTaskBtn />
      <DaysOfWeekToggleBtn />
    </>
  );
}
