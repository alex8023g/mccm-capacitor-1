import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
// import Stack from '@mui/joy/Stack';
import { TypeOfTask, useTypeOfTaskStore } from '../../zustand/store';
import { taskDurations } from '../../lib/const';
import { randomStr } from '../../lib/randomStr';
import { TypeOfTaskEditForm } from '../../components/forTypeOfTask/TypeOfTaskEditForm';

// import styles from './addtypeoftaskpage.css';

export function AddTypeOfTaskPage() {
  const [typeOfTask, setTypeOfTask] = useState<TypeOfTask>({
    id: '',
    taskName: '',
    taskDuration: 1,
    taskDurationText: '1 час',
    byDefault: false,
  });
  const addTypeOfTask = useTypeOfTaskStore((state) => state.addTypeOfTask);
  return (
    <>
      <Typography variant='h6' mb={1}>
        Добавить вид работ
      </Typography>

      {/* <TypeOfTaskEditForm typeOfTask={typeOfTask} setTypeOfTask={setTypeOfTask} /> */}

      {/* <Box
        component='form'
        onSubmit={(e) => {
          e.preventDefault();
          addTypeOfTask(typeOfTask);
        }}
      >
        <Stack spacing={2}>
          <TextField
            label='Наименование работы'
            variant='outlined'
            value={typeOfTask.taskName}
            onChange={(e) => {
              setTypeOfTask((tOT) => ({ ...tOT, taskName: e.target.value }));
            }}
          />

          <FormControl sx={{ mb: 2, width: '100%' }} size='small'>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={typeOfTask.taskDuration}
              name={typeOfTask.taskName}
              onChange={(e) => {
                console.log(e.currentTarget, e.target.value, e.target.name);
                setTypeOfTask((tOT) => ({
                  ...tOT,
                  taskDuration: Number(e.target.value),
                  // taskDurationText: e.currentTarget,
                }));
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
            Добавить
          </Button>
        </Stack>
      </Box> */}
    </>
  );
}
