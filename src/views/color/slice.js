import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    colors: [],
    addColor: false,
    updateColor: false,
    updateColorCurrent: {}

};

export const ColorSlice = createSlice({
    name: 'Color',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
        setColors: (state, action) => {
            state.colors = action.payload;
        },
        setAddColor: (state, action) => {
            state.addColor = action.payload;
        },
        setUpdateColor: (state, action) => {
            state.updateColor = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddColor: (state) => {
            state.addColor = true;
        },
        closeAddColor: (state) => {
            state.addColor = false;
        },
        showUpdateColor: (state) => {
            state.updateColor = true;
        },
        closeUpdateColor: (state) => {
            state.updateColor = false;
        },
        deleteManySuccess: (state) => {
            state.colors = state.colors.filter(color => !state.selected.includes(color._id));
        }


    }
});

// Action creators are generated for each case reducer function
export const {
    setOrder,
    setOrderBy,
    setSelected,
    setPage,
    setRowsPerPage,
    setColors,
    setAddColor,
    setUpdateColor,
    requestSort,
    showAddColor,
    closeAddColor,
    showUpdateColor,
    closeUpdateColor,
    deleteManySuccess
} = ColorSlice.actions;

export default ColorSlice.reducer;
