import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { TypeOfTask, useTypeOfTaskStore } from '../../../zustand/store';
import { taskDurations } from '../../../lib/const';
import { randomStr } from '../../../lib/randomStr';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../App';
// import styles from './typeoftaskeditform.css';

interface Props {
  typeOfTask: TypeOfTask;
  setTypeOfTask: Dispatch<SetStateAction<TypeOfTask>>;
}

export function TypeOfTaskEditForm() {
  // { typeOfTask, setTypeOfTask }: Props
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const addTypeOfTask = useTypeOfTaskStore((state) => state.addTypeOfTask);
  const updTypeOfTask = useTypeOfTaskStore((state) => state.updTypeOfTask);
  const editableTypeOfTask = useTypeOfTaskStore((state) => state.editableTypeOfTask);
  const setEditableTypeOfTask = useTypeOfTaskStore(
    (state) => state.setEditableTypeOfTask
  );
  const setIsTypeOfTaskDialogOpen = useTypeOfTaskStore(
    (state) => state.setIsTypeOfTaskDialogOpen
  );

  return (
    <>
      <Box
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          if (!editableTypeOfTask.id) {
            addTypeOfTask({ ...editableTypeOfTask, id: randomStr(7) });
          } else {
            updTypeOfTask(editableTypeOfTask);
          }
          setIsTypeOfTaskDialogOpen(false);
        }}
      >
        <Stack spacing={2}>
          <TextField
            label='Наименование работы (необязательно)'
            variant='outlined'
            value={editableTypeOfTask.taskName}
            defaultValue={editableTypeOfTask.taskName}
            onChange={(e) => {
              // setTypeOfTask((tOT) => ({ ...tOT, taskName: e.target.value }));
              setEditableTypeOfTask({
                ...editableTypeOfTask,
                taskName: e.target.value,
              });
            }}
          />

          <FormControl sx={{ mb: 2, width: '100%' }} size='small'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={editableTypeOfTask.taskDuration}
              name={editableTypeOfTask.taskName}
              onChange={(e) => {
                console.log(e.currentTarget, e.target.value, e.target.name);
                // setTypeOfTask((tOT) => ({
                //   ...tOT,
                //   taskDuration: Number(e.target.value),
                // }));
                setEditableTypeOfTask({
                  ...editableTypeOfTask,
                  taskDuration: Number(e.target.value),
                  taskDurationText:
                    taskDurations.find((item) => item.val === Number(e.target.value))
                      ?.text || '',
                });
              }}
            >
              {taskDurations.map(({ val, text }) => (
                <MenuItem key={val} value={val}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant='contained' type='submit'>
            {pathname === routes.addTypeOfTaskPage.route ? 'Добавить' : 'Сохранить'}
          </Button>
        </Stack>
      </Box>
    </>
  );
}
