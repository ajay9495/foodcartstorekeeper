
import { configureStore } from '@reduxjs/toolkit';
import UserSlice from './UserSlice';
import DialogueSlice from './DialogueSlice';

const store = configureStore({
    reducer:{
        user: UserSlice,
        dialogue: DialogueSlice
    }
});


export default store;


