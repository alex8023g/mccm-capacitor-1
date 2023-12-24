import React from 'react';
import { EditTaskForm } from '../../components/EditTaskForm';
import { useEditableTaskStore } from '../../zustand/store';
// import styles from './addtaskpage2.css';

export function AddTaskPage2() {
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);

  // setEditableTask({
  //   ...editableTask,
  //   id: '',
  //   isTaskRegular: false,
  //   weekDays: [],
  //   clients: [],
  //   typesOfTask: [],
  //   // dateTime берется из store т.е. м.б. как '' так и значение
  // });
  return (
    <>
      <h4>AddTaskPage2</h4>
      <EditTaskForm />
    </>
  );
}
