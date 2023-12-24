import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TypeOfTask } from '../../zustand/store';
import { TypeOfTaskEditForm } from '../../components/forTypeOfTask/TypeOfTaskEditForm';
// import styles from './edittypeoftaskpage.css';

export function EditTypeOfTaskPage() {
  let {
    state: { typeOfTaskInitial },
  } = useLocation();
  const [typeOfTask, setTypeOfTask] = useState<TypeOfTask>(typeOfTaskInitial);

  return (
    <>
      <Typography variant='h6' mb={1}>
        Редактировать вид работ
      </Typography>

      {/* <TypeOfTaskEditForm typeOfTask={typeOfTask} setTypeOfTask={setTypeOfTask} /> */}
    </>
  );
}
