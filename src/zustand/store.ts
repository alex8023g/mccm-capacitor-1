import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
// import { Task } from '../pages/AddTaskPage';
import { produce } from 'immer';
import { Client } from '../pages/AddClientPage/AddClientPage';
import { Type } from 'typescript';
import { Task } from '../components/EditTaskForm';

interface ClientStore {
  clients: Client[];
  selectedClients: Client[];
  editableClient: Client;
  isClientDialogOpen: boolean;
  addClient: (client: Client) => void;
  deleteClient: (clientId: string) => void;
  updClient: (clientUpd: Client) => void;
  setEditableClient: (client: Client) => void;
  setIsClientDialogOpen: (isOpen: boolean) => void;
  addSelectedClient: (client: Client) => void;
  delSelectedClient: (id: string) => void;
  setSelectedClient: (client: Client | null) => void;
}

export const useClientStore = create<ClientStore>()(
  devtools(
    persist(
      (set) => ({
        clients: [],
        selectedClients: [],
        editableClient: {
          id: '',
          phoneNumber: '',
          name: '',
          notes: '',
          preffMsgr: null,
          tgChatId: null,
          tgUserName: null,
        },
        isClientDialogOpen: false,
        addClient: (client) =>
          set((state) => ({ clients: state.clients.concat([client]) })),
        deleteClient: (clientId) =>
          set((state) => ({
            clients: state.clients.filter((client) => client.id !== clientId),
          })),
        updClient: (clientUpd) =>
          set((state) => ({
            clients: state.clients.map((clientStore) =>
              clientStore.id === clientUpd.id ? clientUpd : clientStore
            ),
          })),
        setEditableClient: (client) => set((state) => ({ editableClient: client })),
        setIsClientDialogOpen: (isOpen) =>
          set((state) => ({ isClientDialogOpen: isOpen })),
        addSelectedClient: (client) =>
          set((state) => ({
            selectedClients: state.selectedClients.concat(client),
          })),
        delSelectedClient: (id) =>
          set((state) => ({
            selectedClients: state.selectedClients.filter((client) => client.id !== id),
          })),
        setSelectedClient: (client) =>
          set((state) => {
            if (client) {
              return { selectedClients: [client] };
            } else {
              return { selectedClients: [] };
            }
          }),
      }),
      {
        name: 'client-zustand',
      }
    )
  )
);

// interface DateTaskStore {
//   dateTask: string;
//   setDateTask: (date: string) => void;
// }

// export const useDateTaskStore = create<DateTaskStore>()(
//   devtools((set) => ({
//     dateTask: '',
//     setDateTask: (date: string) => set((state) => ({ dateTask: date })),
//   }))
// );

interface SearchStore {
  searchValue: string;
  setSearchValue: (search: string) => void;
  clearSearchValue: () => void;
}

export const useSearchStore = create<SearchStore>()(
  devtools((set) => ({
    searchValue: '',
    setSearchValue: (search) => set((state) => ({ searchValue: search })),
    clearSearchValue: () => set((state) => ({ searchValue: '' })),
  }))
);

interface EditableTaskStore {
  editableTask: Task;
  addSelectedTypeOfTask: (typeOfTask: TypeOfTask) => void;
  delSelectedTypesOfTask: (id: string) => void;
  // setSelectedTypesOfTask: (typesOfTask: TypeOfTask[]) => void;
  addSelectedClient: (client: Client) => void;
  delSelectedClient: (id: string) => void;
  // setSelectedClient: (clients: Client[]) => void;
  setEditableTask: (task: Task) => void;
  setEditableTaskDate: (date: string) => void;
}

export const useEditableTaskStore = create<EditableTaskStore>()(
  devtools((set) => ({
    editableTask: {
      id: '',
      isTaskRegular: false,
      weekDays: [],
      dateTime: '',
      clients: [],
      typesOfTask: [],
    },
    addSelectedTypeOfTask: (typeOfTask) =>
      set((state) => ({
        editableTask: {
          ...state.editableTask,
          typesOfTask: state.editableTask.typesOfTask.concat(typeOfTask),
        },
      })),
    delSelectedTypesOfTask: (id) =>
      set((state) => ({
        editableTask: {
          ...state.editableTask,
          typesOfTask: state.editableTask.typesOfTask.filter((task) => task.id !== id),
        },
      })),
    // setSelectedTypesOfTask: (typesOfTask) =>
    //   set((state) => ({
    //     editableTask: { ...state.editableTask, typesOfTask },
    //   })),
    addSelectedClient: (client) =>
      set((state) => ({
        editableTask: {
          ...state.editableTask,
          clients: state.editableTask.clients.concat(client),
        },
      })),
    delSelectedClient: (id) =>
      set((state) => ({
        editableTask: {
          ...state.editableTask,
          clients: state.editableTask.clients.filter((client) => client.id !== id),
        },
      })),
    setEditableTask: (editableTask) =>
      set((state) => ({
        editableTask,
      })),
    setEditableTaskDate: (date) =>
      set((state) => ({
        editableTask: { ...state.editableTask, dateTime: date },
      })),
  }))
);

interface TaskStore {
  tasks: Task[];
  editableTask: Task | null;
  addTask: (task: Task) => void;
  delTask: (id: string) => void;
  updTasks: (task: Task) => void;
  setEditableTask: (task: Task) => void;
}

export const useTaskStore = create<TaskStore>()(
  devtools(
    persist(
      (set) => ({
        tasks: [],
        editableTask: null,
        addTask: (task) => set((state) => ({ tasks: state.tasks.concat([task]) })),
        delTask: (id) =>
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== id),
          })),
        updTasks: (taskUpd) =>
          set((state) => ({
            tasks: state.tasks.map((taskSrore) =>
              taskSrore.id === taskUpd.id ? taskUpd : taskSrore
            ),
          })),
        setEditableTask: (task) =>
          set((state) => ({
            editableTask: task,
          })),
      }),
      {
        name: 'task-zustand',
      }
    )
  )
);
export interface TypeOfTask {
  id: string;
  taskName: string;
  taskDuration: number;
  taskDurationText: string;
  byDefault: boolean;
}
interface TypeOfTaskStore {
  typesOfTask: TypeOfTask[];
  editableTypeOfTask: TypeOfTask;
  isTypeOfTaskDialogOpen: boolean;
  selectedTypesOfTask: TypeOfTask[];
  addTypeOfTask: (typeOfTask: TypeOfTask) => void;
  delTypeOfTask: (TypeOfTaskId: string) => void;
  updTypeOfTask: (typeOfTask: TypeOfTask) => void;
  setIsTypeOfTaskDialogOpen: (isOpen: boolean) => void;
  setEditableTypeOfTask: (typeOfTask: TypeOfTask) => void;
  addSelectedTypesOfTask: (typeOfTask: TypeOfTask) => void;
  delSelectedTypesOfTask: (id: string) => void;
  setSelectedTypesOfTask: (typeOfTask: TypeOfTask | null) => void;
  setTypeOfTaskByDefault: (id: string) => void;
}

export const useTypeOfTaskStore = create<TypeOfTaskStore>()(
  devtools(
    persist(
      (set) => ({
        typesOfTask: [
          {
            id: 'jijfefo',
            taskName: 'demo задача',
            taskDuration: 1,
            taskDurationText: '1 час',
            byDefault: true,
          },
        ],
        editableTypeOfTask: {
          id: '',
          taskName: '',
          taskDuration: 0,
          taskDurationText: '',
          byDefault: false,
        },
        isTypeOfTaskDialogOpen: false,
        selectedTypesOfTask: [],
        addTypeOfTask: (typeOfTask) =>
          set((state) => ({ typesOfTask: state.typesOfTask.concat([typeOfTask]) })),
        delTypeOfTask: (TypeOfTaskId) =>
          set((state) => ({
            typesOfTask: state.typesOfTask.filter(
              (typeOfTask) => typeOfTask.id !== TypeOfTaskId
            ),
          })),
        updTypeOfTask: (typeOfTask) =>
          set((state) => ({
            typesOfTask: state.typesOfTask.map((typeOfTaskStore) =>
              typeOfTaskStore.id === typeOfTask.id ? typeOfTask : typeOfTaskStore
            ),
          })),
        setIsTypeOfTaskDialogOpen: (isOpen) =>
          set((state) => ({ isTypeOfTaskDialogOpen: isOpen })),
        setEditableTypeOfTask: (editedTypeOfTask) =>
          set((state) => ({ editableTypeOfTask: editedTypeOfTask })),
        addSelectedTypesOfTask: (typeOfTask) =>
          set((state) => ({
            selectedTypesOfTask: state.selectedTypesOfTask.concat(typeOfTask),
          })),
        delSelectedTypesOfTask: (id) =>
          set((state) => ({
            selectedTypesOfTask: state.selectedTypesOfTask.filter(
              (typeOfTask) => typeOfTask.id !== id
            ),
          })),
        setSelectedTypesOfTask: (TypeOfTask) =>
          set((state) => {
            if (TypeOfTask) {
              return { selectedTypesOfTask: [TypeOfTask] };
            } else {
              return { selectedTypesOfTask: [] };
            }
          }),
        setTypeOfTaskByDefault: (id) =>
          set((state) => ({
            typesOfTask: state.typesOfTask.map((typeOfTaskStore) =>
              typeOfTaskStore.id === id
                ? { ...typeOfTaskStore, byDefault: !typeOfTaskStore.byDefault }
                : { ...typeOfTaskStore, byDefault: false }
            ),
          })),
      }),
      {
        name: 'typeoftask-zustand',
      }
    )
  )
);

type ScheduleView = 'allDayScroll' | 'dayOfWeekSelect';
interface TimeRange {
  from: number;
  to: number;
}
interface AppState {
  scheduleView: ScheduleView;
  timeRange: TimeRange;
  setScheduleView: (scheduleView: ScheduleView) => void;
  setTimeRange: (setTimeRange: TimeRange) => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        scheduleView: 'allDayScroll',
        timeRange: { from: 0, to: 17 },
        setScheduleView: (scheduleView) => set((state) => ({ scheduleView })),
        setTimeRange: (timeRange) => set((state) => ({ timeRange })),
      }),
      {
        name: 'app-zustand',
      }
    )
  )
);
