import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  openedModalId: string | null;
}

const initialState: ModalState = {
  openedModalId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<string>) {
      state.openedModalId = action.payload;
    },
    closeModal(state) {
      state.openedModalId = null;
    },
  },
  selectors: {
    selectOpenModalId: (state) => state.openedModalId,
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const { selectOpenModalId } = modalSlice.selectors;
