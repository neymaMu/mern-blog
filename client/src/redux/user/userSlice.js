import { createSlice } from '@reduxjs/toolkit' 

    const initialState = {
    currentUser: null,
     error:null,
     loading:false
  } 


  const userSlice = createSlice({
   
    name:"user",
    initialState,
   
    reducers:{
       
        signInStart:(state) =>{
            state.loading=true;
            state.error=null;
        },

        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading=false;
            state.error=null;
        }, 

        signInFailure:(state,action) =>{
            state.loading = false;
            state.error = action.payload
        },

        updateStart:(state)=>{
            state.loading = true;
            state.error = null
        },

        updateSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null

        },

        updateFalier:(state,action) =>{
            state.loading = false;
            state.error = action.payload
        },

        deletUserStart:(state)=>{
            state.loading=true;
            state.error=null
        },

        deleteSuccess:(state)=>{
            state.currentUser = null;
            state.loading = false;
            state.error = null

        },
       deleteFalier:(state,action) =>{
            state.loading = false;
            state.error = action.payload
        },

        signoutSuccses:(state) =>{
            state.currentUser = null;
            state.error = null;
            state.loading=false
        }
   
    }

  })  


export const{signoutSuccses,deletUserStart, deleteSuccess, deleteFalier,signInStart,signInSuccess,signInFailure,updateStart,updateSuccess,updateFalier} = userSlice.actions

export default userSlice.reducer





