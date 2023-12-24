import { Checkbox, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React, { SetStateAction, useState } from 'react';
import {
  TypeOfTask,
  useEditableTaskStore,
  useTaskStore,
  useTypeOfTaskStore,
} from '../../../zustand/store';
import { SelectOneSeveral } from '../SelectTypeOfTaskDialog';
// import styles from './typeoftasklistitemsimple.css';

interface Props {
  typeOfTask: TypeOfTask;
  // selectOneSeveral: SelectOneSeveral;
  selectSeveral: boolean;
  handleClose: () => void;
  // checked: string[];
  // setChecked: React.Dispatch<SetStateAction<string[]>>;
}

export function TypeOfTaskListItemCheck({
  typeOfTask,
  // selectOneSeveral,
  selectSeveral,
  handleClose,
}: Props) {
  const [checked2, setChecked2] = useState(false);
  const addSelectedTypeOfTask = useEditableTaskStore(
    (state) => state.addSelectedTypeOfTask
  );
  const delSelectedTypesOfTask = useEditableTaskStore(
    (state) => state.delSelectedTypesOfTask
  );
  const setSelectedTypesOfTask = useTypeOfTaskStore(
    (state) => state.setSelectedTypesOfTask
  );
  const selectedTypesOfTask = useEditableTaskStore(
    (state) => state.editableTask.typesOfTask
  );
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);

  // const handleToggle = (value: string) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };
  return (
    <ListItem
      disablePadding
      secondaryAction={
        selectSeveral && (
          <Checkbox
            edge='end'
            checked={
              selectedTypesOfTask.findIndex((item) => item.id === typeOfTask.id) >= 0
            }
            // checked={checked2}
            // checked={checked.indexOf(typeOfTask.id) !== -1}
            onChange={(e) => {
              if (e.target.checked) {
                addSelectedTypeOfTask(typeOfTask);
              } else {
                delSelectedTypesOfTask(typeOfTask.id);
              }
              // setChecked2(e.target.checked);
            }}
            // onChange={handleToggle(typeOfTask.id)}
            inputProps={{ 'aria-labelledby': typeOfTask.id }}
          />
        )
      }
    >
      <ListItemButton
        sx={{ py: 0.5 }}
        onClick={() => {
          setSelectedTypesOfTask(typeOfTask);
          if (editableTask) {
            setEditableTask({ ...editableTask, typesOfTask: [typeOfTask] });
          }
          handleClose();
        }}
      >
        <ListItemText
          id={typeOfTask.id}
          primary={typeOfTask.taskName}
          secondary={typeOfTask.taskDurationText}
        />
      </ListItemButton>
    </ListItem>
  );
}
