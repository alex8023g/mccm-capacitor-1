// import React, { useEffect, useRef, useState } from 'react';
// import styles from './addtaskpage.module.css';
// import {
//   DateCalendar,
//   DatePicker,
//   DateTimePicker,
//   DesktopTimePicker,
//   DigitalClock,
//   LocalizationProvider,
//   MobileDatePicker,
//   MobileTimePicker,
//   StaticDatePicker,
//   TimePicker,
// } from '@mui/x-date-pickers';
// import dayjs, { Dayjs } from 'dayjs';
// import 'dayjs/locale/ru';
// import utc from 'dayjs/plugin/utc';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { ruRU } from '@mui/x-date-pickers/locales';
// import { ruRU as coreRuRU } from '@mui/material/locale';
// import {
//   Autocomplete,
//   Box,
//   Button,
//   Chip,
//   Divider,
//   FormControl,
//   FormHelperText,
//   InputLabel,
//   MenuItem,
//   OutlinedInput,
//   Select,
//   SelectChangeEvent,
//   Stack,
//   Switch,
//   TextField,
//   Theme,
//   ThemeProvider,
//   ToggleButton,
//   ToggleButtonGroup,
//   Typography,
//   createTheme,
// } from '@mui/material';
// import { halfHoursArr, taskDurations } from '../../lib/const';
// import parse from 'autosuggest-highlight/parse';
// import match from 'autosuggest-highlight/match';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { produce } from 'immer';
// import { workTypeArr } from '../../lib/tempConst';
// import {
//   TypeOfTask,
//   useClientStore,
//   useSearchStore,
//   useTaskStore,
//   useTypeOfTaskStore,
// } from '../../zustand/store';
// import { SelectClientDialog } from '../../components/forClients/SelectClientDialog';
// import { NewClientDialog } from '../../components/forClients/NewClientDialog';
// import { SelectTypeOfTaskDialog } from '../../components/forTypeOfTask/SelectTypeOfTaskDialog';
// import { Client } from '../AddClientPage';
// import { randomStr } from '../../lib/randomStr';

// dayjs.extend(utc);

// const weekDaysArr = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: 48 * 4.5 + 8,
//       width: 250,
//     },
//   },
// };

// export interface Task {
//   id: string;
//   isTaskRegular: boolean;
//   weekDays: string[];
//   dateTime: string | null;
//   clients: Client[];
//   typesOfTask: TypeOfTask[];
// }

// export const theme = createTheme(
//   {
//     palette: {
//       primary: { main: '#1976d2' },
//     },
//   },
//   ruRU, // use 'de' locale for UI texts (start, next month, ...)
//   coreRuRU
// );

// export function AddTaskPage() {
//   const [isTaskRegular, setIsTaskRegular] = useState<boolean>(false);
//   const [weekDays, setWeekDays] = useState<string[]>([]);
//   const { state } = useLocation();
//   const [dateTime, setDateTime] = useState<Dayjs | null>(state ? dayjs(state) : null);
//   const [startTime, setStartTime] = useState<Dayjs | null>(null);
//   const [wasSbmt, setWasSbmt] = useState(false);
//   const [isSelectClientDialogOpen, setIsSelectClientDialogOpen] = useState(false);
//   const [isTypeOfTaskDialogOpen, setIsTypeOfTaskDialogOpen] = useState(false);
//   const navigate = useNavigate();
//   const addTask = useTaskStore((state) => state.addTask);
//   const setSearchValue = useSearchStore((state) => state.setSearchValue);
//   const setIsClientDialogOpen = useClientStore((state) => state.setIsClientDialogOpen);
//   setSearchValue('');
//   const setEditableClient = useClientStore((state) => state.setEditableClient);
//   const selectedClients = useClientStore((state) => state.selectedClients);
//   const setSelectedClient = useClientStore((state) => state.setSelectedClient);
//   const selectedTypesOfTask = useTypeOfTaskStore((state) => state.selectedTypesOfTask);
//   const setSelectedTypesOfTask = useTypeOfTaskStore(
//     (state) => state.setSelectedTypesOfTask
//   );

//   useEffect(() => {
//     setSelectedTypesOfTask(null);
//     setSelectedClient(null);
//   }, []);

//   function handleChangeWeekDays(event: SelectChangeEvent<typeof weekDays>) {
//     const {
//       target: { value },
//     } = event;
//     setWeekDays(
//       // On autofill we get a stringified value.
//       typeof value === 'string' ? value.split(',') : value
//     );
//   }

//   function handleChangeIsTaskReg(
//     event: React.MouseEvent<HTMLElement>,
//     selectedItem: boolean
//   ) {
//     console.log('nextView', selectedItem);
//     if (selectedItem !== null) {
//       setIsTaskRegular((cl) => selectedItem);
//     }
//   }

//   return (
//     <>
//       <ThemeProvider theme={theme}>
//         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
//           <Box
//             // padding={2}
//             component={'form'}
//             onSubmit={(e) => {
//               e.preventDefault();
//               setWasSbmt(true);

//               if (!selectedClients[0]) {
//                 console.log('Client === null!!!');
//                 return;
//               } else if (dateTime === null && !isTaskRegular) {
//                 console.log('dateTime === null!!!');
//                 return;
//               } else if (!startTime) {
//                 console.log('startTime === null!!!');
//                 return;
//               }
//               setWasSbmt(false);
//               addTask({
//                 id: randomStr(9),
//                 isTaskRegular,
//                 weekDays,
//                 dateTime: dateTime?.format() || null,
//                 clients: selectedClients,
//                 typesOfTask: selectedTypesOfTask,
//                 // workType,
//                 // duration,
//               });
//               navigate(-1);
//             }}
//           >
//             <Typography variant='h6' marginBottom={1}>
//               Добавить задачу
//             </Typography>
//             <ToggleButtonGroup
//               value={isTaskRegular}
//               exclusive
//               color='primary'
//               size='small'
//               sx={{ mb: 2, width: '100%' }}
//               onChange={handleChangeIsTaskReg}
//             >
//               <ToggleButton value={false} aria-label='list' sx={{ width: '50%' }}>
//                 разовая
//               </ToggleButton>
//               <ToggleButton value={true} aria-label='module' sx={{ width: '50%' }}>
//                 регулярная
//               </ToggleButton>
//             </ToggleButtonGroup>
//             {isTaskRegular && (
//               <FormControl sx={{ mb: 3, width: '100%' }}>
//                 <InputLabel id='demo-multiple-chip-label'>
//                   Каждый (день недели)
//                 </InputLabel>
//                 <Select
//                   labelId='demo-multiple-chip-label'
//                   id='demo-multiple-chip'
//                   multiple
//                   value={weekDays}
//                   onChange={handleChangeWeekDays}
//                   input={
//                     <OutlinedInput
//                       id='select-multiple-chip'
//                       label='Каждый (день недели)'
//                     />
//                   }
//                   renderValue={(selected) => (
//                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                       {selected.map((value) => (
//                         <Chip key={value} label={value} />
//                       ))}
//                     </Box>
//                   )}
//                   MenuProps={MenuProps}
//                 >
//                   {weekDaysArr.map((name) => (
//                     <MenuItem key={name} value={name}>
//                       {name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             )}
//             {!isTaskRegular && (
//               <FormControl sx={{ mb: 0, width: '100%' }}>
//                 <DatePicker
//                   // sx={{ mb: 2, width: '100%' }}
//                   value={dateTime}
//                   onChange={(newValue) => setDateTime(newValue)}
//                 />
//                 {
//                   <FormHelperText sx={{ color: 'red' }}>
//                     {!dateTime && wasSbmt ? 'укажите время' : ' '}
//                   </FormHelperText>
//                 }
//               </FormControl>
//             )}
//             <FormControl sx={{ mb: 0, width: '100%' }}>
//               <MobileTimePicker
//                 // disabled
//                 minutesStep={30}
//                 value={startTime}
//                 onChange={(newValue) => {
//                   const startHour = newValue?.hour() ?? 0;
//                   const startMinute = newValue?.minute() || 0;
//                   const dateMod = dateTime?.clone();
//                   console.log(
//                     startHour,
//                     startMinute,
//                     dateTime?.format(),
//                     dateMod?.format()
//                   );
//                   if (startHour !== undefined && startMinute !== undefined) {
//                     console.log(dateMod?.hour(startHour).minute(startMinute));
//                     setDateTime(dateMod?.hour(startHour).minute(startMinute) ?? null);
//                   }
//                   setStartTime(newValue);
//                 }}
//               />
//               {
//                 <FormHelperText sx={{ color: 'red' }}>
//                   {!startTime && wasSbmt ? 'укажите время' : ' '}
//                 </FormHelperText>
//               }
//             </FormControl>
//             {selectedClients.length === 0 && (
//               <Stack direction='row' spacing={2} sx={{ mb: 2, width: '100%' }}>
//                 <Button
//                   variant='outlined'
//                   color={!selectedClients[0] && wasSbmt ? 'warning' : 'primary'}
//                   sx={{ flexGrow: 0.5 }}
//                   onClick={() => {
//                     setEditableClient({
//                       id: '',
//                       phoneNumber: '',
//                       name: '',
//                       notes: '',
//                       preffMsgr: null,
//                       tgChatId: null,
//                       tgUserName: null,
//                     });
//                     setIsClientDialogOpen(true);
//                   }}
//                 >
//                   Новый клиент
//                 </Button>
//                 <Button
//                   variant='outlined'
//                   color={!selectedClients[0] && wasSbmt ? 'warning' : 'primary'}
//                   sx={{ flexGrow: 0.5 }}
//                   onClick={() => {
//                     setIsSelectClientDialogOpen(true);
//                   }}
//                 >
//                   Выбрать клиента
//                 </Button>
//               </Stack>
//             )}
//             {!selectedClients[0] && wasSbmt && (
//               <Typography variant='body2' color={'red'}>
//                 выберите или добавьте клиента
//               </Typography>
//             )}
//             <SelectClientDialog
//               open={isSelectClientDialogOpen}
//               setOpen={setIsSelectClientDialogOpen}
//             />
//             <NewClientDialog />
//             {selectedTypesOfTask.length === 0 && (
//               <Button
//                 variant='outlined'
//                 color={!selectedTypesOfTask[0] && wasSbmt ? 'warning' : 'primary'}
//                 sx={{ mb: 2, width: '100%' }}
//                 onClick={() => {
//                   setIsTypeOfTaskDialogOpen(true);
//                 }}
//               >
//                 Выбрать вид работ
//               </Button>
//             )}{' '}
//             {!selectedTypesOfTask[0] && wasSbmt && (
//               <Typography variant='body2' color={'red'}>
//                 выберите вид работ
//               </Typography>
//             )}
//             <SelectTypeOfTaskDialog
//               open={isTypeOfTaskDialogOpen}
//               setOpen={setIsTypeOfTaskDialogOpen}
//             />
//             <Button
//               type='submit'
//               variant='contained'
//               sx={{ mb: 2, width: '100%', height: 55 }}
//             >
//               Добавить работу
//             </Button>
//           </Box>
//         </LocalizationProvider>
//       </ThemeProvider>
//     </>
//   );
// }
export {};
