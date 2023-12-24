import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import React, { SetStateAction } from 'react';
import {
  TypeOfTask,
  useEditableTaskStore,
  useTaskStore,
  useTypeOfTaskStore,
} from '../../../zustand/store';
// import styles from './typeoftasklistitemdel.css';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
interface Props {
  typeOfTask: TypeOfTask;
  handleClickOpen: () => void;
  // checked: string[];
  // setChecked: React.Dispatch<SetStateAction<string[]>>;
}

export function TypeOfTaskListItemDel({ typeOfTask, handleClickOpen }: Props) {
  const delSelectedTypesOfTask = useEditableTaskStore(
    (state) => state.delSelectedTypesOfTask
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
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => {
            delSelectedTypesOfTask(typeOfTask.id);
            // if (editableTask) {
            //   setEditableTask({ ...editableTask, typesOfTask: selectedTypesOfTask });
            // }
          }}
          // ref={anchorRef}
        >
          <HighlightOffIcon />
        </IconButton>
      }
    >
      <ListItemButton sx={{ py: 0.5 }} onClick={handleClickOpen}>
        <ListItemAvatar>
          <Avatar>
            <TaskAltIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          id={typeOfTask.id}
          primary={typeOfTask.taskName}
          secondary={typeOfTask.taskDurationText}
        />
      </ListItemButton>
    </ListItem>
  );
}
