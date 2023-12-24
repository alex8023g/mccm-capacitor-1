import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
// import { AddTaskPage } from './pages/AddTaskPage';
import { SchedulePage } from './pages/SchedulePage';
import { SendTgMsgPage } from './pages/SendTgMsgPage';
import { AddClientPage } from './pages/AddClientPage';
import { Header } from './components/Header';
import { ClientsListPage } from './pages/ClientsListPage';
import { SiteMapPage } from './pages/SiteMapPage';
import HomeIcon from '@mui/icons-material/Home';
import TodayIcon from '@mui/icons-material/Today';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GroupIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import { EditClientPage } from './pages/EditClientPage';
import { AddTypeOfTaskPage } from './pages/AddTypeOfTaskPage';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SubjectIcon from '@mui/icons-material/Subject';
import { TypesOfTaskPage } from './pages/TypesOfTaskPage';
import { EditTypeOfTaskPage } from './pages/EditTypeOfTaskPage';
import { EditTaskPage } from './pages/EditTaskPage';
import { AddTaskPage2 } from './pages/AddTaskPage2';
import { EditTaskForm } from './components/EditTaskForm';
import { SchedulePage2 } from './pages/SchedulePage2';
import SettingsIcon from '@mui/icons-material/Settings';
import dayjs from 'dayjs';
import dayjs_ru from 'dayjs/locale/ru';
import { SettingsPage } from './pages/SettingsPage';
import { ContactsPage } from './pages/ContactsPage';
dayjs.locale(dayjs_ru);

export const routes = {
  // homePage: { name: 'Главная', route: '/', icon: <HomeIcon /> },
  homePage: { name: 'Расписание', route: '/', icon: <TodayIcon /> },
  // schedulePage: { name: 'Расписание1', route: '/1', icon: <TodayIcon /> },
  // schedulePage2: { name: 'Расписание2', route: '/2', icon: <TodayIcon /> },
  addTaskPage: { name: 'Доб. задачу', route: '/addtask', icon: <AddTaskIcon /> },
  editTaskPage: { name: 'Ред. задачу', route: '/edittask', icon: <AddTaskIcon /> },
  sendMsgPage: { name: 'Сообщения', route: '/msg', icon: <ChatIcon /> },
  clientsPage: { name: 'Клиенты', route: '/clients', icon: <GroupIcon /> },
  addClientPage: { name: 'Доб. клиента', route: '/addclient', icon: <PersonAddIcon /> },
  editClientPage: { name: 'Ред. клиента', route: '/editclient', icon: <PersonIcon /> },
  typesOfTaskPage: {
    name: 'Виды работ',
    route: '/typesoftask',
    icon: <SubjectIcon />,
  },
  addTypeOfTaskPage: {
    name: 'Доб. вид работ',
    route: '/addtypeoftask',
    icon: <PlaylistAddIcon />,
  },
  editTypeOfTaskPage: {
    name: 'Ред. вид работ',
    route: '/edittypeoftask',
    icon: <PlaylistAddIcon />,
  },
  settingsPage: { name: 'Настройки', route: '/settings', icon: <SettingsIcon /> },
  contactsPage: { name: 'Контакты', route: '/contacts', icon: <SettingsIcon /> },
} as const;

export type TRoute = keyof typeof routes;
export const pages = Object.keys(routes) as TRoute[];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          {/* <Route path={routes.homePage.route} element={<SiteMapPage />} /> */}
          {/* <Route path={routes.addTaskPage.route} element={<AddTaskPage2 />} /> */}
          <Route path={routes.homePage.route} element={<HomePage />} />
          <Route path={routes.addTaskPage.route} element={<EditTaskForm />} />
          {/* <Route path={routes.editTaskPage.route} element={<EditTaskPage />} /> */}
          <Route path={routes.editTaskPage.route} element={<EditTaskForm />} />
          {/* <Route path={routes.schedulePage.route} element={<SchedulePage />} /> */}
          {/* <Route path={routes.schedulePage2.route} element={<SchedulePage2 />} /> */}
          <Route path={routes.sendMsgPage.route} element={<SendTgMsgPage />} />
          <Route path={routes.addClientPage.route} element={<AddClientPage />} />
          <Route path={routes.clientsPage.route} element={<ClientsListPage />} />
          <Route path={routes.editClientPage.route} element={<EditClientPage />} />
          <Route path={routes.addTypeOfTaskPage.route} element={<AddTypeOfTaskPage />} />
          <Route path={routes.typesOfTaskPage.route} element={<TypesOfTaskPage />} />
          <Route
            path={routes.editTypeOfTaskPage.route}
            element={<EditTypeOfTaskPage />}
          />
          <Route path={routes.settingsPage.route} element={<SettingsPage />} />
          <Route path={routes.contactsPage.route} element={<ContactsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
