import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    addSupplier: false,
    updateSupplier: false,
    updateSupplierCurrent: {},
    suppliers: [],
    loading: false

};

export const SupplierSlice = createSlice({
    name: 'Supplier',
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
        setSuppliers: (state, action) => {
            state.suppliers = action.payload;
        },
        setAddSupplier: (state, action) => {
            state.addSupplier = action.payload;
        },
        setUpdateSupplier: (state, action) => {
            state.updateSupplier = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddSupplier: (state) => {
            state.addSupplier = true;
        },
        closeAddSupplier: (state) => {
            state.addSupplier = false;
        },
        showUpdateSupplier: (state) => {
            state.updateSupplier = true;
        },
        closeUpdateSupplier: (state) => {
            state.updateSupplier = false;
        },
        deleteManySuccess: (state) => {
            state.suppliers = state.suppliers.filter(supplier => !state.selected.includes(supplier._id));
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
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
    setSuppliers,
    setAddSupplier,
    setUpdateSupplier,
    requestSort,
    showAddSupplier,
    closeAddSupplier,
    showUpdateSupplier,
    closeUpdateSupplier,
    deleteManySuccess,
    setLoading
} = SupplierSlice.actions;

export default SupplierSlice.reducer;
