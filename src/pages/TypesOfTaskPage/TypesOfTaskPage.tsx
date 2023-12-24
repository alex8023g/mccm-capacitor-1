import { Box, Divider, List, Typography } from '@mui/material';
import React from 'react';
import { TypeOfTask, useTypeOfTaskStore } from '../../zustand/store';
import { TypeOfTaskListItem } from '../../components/forTypeOfTask/TypeOfTaskListItem';
import { TypeOfTaskDialog } from '../../components/forTypeOfTask/TypeOfTaskDialog';
// import styles from './typesoftaskpage.css';

export function TypesOfTaskPage() {
  const typesOfTask = useTypeOfTaskStore((state) => state.typesOfTask);
  return (
    <>
      <Typography variant='h6'>Виды рабат</Typography>
      <Box position='relative'>
        <List>
          {typesOfTask.map(
            (typeOfTask: TypeOfTask, i: number, { length }: { length: number }) => (
              <>
                <TypeOfTaskListItem typeOfTask={typeOfTask} />
                {i + 1 !== length && <Divider component='li' />}
              </>
            )
          )}
        </List>
      </Box>
      <TypeOfTaskDialog />
    </>
  );
}
