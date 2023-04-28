import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    sizes: [],
    addSize: false,
    updateSize: false,
    updateSizeCurrent: {}

};

export const SizeSlice = createSlice({
    name: 'Size',
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
        setSizes: (state, action) => {
            state.sizes = action.payload;
        },
        setAddSize: (state, action) => {
            state.addSize = action.payload;
        },
        setUpdateSize: (state, action) => {
            state.updateSize = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddSize: (state) => {
            state.addSize = true;
        },
        closeAddSize: (state) => {
            state.addSize = false;
        },
        showUpdateSize: (state) => {
            state.updateSize = true;
        },
        closeUpdateSize: (state) => {
            state.updateSize = false;
        },
        deleteManySuccess: (state) => {
            state.sizes = state.sizes.filter(size => !state.selected.includes(size._id));
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
    setSizes,
    setAddSize,
    setUpdateSize,
    requestSort,
    showAddSize,
    closeAddSize,
    showUpdateSize,
    closeUpdateSize,
    deleteManySuccess
} = SizeSlice.actions;

export default SizeSlice.reducer;
