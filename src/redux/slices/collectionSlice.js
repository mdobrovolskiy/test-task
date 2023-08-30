import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collectionOpened: false,
  currentCollectionId: null,
}

export const collectionOpenedSlice = createSlice({
  name: 'collectionOpenedSlice',
  initialState,
  reducers: {
    handleCollection(state, action) {
      state.collectionOpened = action.payload.opened
      state.currentCollectionId = action.payload.currentCollectionId
    },
  },
})

export const { handleCollection } = collectionOpenedSlice.actions

export default collectionOpenedSlice.reducer
