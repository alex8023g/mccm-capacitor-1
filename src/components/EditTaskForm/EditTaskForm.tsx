import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  createTheme,
} from '@mui/material';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import React, { useLayoutEffect, useState } from 'react';
import { SelectClientDialog } from '../forClients/SelectClientDialog';
import { NewClientDialog } from '../forClients/NewClientDialog';
import { SelectTypeOfTaskDialog } from '../forTypeOfTask/SelectTypeOfTaskDialog';
import { Client } from '../../pages/AddClientPage';
import {
  TypeOfTask,
  useClientStore,
  useEditableTaskStore,
  useSearchStore,
  useTaskStore,
  useTypeOfTaskStore,
} from '../../zustand/store';
// import styles from './edittaskform.css';
import { ruRU } from '@mui/x-date-pickers/locales';
import { ruRU as coreRuRU } from '@mui/material/locale';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import utc from 'dayjs/plugin/utc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { randomStr } from '../../lib/randomStr';
import { redirect } from 'react-router-dom';
import { routes } from '../../App';
import { weekDaysArr } from '../../lib/const';
import { error } from 'console';

dayjs.extend(utc);

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 400,
      width: 250,
    },
  },
};

export interface Task {
  id: string;
  isTaskRegular: boolean;
  weekDays: number[];
  dateTime: string | null;
  clients: Client[];
  typesOfTask: TypeOfTask[];
}

export const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  ruRU, // use 'de' locale for UI texts (start, next month, ...)
  coreRuRU
);

export function EditTaskForm() {
  const [isTaskRegular, setIsTaskRegular] = useState<boolean>(false);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const { state, pathname } = useLocation();
  // const [dateTime, setDateTime] = useState<Dayjs | null>(
  //   state ? dayjs(state.dateTime) : null
  // );
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  // const [dateTime, setDateTime] = useState<Dayjs | null>(
  //   editableTask.dateTime ? dayjs(editableTask.dateTime) : null
  // );
  const [startTime, setStartTime] = useState<Dayjs | null>(
    editableTask.dateTime && !(dayjs(editableTask.dateTime).hour() === 0)
      ? dayjs(editableTask.dateTime)
      : null
  );
  const [wasSbmt, setWasSbmt] = useState(false);
  const [isSelectClientDialogOpen, setIsSelectClientDialogOpen] = useState(false);
  const [isTypeOfTaskDialogOpen, setIsTypeOfTaskDialogOpen] = useState(false);
  const navigate = useNavigate();
  const addTask = useTaskStore((state) => state.addTask);
  const setSearchValue = useSearchStore((state) => state.setSearchValue);
  setSearchValue('');
  const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);
  const setEditableClient = useClientStore((state) => state.setEditableClient);
  const selectedClients = useEditableTaskStore((state) => state.editableTask.clients);
  const setSelectedClient = useClientStore((state) => state.setSelectedClient);
  const selectedTypesOfTask = useEditableTaskStore(
    (state) => state.editableTask.typesOfTask
  );
  // const setSelectedTypesOfTask = useTypeOfTaskStore(
  //   (state) => state.setSelectedTypesOfTask
  // );

  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);
  const updTasks = useTaskStore((state) => state.updTasks);

  useLayoutEffect(() => {
    if (!editableTask.dateTime) {
      setEditableTask({ ...editableTask, dateTime: dayjs().format() });
    }
  }, []);

  if (!editableTask) {
    console.log(' if (!editableTask) navigate(routes.schedulePage.route)');
    navigate(routes.homePage.route);
  }

  // function handleChangeWeekDays(event: SelectChangeEvent<typeof weekDays>) {
  //   const {
  //     target: { value },
  //   } = event;
  //   console.log(value);
  //   setWeekDays(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value
  //   );
  // }

  function handleChangeWeekDays(event: SelectChangeEvent<number[]>) {
    const {
      target: { value },
    } = event;
    setEditableTask(
      typeof value === 'string' // особенность типизации mui
        ? { ...editableTask, weekDays: [Number(value)] }
        : { ...editableTask, weekDays: value }
    );
  }

  function handleChangeIsTaskReg(
    event: React.MouseEvent<HTMLElement>,
    selectedItem: boolean
  ) {
    console.log('nextView', selectedItem);
    if (selectedItem !== null) {
      // setIsTaskRegular((cl) => selectedItem);
      setEditableTask({ ...editableTask, isTaskRegular: selectedItem });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
        <Box
          // padding={2}
          component={'form'}
          onSubmit={(e) => {
            e.preventDefault();
            setWasSbmt(true);

            if (!selectedClients[0]) {
              console.log('Client === null!!!');
              return;
            }
            // else if (dateTime === null && !isTaskRegular) {
            //   console.log('dateTime === null!!!');
            //   return;
            // } else if (!startTime) {
            //   console.log('startTime === null!!!');
            //   return;
            // }
            setWasSbmt(false);
            addTask({
              ...editableTask,
              id: randomStr(9),
              // isTaskRegular,
              // weekDays,
              // dateTime: dateTime?.format() || null,
              // clients: selectedClients,
              // typesOfTask: selectedTypesOfTask,
            });
            setStartTime(null);
            navigate(-1);
          }}
        >
          <Typography variant='h6' marginBottom={1}>
            EditTaskForm
          </Typography>
          <ToggleButtonGroup
            value={editableTask.isTaskRegular}
            exclusive
            color='primary'
            size='small'
            sx={{ mb: 2, width: '100%' }}
            onChange={handleChangeIsTaskReg}
          >
            <ToggleButton value={false} aria-label='list' sx={{ width: '50%' }}>
              разовая
            </ToggleButton>
            <ToggleButton value={true} aria-label='module' sx={{ width: '50%' }}>
              регулярная
            </ToggleButton>
          </ToggleButtonGroup>
          {editableTask.isTaskRegular && (
            <FormControl sx={{ mb: 0, width: '100%' }}>
              <InputLabel id='demo-multiple-chip-label'>Каждый (день недели)</InputLabel>
              <Select
                labelId='demo-multiple-chip-label'
                id='demo-multiple-chip'
                error={wasSbmt && editableTask.weekDays.length === 0}
                multiple
                value={editableTask.weekDays}
                onChange={handleChangeWeekDays}
                input={
                  <OutlinedInput id='select-multiple-chip' label='Каждый (день недели)' />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      // <Chip key={value} label={value} />
                      <Chip
                        key={value}
                        label={
                          weekDaysArr.find((wd) => wd.v === Number(value))?.shortName
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {weekDaysArr.map(
                  (weekDay, i) => (
                    // !!i && (
                    // <MenuItem key={weekDay.name} value={weekDay.shortName}>
                    <MenuItem key={weekDay.name} value={weekDay.v}>
                      {weekDay.name}
                    </MenuItem>
                  )
                  // )
                )}
              </Select>
              {
                <FormHelperText error={wasSbmt && editableTask.weekDays.length === 0}>
                  {wasSbmt && editableTask.weekDays.length === 0
                    ? 'укажите дни недели'
                    : ' '}
                </FormHelperText>
              }
            </FormControl>
          )}
          {!editableTask.isTaskRegular && (
            <FormControl sx={{ mb: 0, width: '100%' }}>
              <DatePicker
                // value={dateTime}
                value={dayjs(editableTask?.dateTime)}
                // onChange={(newValue) => setDateTime(newValue)}
                onChange={(newDate) => {
                  console.log(newDate?.format());
                  setEditableTask({
                    ...editableTask!,
                    dateTime: newDate?.format() || '',
                  });
                }}
              />
              {
                <FormHelperText sx={{ color: 'red' }}>
                  {!editableTask?.dateTime && wasSbmt ? 'укажите дату' : ' '}
                </FormHelperText>
              }
            </FormControl>
          )}
          <FormControl sx={{ mb: 0, width: '100%' }}>
            <MobileTimePicker
              slotProps={{
                textField: {
                  error: wasSbmt && !startTime,
                  // variant: 'filled',
                  helperText: wasSbmt && !startTime ? 'укажите время' : ' ',
                },
              }}
              minutesStep={30}
              // value={dayjs(editableTask?.dateTime)}
              value={startTime}
              onChange={(newTime) => {
                const startHour = newTime?.hour() ?? 0;
                const startMinute = newTime?.minute() || 0;
                const dateMod = dayjs(editableTask?.dateTime).clone();
                console.log(
                  startHour,
                  startMinute,
                  // dateTime?.format(),
                  dateMod?.format()
                );
                if (startHour !== undefined && startMinute !== undefined) {
                  console.log(dateMod?.hour(startHour).minute(startMinute));
                  // setDateTime(dateMod?.hour(startHour).minute(startMinute) ?? null);
                  setStartTime(newTime);
                  setEditableTask({
                    ...editableTask!,
                    dateTime: dateMod?.hour(startHour).minute(startMinute).format() || '',
                  });
                }
              }}
            />
            {
              // <FormHelperText sx={{ color: 'red' }}>
              //   {!startTime && wasSbmt ? 'укажите время' : ' '}
              // </FormHelperText>
            }
          </FormControl>
          <FormControl sx={{ width: '100%' }}>
            {selectedClients.length === 0 && (
              <Stack direction='row' spacing={2} sx={{ width: '100%' }}>
                <Button
                  variant='outlined'
                  color={!selectedClients[0] && wasSbmt ? 'warning' : 'primary'}
                  sx={{ flexGrow: 0.5 }}
                  onClick={() => {
                    setEditableClient({
                      id: '',
                      phoneNumber: '',
                      name: '',
                      notes: '',
                      preffMsgr: null,
                      tgChatId: null,
                      tgUserName: null,
                    });
                    setIsClientDialogOpen(true);
                  }}
                >
                  Новый клиент
                </Button>
                <Button
                  variant='outlined'
                  color={!selectedClients[0] && wasSbmt ? 'warning' : 'primary'}
                  sx={{ flexGrow: 0.5 }}
                  onClick={() => {
                    setIsSelectClientDialogOpen(true);
                  }}
                >
                  Выбрать клиента
                </Button>
              </Stack>
            )}
            <FormHelperText error={!selectedClients[0] && wasSbmt}>
              {!selectedClients[0] && wasSbmt ? 'выберите или добавьте клиента' : ' '}
            </FormHelperText>
          </FormControl>
          {/* {!selectedClients[0] && wasSbmt ? (
            <Typography
              sx={{
                ml: 1.5,
                color: '#d32f2f',
                fontSize: 12,
              }}
            >
              выберите или добавьте клиента
            </Typography>
          ) : (
            <Typography variant='body2' color={'white'}>
              пустое пространство
            </Typography>
          )} */}
          <SelectClientDialog
            open={isSelectClientDialogOpen}
            setOpen={setIsSelectClientDialogOpen}
          />
          <NewClientDialog />
          <FormControl sx={{ width: '100%' }}>
            {selectedTypesOfTask.length === 0 && (
              <Button
                variant='outlined'
                color={!selectedTypesOfTask[0] && wasSbmt ? 'warning' : 'primary'}
                sx={{ width: '100%' }}
                onClick={() => {
                  setIsTypeOfTaskDialogOpen(true);
                }}
              >
                вид и длительность работ
              </Button>
            )}
            <FormHelperText error={!selectedTypesOfTask[0] && wasSbmt}>
              {!selectedTypesOfTask[0] && wasSbmt ? 'выберите или добавьте клиента' : ' '}
            </FormHelperText>
          </FormControl>
          {/* {!selectedTypesOfTask[0] && wasSbmt ? (
            <Typography variant='body2' color={'red'}>
              выберите вид и длительность работ
            </Typography>
          ) : (
            <Typography variant='body2' color={'white'}>
              пустое пространство
            </Typography>
          )} */}
          <SelectTypeOfTaskDialog
            open={isTypeOfTaskDialogOpen}
            setOpen={setIsTypeOfTaskDialogOpen}
          />
          {/* {pathname === routes.editTaskPage.route ? ( */}
          <Stack direction='row' spacing={2}>
            <Button
              variant='outlined'
              sx={{ mb: 2, width: '50%', height: 55 }}
              onClick={() => {
                navigate(routes.homePage.route);
              }}
            >
              отменить
            </Button>

            <Button
              variant='contained'
              sx={{ mb: 2, width: '50%', height: 55 }}
              onClick={() => {
                setWasSbmt(true);
                if (!selectedClients[0]) {
                  console.log('Client === null!!!');
                  return;
                }
                setStartTime(null);
                if (pathname === routes.editTaskPage.route) {
                  updTasks(editableTask);
                  navigate(-1);
                } else if (pathname === routes.addTaskPage.route) {
                  addTask({
                    ...editableTask,
                    id: randomStr(9),
                  });
                  navigate(routes.homePage.route);
                }
              }}
            >
              {pathname === routes.editTaskPage.route && 'сохранить изм-я'}
              {pathname === routes.addTaskPage.route && 'добавить задачу'}
            </Button>
          </Stack>
          {/* ) : (
            <Button
              type='submit'
              variant='contained'
              sx={{ mb: 2, width: '100%', height: 55 }}
            >
              Добавить работу
            </Button>
          )} */}
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
}
