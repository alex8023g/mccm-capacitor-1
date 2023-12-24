import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import React, { useState } from 'react';
// import { Task } from '../../../pages/AddTaskPage';
// import styles from './taskarea.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useTaskStore, useEditableTaskStore } from '../../../zustand/store';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../App';
import { Task } from '../../EditTaskForm';
import TaskAlt from '@mui/icons-material/TaskAlt';

interface Props {
  taskAtTime: Task;
}

export function TaskArea({ taskAtTime }: Props) {
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const delTask = useTaskStore((state) => state.delTask);
  const navigate = useNavigate();
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);
  let styleTask = { height: '30px' };
  if (taskAtTime) {
    const tasksDuration =
      taskAtTime.typesOfTask.reduce(
        (sum, typeOfTask) => sum + typeOfTask.taskDuration,
        0
      ) || 0.5;
    // workType = taskAtTime.workType;
    styleTask.height = String(30 * 2 * tasksDuration) + 'px';
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          position: 'absolute',
          left: 5,
          top: 0,
          p: 1,
          width: '95%',
          height: styleTask,
          backgroundColor: '#81d4fa',
          // backgroundColor: '#03a9f4',
        }}
      >
        {taskAtTime?.typesOfTask.map((item) => item.taskName + ' ')}
        {' | '}
        {taskAtTime?.clients.map((item) => item.name + ' ')}

        <IconButton
          ref={anchorRef}
          // id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          // color='primary'
          sx={{ position: 'absolute', top: 0, right: 0, zIndex: 5 }}
          // aria-label='directions'
        >
          <MoreVertIcon />
          {/* <EditIcon /> */}
        </IconButton>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='left-start'
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
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    // id='composition-menu'
                    // aria-labelledby='composition-button'
                    // onKeyDown={handleListKeyDown}
                  >
                    {/* <MenuItem
                      onClick={() => {
                        // increasePomodoroTotal(task);
                      }}
                    >
                      <AddCircleOutlineIcon sx={style.mr8} />
                      Увеличить
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        decreasePomodoroTotal(task);
                      }}
                      disabled={task.pomodoroTotal === 1 ? true : false}
                    >
                      <RemoveCircleOutlineIcon sx={style.mr8} />
                      Уменьшить
                    </MenuItem> */}
                    <MenuItem
                      onClick={(e) => {
                        handleClose(e);
                        setEditableTask(taskAtTime);
                        navigate(routes.editTaskPage.route);
                        // setIsEdit(true);
                      }}
                    >
                      <ModeEditOutlineIcon />
                      Редактировать
                    </MenuItem>
                    <MenuItem
                      onClick={(e) => {
                        delTask(taskAtTime.id);
                        handleClose(e);
                        // removeTask(task);
                      }}
                    >
                      <DeleteOutlineIcon />
                      Удалить
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Paper>
    </>
  );
}
