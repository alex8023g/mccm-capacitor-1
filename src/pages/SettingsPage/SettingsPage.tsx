import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { halfHoursArr, hoursArr } from '../../lib/const';
import { useAppState } from '../../zustand/store';
// import styles from './settingspage.css';

export function SettingsPage() {
  const timeRange = useAppState((state) => state.timeRange);
  const setTimeRange = useAppState((state) => state.setTimeRange);

  return (
    <>
      <h2>Settings Page</h2>

      <h3>Диапазон времени</h3>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            mr: 1,
            // maxWidth: 120,
            flexGrow: 1,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>От</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={timeRange.from}
              label='от'
              onChange={(e) => {
                setTimeRange({ ...timeRange, from: Number(e.target.value) });
              }}
            >
              {/* {halfHoursArr.map((halfHour, i) => {
                if (i % 2 === 0) {
                  return <MenuItem value={10}>{halfHour}</MenuItem>;
                } else return null;
              })} */}
              {hoursArr.map((hour, i) =>
                i < timeRange.to ? <MenuItem value={i}>{hour}</MenuItem> : null
              )}
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            // maxWidth: 120,
            flexGrow: 1,
          }}
        >
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>до</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={timeRange.to}
              label='до'
              onChange={(e) => {
                setTimeRange({ ...timeRange, to: Number(e.target.value) });
              }}
            >
              {hoursArr.map((hour, i) =>
                i > timeRange.from ? <MenuItem value={i}>{hour}</MenuItem> : null
              )}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Button
        onClick={() => {
          console.log('asdfsdf35');
        }}
      >
        console
      </Button>
    </>
  );
}
