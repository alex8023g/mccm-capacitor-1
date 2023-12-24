import React, { useEffect } from 'react';
import st from './dayschedule.module.css';
import { Paper, Typography } from '@mui/material';
import { halfHoursArr, monthArr, weekDaysArr } from '../../../lib/const';
import dayjs from 'dayjs';
import { AddTaskBtn } from '../AddTaskBtn';
// import { Task } from '../../../pages/AddTaskPage';
import { useInView } from 'react-intersection-observer';
import { useEditableTaskStore } from '../../../zustand/store';
import { TaskArea } from '../TaskArea';
import { Task } from '../../EditTaskForm';

interface Props {
  today: dayjs.Dayjs;
  i: number;
  tasksOfDay: Task[];
}

export function DaySchedule({ today, i, tasksOfDay }: Props) {
  const { ref, inView, entry } = useInView({
    /* Optional options */
    // threshold: 0.3,
  });
  const [ref1, inView1, entry1] = useInView();
  const [ref2, inView2, entry2] = useInView();
  // const setDateTask = useDateTaskStore((state) => state.setDateTask);
  const editableTask = useEditableTaskStore((state) => state.editableTask);
  const setEditableTask = useEditableTaskStore((state) => state.setEditableTask);

  useEffect(() => {
    if (inView1 || inView2) {
      // setDateTask(today.format());
      setEditableTask({ ...editableTask, dateTime: today.hour(0).minute(0).format() });
    }
  }, [inView1, inView2]);

  return (
    <>
      <tr key={today.format()}>
        <th className={st.th1}></th>
        <th className={st.th2}>
          <Typography variant='h6'>
            {/* {weekDaysArr[today.day()].name} {today.date()}{' '} */}
            {weekDaysArr.find((wd) => wd.v === today.day())?.name} {today.date()}{' '}
            {monthArr[today.month()].shortName}
          </Typography>
        </th>
      </tr>
      {halfHoursArr.map((time, i) => {
        const taskAtTime = tasksOfDay.find(
          (task) => task.dateTime?.substring(11, 16) === time
        );
        // console.log(tasksOfDay, taskAtTime, time);

        // let workType = '';
        // const styleTask = { height: '30px' };
        // if (taskAtTime) {
        //   console.log(taskAtTime);
        //   workType = taskAtTime.workType;
        //   styleTask.height = String(30 * 2 * taskAtTime.duration) + 'px';
        // }

        let itemProps = {};
        if (i === 8) {
          itemProps = {
            ref: ref1,
          };
        } else if (i === 32) {
          itemProps = { ref: ref2 };
        }

        return (
          <tr key={today.format() + String(i)} className={st.tr1} {...itemProps}>
            <td className={st.td1}>{i % 2 === 0 ? time : ''}</td>
            <td className={st.td2}>
              {/* {workType && (
                <Paper
                  elevation={2}
                  sx={{
                    position: 'absolute',
                    left: 5,
                    padding: 1,
                    width: '95%',
                    height: styleTask,
                    backgroundColor: '#03a9f4',
                  }}
                >
                  {workType}
                </Paper>
                )} */}
              {!!taskAtTime && <TaskArea taskAtTime={taskAtTime} />}
            </td>
          </tr>
        );
      })}
      <tr key={today.format() + '340'}>
        <th></th>
        <th className={st.tdAddTaskBtn} style={{ zIndex: 100 - i }}>
          {/* {<AddTaskBtn today={today} i={i} />} */}
        </th>
      </tr>
    </>
  );
}
