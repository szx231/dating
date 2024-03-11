import { create } from 'zustand';

type State = {
  firstName: string;
  lastName: string;
  messages: any[];
};

type Action = {
  updateFirstName: (firstName: State['firstName']) => void;
  updateLastName: (lastName: State['lastName']) => void;
  addMessages: (messages: State['messages']) => void;
};

export const usePersonStore = create<State & Action>((set) => ({
  firstName: 'Ivan',
  lastName: '',
  messages: [],
  updateFirstName: (firstName) => set((state) => ({ ...state, firstName: state.firstName + firstName })),
  updateLastName: (lastName) => set(() => ({ lastName })),
  addMessages: (messages) => set((state) => ({ messages })),
}));
