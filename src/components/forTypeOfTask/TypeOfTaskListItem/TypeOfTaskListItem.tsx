import {
  ClickAwayListener,
  Grow,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { TypeOfTask, useTypeOfTaskStore } from '../../../zustand/store';
// import styles from './typeoftasklistitem.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { routes } from '../../../App';
import { useNavigate } from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { taskDurations } from '../../../lib/const';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

interface Props {
  typeOfTask: TypeOfTask;
}
export function TypeOfTaskListItem({ typeOfTask }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const delTypeOfTask = useTypeOfTaskStore((state) => state.delTypeOfTask);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const setEditableTypeOfTask = useTypeOfTaskStore(
    (state) => state.setEditableTypeOfTask
  );
  const typesOfTask = useTypeOfTaskStore((state) => state.typesOfTask);
  const setTypeOfTaskByDefault = useTypeOfTaskStore(
    (state) => state.setTypeOfTaskByDefault
  );
  const setIsTypeOfTaskDialogOpen = useTypeOfTaskStore(
    (state) => state.setIsTypeOfTaskDialogOpen
  );

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setMenuOpen(false);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton
          edge='end'
          aria-label='delete'
          onClick={() => {
            setMenuOpen((mo) => !mo);
          }}
          ref={anchorRef}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton sx={{ py: 0.5 }}>
        <ListItemText
          primary={typeOfTask.taskName}
          secondary={
            typeOfTask.taskDurationText
            // taskDurations.find(
            //   (taskDuration) => taskDuration.val === typeOfTask.taskDuration
            // )?.text
          }
        />
      </ListItemButton>
      <Popper
        open={menuOpen}
        anchorEl={anchorRef.current}
        role={undefined}
        placement='bottom-end'
        transition
        // disablePortal
        sx={{ popper: { zIndex: 1300 } }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-start' ? 'left top' : 'right top',
            }}
          >
            <Paper elevation={3}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={menuOpen}
                  // id='composition-menu'
                  // aria-labelledby='composition-button'
                  // onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      setEditableTypeOfTask(typeOfTask);
                      setIsTypeOfTaskDialogOpen(true);
                    }}
                  >
                    <ModeEditOutlineIcon sx={{ mr: 1 }} />
                    Редактировать
                  </MenuItem>
                  <MenuItem
                    onClick={(e) => {
                      setTypeOfTaskByDefault(typeOfTask.id);
                      handleClose(e);
                    }}
                  >
                    {typeOfTask.byDefault ? (
                      <StarIcon sx={{ mr: 1 }} />
                    ) : (
                      <StarBorderIcon sx={{ mr: 1 }} />
                    )}
                    Работа по умолчанию
                  </MenuItem>
                  <MenuItem
                    disabled={typesOfTask.length === 1}
                    onClick={(e) => {
                      delTypeOfTask(typeOfTask.id);
                      handleClose(e);
                    }}
                  >
                    {typeOfTask.byDefault ? (
                      <DeleteOutlineIcon sx={{ mr: 1 }} />
                    ) : (
                      <DeleteOutlineIcon sx={{ mr: 1 }} />
                    )}
                    Удалить
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ListItem>
  );
}
