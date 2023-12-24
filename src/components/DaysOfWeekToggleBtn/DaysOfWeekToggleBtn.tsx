import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useRef, useState } from 'react';
// import styles from './daysofweektogglebtn.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { weekDaysArr } from '../../lib/const';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useEditableTaskStore } from '../../zustand/store';
dayjs.extend(weekday);

export function DaysOfWeekToggleBtn() {
  const today = dayjs().hour(0).minute(0).second(0);
  // const [weekDay, setWeekDay] = React.useState<string | null>(today.format());
  const [weekNumber, setWeekNumber] = useState(0);
  const editableTaskDate = useEditableTaskStore((state) => state.editableTask.dateTime);
  const setEditableTaskDate = useEditableTaskStore((state) => state.setEditableTaskDate);

  const handleToggleWeek = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    // if (newAlignment !== null) {
    if (![null, 'next', 'prev'].includes(newAlignment) && newAlignment !== null) {
      // setWeekDay(newAlignment);
      setEditableTaskDate(newAlignment);
    }
    if (newAlignment === 'next') {
      // setWeekDay((wd) => {
      //   const next = dayjs(wd).weekday(7);
      //   console.log('wd: ', wd);
      //   return next.format();
      // });
      setEditableTaskDate(dayjs(editableTaskDate).weekday(7).format());
      setWeekNumber((wn) => wn + 7);
    }
    if (newAlignment === 'prev') {
      // setWeekDay(0);
      setEditableTaskDate(dayjs(editableTaskDate).weekday(-1).format());
      setWeekNumber((wn) => wn - 7);
    }
  };

  return (
    <ToggleButtonGroup
      color='primary'
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        width: '100%',
        transform: 'translate(-50%, 0)',
        bgcolor: 'white',
      }}
      // value={weekDay}
      value={editableTaskDate}
      exclusive
      onChange={handleToggleWeek}
      aria-label='text weekDay'
    >
      <ToggleButton value='prev' aria-label='left aligned' sx={{ px: 0 }}>
        <NavigateBeforeIcon />
      </ToggleButton>
      {weekDaysArr.map((wd, i) => (
        // <ToggleButton value={wd.v} aria-label='left aligned'>
        <ToggleButton
          value={dayjs()
            .startOf('week')
            .day(i + 1 + weekNumber)
            .hour(0)
            .minute(0)
            .second(0)
            .format()}
          aria-label='left aligned'
        >
          {wd.shortName}{' '}
          {dayjs()
            .startOf('week')
            .day(i + 1 + weekNumber)
            .date()}
        </ToggleButton>
      ))}

      <ToggleButton value='next' aria-label='justified' sx={{ px: 0 }}>
        <NavigateNextIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
