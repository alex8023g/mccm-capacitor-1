import {
  AppBar,
  Button,
  Dialog,
  Divider,
  IconButton,
  List,
  Slide,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  dividerClasses,
} from '@mui/material';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { SearchField } from '../../SearchField';
// import styles from './selecttypeoftaskdialog.css';
import CloseIcon from '@mui/icons-material/Close';
import { TransitionProps } from '@mui/material/transitions';
import {
  TypeOfTask,
  useEditableTaskStore,
  useTaskStore,
  useTypeOfTaskStore,
} from '../../../zustand/store';
import { TypeOfTaskListItem } from '../TypeOfTaskListItem';
import { TypeOfTaskListItemCheck } from '../TypeOfTaskListItemCheck';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import { TypeOfTaskListItemDel } from '../TypeOfTaskListItemDel';
import CheckIcon from '@mui/icons-material/Check';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export type SelectOneSeveral = 'selectOne' | 'selectSeveral';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export function SelectTypeOfTaskDialog({ open, setOpen }: Props) {
  // const [open, setOpen] = useState(false);
  const [checked, setChecked] = React.useState<string[]>([]);
  const typesOfTask = useTypeOfTaskStore((state) => state.typesOfTask);
  const [selectOneSeveral, setSelectOneSeveral] =
    React.useState<SelectOneSeveral>('selectOne');
  // const selectedTypesOfTask = useTypeOfTaskStore((state) => state.selectedTypesOfTask);
  const selectedTypesOfTask = useEditableTaskStore(
    (state) => state.editableTask.typesOfTask
  );
  const [selectSeveral, setSelectSeveral] = React.useState(!!selectedTypesOfTask[1]);
  const editableTask = useTaskStore((state) => state.editableTask);
  const setEditableTask = useTaskStore((state) => state.setEditableTask);

  function handleAlignment(
    event: React.MouseEvent<HTMLElement>,
    // newAlignment: SelectOneSeveral | null
    newAlignment: boolean | null
  ) {
    if (newAlignment !== null) {
      setSelectSeveral(newAlignment);
      // setSelectOneSeveral(newAlignment);
    }
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      {/* {selectedTypesOfTask.length === 0 && (
        <Button
          variant='outlined'
          sx={{ mb: 2, width: '100%' }}
          onClick={handleClickOpen}
        >
          Выбрать вид работ
        </Button>
      )} */}
      <List sx={{ mb: 2, py: 0, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        {selectedTypesOfTask.map((typeOfTask, index) => (
          <>
            <TypeOfTaskListItemDel
              typeOfTask={typeOfTask}
              handleClickOpen={handleClickOpen}
            />
            {index !== selectedTypesOfTask.length - 1 && <Divider />}
          </>
        ))}
      </List>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar>
            <SearchField />

            <IconButton
              // edge='end'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List sx={{ py: 8 }}>
          {typesOfTask.map(
            (typeOfTask: TypeOfTask, i: number, { length }: { length: number }) => (
              <>
                <TypeOfTaskListItemCheck
                  typeOfTask={typeOfTask}
                  handleClose={handleClose}
                  // selectOneSeveral={selectOneSeveral}
                  selectSeveral={selectSeveral}
                  // checked={checked}
                  // setChecked={setChecked}
                />
                {i + 1 !== length && <Divider component='li' />}
              </>
            )
          )}
        </List>
        <Stack
          spacing={2}
          sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', mb: 2, px: 2 }}
        >
          {selectSeveral && (
            <Button
              variant='contained'
              onClick={() => {
                // if (editableTask) {
                //   setEditableTask({ ...editableTask, typesOfTask: selectedTypesOfTask });
                // }
                handleClose();
              }}
            >
              ok
            </Button>
          )}
          <ToggleButtonGroup
            color='primary'
            // sx={{ px: 2 }}
            value={selectSeveral}
            exclusive
            onChange={handleAlignment}
            aria-label='Platform'
          >
            {/* <ToggleButton value='selectOne' sx={{ flexGrow: 0.5 }}> */}
            <ToggleButton value={false} sx={{ flexGrow: 0.5 }}>
              <CheckIcon />
            </ToggleButton>
            <ToggleButton value={true} sx={{ flexGrow: 0.5 }}>
              <ChecklistRtlIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Dialog>
    </>
  );
}
