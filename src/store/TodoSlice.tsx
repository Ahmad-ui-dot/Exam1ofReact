import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dataR : [
        {
           id : 1,
           status : true,
           job : "disayner",
           photo : "https://i.pravatar.cc/150?img=1"
        },
        {
           id : 2,
           status : true,
           job : "proggramer",
           photo : "https://i.pravatar.cc/150?img=2"
        },
        {
           id : 3,
           status : false,
           job : "Admin",
           photo : "https://i.pravatar.cc/150?img=3"
        },
        {
           id : 4,
           status : true,
           job : "programmer",
           photo : "https://i.pravatar.cc/150?img=4"
        },
        {
           id : 5,
           status : true,
           job : "disayner",
           photo : "https://i.pravatar.cc/150?img=5"
        },
    ]
}

export const TodoSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    deleteUserR : (state , action)=>{
      state.dataR = state.dataR.filter((el)=>el.id !=action.payload)
    },
    AddUserR : (state , action)=>{
      state.dataR = [action.payload,...state.dataR]
    },
    EditUserR : (state , action)=>{
      state.dataR = state.dataR.map((el)=> el.id === action.payload.id ? action.payload : el)
    }
  },
})


export const { deleteUserR, AddUserR, EditUserR } = TodoSlice.actions

export default TodoSlice.reducer