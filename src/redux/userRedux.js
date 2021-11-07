//yarn add axios @reduxjs/toolkit react-redux

import { createSlice } from "@reduxjs/toolkit"


const userSlice = createSlice({ // Objeto que contiene nuestro estado inicial y sus reducers
    name:"user",
    initialState:{
       currentUser: {
           "ok": true,
            "_id": "123",
            username: "test Name",
            email: "test@gmail.com",
            isAdmin: false,
            createdAt: "test date1",
            updatedAt: "test date2",
            accessToken: "123",
       },
       isFetching: false,
       error: false,
    },                                                                          
    reducers:{                                                                  
        loginStart:( state ) => {   
            state.isFetching = true;                // isFetchin indica si estamos en proceso de logueo, en este caso, si.
        },
        loginSuccess:( state, action ) => {
            state.isFetching = false;               // Cuando el proceso de logueo terminó isFetchin pasa falso
            state.currentUser = action.payload;     // Y establecemos el estado del usuario con la información del action 
        },
        loginFailure:( state ) => {
            state.isFetching = false;
            state.error = true;
        },
         logout: (state) => {
         state.currentUser = null;
    },
    }
});

export const { 
    loginFailure,
    loginStart,
    loginSuccess
 } = userSlice.actions;                 // Exportamos las funciónes reductoras que permite loguear un usuario

 export default userSlice.reducer;       // Exportamos el objeto que controla los reducers de logueo