import { createSlice } from '@reduxjs/toolkit';
import config from 'config';

const initialState = {

    theme: 'light',
    title: 'ShirtShop management',
    isOpen: [], // for active default menu
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    titleForm: ''

};

export const AppUiSlice = createSlice({
    name: 'AppUI',
    initialState,
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        },

        setMenu: (state, action) => {
            state.opened = action.payload;
        },

        setBorderRadius: (state, action) => {
            state.borderRadius = action.payload;
        },

        setTitleForm: (state, action) => {
            state.titleForm = action.payload;
        },

        setFontFamily: (state, action) => {
            state.fontFamily = action.payload;
        },


        setTitlePage: (state, action) => {
            document.title = action.payload;
        }


    }
});

// Action creators are generated for each case reducer function
export const {
    menuOpen,
    setMenu,
    setBorderRadius,
    setFontFamily,
    setTitlePage,
    setTitleForm
} = AppUiSlice.actions;

export default AppUiSlice.reducer;
