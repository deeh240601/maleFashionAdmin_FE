import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    categorys: [],
    addCategory: false,
    updateCategory: false,
    updateCategoryCurrent: {}

};

export const CategorySlice = createSlice({
    name: 'Category',
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
        setCategorys: (state, action) => {
            state.categorys = action.payload;
        },
        setAddCategory: (state, action) => {
            state.addCategory = action.payload;
        },
        setUpdateCategory: (state, action) => {
            state.updateCategory = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddCategory: (state) => {
            state.addCategory = true;
        },
        closeAddCategory: (state) => {
            state.addCategory = false;
        },
        showUpdateCategory: (state) => {
            state.updateCategory = true;
        },
        closeUpdateCategory: (state) => {
            state.updateCategory = false;
        },
        deleteManySuccess: (state) => {
            state.categorys = state.categorys.filter(category => !state.selected.includes(category._id));
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
    setCategorys,
    setAddCategory,
    setUpdateCategory,
    requestSort,
    showAddCategory,
    closeAddCategory,
    showUpdateCategory,
    closeUpdateCategory,
    deleteManySuccess
} = CategorySlice.actions;

export default CategorySlice.reducer;
