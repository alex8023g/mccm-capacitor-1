import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
// import styles from './sendtgmsgpage.css';
import { Bot, InlineKeyboard, Keyboard } from 'grammy';
// 1@ts-ignore
// import { Keyboard } from 'https://deno.land/x/grammy@v1.19.2/mod.ts';

let tg = {
  token: '6745364268:AAHVq3qRJvTSLTiBzkQA-0_NW1tF0ix_2w4', // Your bot's token that got from @BotFather
  // chat_id: '6872379322', // The user's(that you want to send a message) telegram chat id
};
const url = `https://api.telegram.org/bot${tg.token}/sendMessage`; // The url to request

export function SendTgMsgPage() {
  const [chatId, setChatId] = useState('865162643');
  const [text, setText] = useState('');
  const firstMenuMarkup = new InlineKeyboard().text('nextButton', 'click-payload');
  const reqContact = new Keyboard().requestContact('ваш контакт');
  /**
   * By calling this function you can send message to a specific user()
   * @param {String} the text to send
   *
   */
  // function sendMessage(text: string) {
  //   const obj = {
  //     chat_id: chatId, // Telegram chat id
  //     // chat_id: tg.chat_id, // Telegram chat id
  //     text: text, // The text to send
  //   };

  //   const xht = new XMLHttpRequest();
  //   xht.open('POST', url, true);
  //   xht.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
  //   xht.send(JSON.stringify(obj));
  // }

  // Now you can send any text(even a form data) by calling sendMessage function.
  // For example if you want to send the 'hello', you can call that function like this:

  return (
    <>
      <h2>Отправка сообщ-й в телеграм </h2>
      <Box
        component={'form'}
        onSubmit={async (e) => {
          e.preventDefault();
          let res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              reply_markup: reqContact,
            }),
          });
          console.log(res);
          res = await res.json();
          console.log(res);
        }}
      >
        <TextField
          // id='outlined-basic'
          label='chat_id'
          variant='outlined'
          autoComplete='off'
          sx={{ mb: 2, width: { xs: '100%' } }}
          value={chatId}
          onChange={(e) => {
            setChatId(e.target.value);
          }}
        />
        <FormControl sx={{ mb: 2, width: { xs: '100%' } }}>
          <InputLabel id='demo-simple-select-label'>кому пишем</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={chatId}
            label='кому пишем'
            onChange={(e) => {
              setChatId(e.target.value);
            }}
          >
            <MenuItem value={865162643}>Мой мтс</MenuItem>
            <MenuItem value={6872379322}>Мой билайн</MenuItem>
            <MenuItem value={304403882}>Катя</MenuItem>
          </Select>
        </FormControl>
        <TextField
          // id='outlined-basic'
          label='сообщение'
          variant='outlined'
          autoComplete='off'
          sx={{ mb: 2, width: { xs: '100%' } }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <Button type='submit' variant='contained'>
          Отправить
        </Button>
      </Box>
    </>
  );
}
