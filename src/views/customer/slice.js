import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    addCustomer: false,
    updateCustomer: false,
    updateCustomerCurrent: {},
    customers: [],
    loading: false

};

export const CustomerSlice = createSlice({
    name: 'Customer',
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
        setCustomers: (state, action) => {
            state.customers = action.payload;
        },
        setAddCustomer: (state, action) => {
            state.addCustomer = action.payload;
        },
        setUpdateCustomer: (state, action) => {
            state.updateCustomer = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddCustomer: (state) => {
            state.addCustomer = true;
        },
        closeAddCustomer: (state) => {
            state.addCustomer = false;
        },
        showUpdateCustomer: (state) => {
            state.updateCustomer = true;
        },
        closeUpdateCustomer: (state) => {
            state.updateCustomer = false;
        },
        deleteManySuccess: (state) => {
            state.customers = state.customers.filter(customer => !state.selected.includes(customer._id));
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
    setCustomers,
    setAddCustomer,
    setUpdateCustomer,
    requestSort,
    showAddCustomer,
    closeAddCustomer,
    showUpdateCustomer,
    closeUpdateCustomer,
    deleteManySuccess,
    setLoading
} = CustomerSlice.actions;

export default CustomerSlice.reducer;
