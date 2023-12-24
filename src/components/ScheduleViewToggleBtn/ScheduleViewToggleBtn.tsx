import React, { useState } from 'react';
// import styles from './scheduleviewtogglebtn.css';
import CalendarViewDayIcon from '@mui/icons-material/CalendarViewDay';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import {
  Button,
  ButtonGroup,
  IconButton,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../App';
import { useAppState } from '../../zustand/store';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
  MobileDatePicker,
} from '@mui/x-date-pickers';
import { theme } from '../EditTaskForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';

// function ButtonField() {
//   return <Button>2</Button>;
// }

// function ButtonDatePicker(
//   props: Omit<DatePickerProps<Dayjs>, 'open' | 'onOpen' | 'onClose'>
// ) {
//   const [open, setOpen] = React.useState(false);

//   return (
//     <DatePicker
//       slots={{ field: ButtonField, ...props.slots }}
//       slotProps={{ field: { setOpen } as any }}
//       {...props}
//       open={open}
//       onClose={() => setOpen(false)}
//       onOpen={() => setOpen(true)}
//     />
//   );
// }

export function ScheduleViewToggleBtn() {
  const [view, setView] = useState('everyDay');
  const [isListView, setIsListView] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, handleDateChange] = useState('2018-01-01T00:00:00.000Z');

  const scheduleView = useAppState((state) => state.scheduleView);
  const setScheduleView = useAppState((state) => state.setScheduleView);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleAlignment = (e: React.MouseEvent<HTMLElement>, nextView: string) => {
    if (nextView !== null) {
      setView(nextView);
    }
  };

  return (
    <>
      {/* <ToggleButtonGroup
        value={view}
        exclusive
        onChange={handleAlignment}
        aria-label='Platform'
        // color='secondary'
      >
        <ToggleButton value='everyDay' sx={{ color: '#000' }}>
          <CalendarViewDayIcon sx={{ color: '#fff' }} />
        </ToggleButton>
        <ToggleButton value='oneWeek'>
          <CalendarViewMonthIcon />
        </ToggleButton>
      </ToggleButtonGroup> */}
      {/* <ButtonGroup variant='contained'> */}
      <IconButton
        color={scheduleView === 'allDayScroll' ? 'inherit' : 'default'}
        onClick={() => {
          // navigate(routes.schedulePage.route);
          setScheduleView('allDayScroll');
        }}
      >
        <ViewDayIcon />
      </IconButton>
      <IconButton
        color={scheduleView === 'dayOfWeekSelect' ? 'inherit' : 'default'}
        onClick={() => {
          // navigate(routes.schedulePage2.route);
          setScheduleView('dayOfWeekSelect');
        }}
      >
        <CalendarViewMonthIcon />
      </IconButton>
      <IconButton onClick={() => setIsOpen(true)}>
        <CalendarMonthIcon />
      </IconButton>
      {/* </ButtonGroup> */}
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
          <MobileDatePicker
            // slots={{ field: undefined }}
            sx={{ display: 'none' }}
            open={isOpen}
            onClose={() => setIsOpen(false)}
            onOpen={() => setIsOpen(true)}
          />

          {/* <ButtonDatePicker /> */}
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
