import React from 'react';
import st from './addtaskbtn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import {
  // useDateTaskStore,
  useEditableTaskStore,
  useTypeOfTaskStore,
} from '../../../zustand/store';
import { routes } from '../../../App';

export function AddTaskBtn() {
  // { today, i }: { today: dayjs.Dayjs; i: number }
  // const dateTask = useDateTaskStore((state) => state.dateTask);
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);
  const typesOfTask = useTypeOfTaskStore((state) => state.typesOfTask);

  const navigate = useNavigate();
  // const zIndex = 100 - i;
  return (
    // <Link
    //   to={'/addtask'}
    //  state={dateTask}
    // >
    <Fab
      size='large'
      color='primary'
      sx={{
        // position: 'absolute',
        bottom: 60,
        right: 20,
        position: 'fixed',
        zIndex: 200,
      }}
      onClick={() => {
        const typeOfTaskByDefault =
          typesOfTask.findIndex((tot) => tot.byDefault === true) >= 0
            ? [typesOfTask.find((tot) => tot.byDefault === true)!]
            : [];
        setEditableTask({
          ...editableTask,
          id: '',
          isTaskRegular: false,
          weekDays: [],
          // dateTime: определяется в DaySchedule,
          clients: [],
          typesOfTask: typeOfTaskByDefault,
        });
        navigate(routes.addTaskPage.route);
      }}
    >
      <AddIcon />
    </Fab>
    // </Link>
  );
}
