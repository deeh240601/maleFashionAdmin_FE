import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    addStaff: false,
    updateStaff: false,
    updateStaffCurrent: {},
    staffs: [],
    loading: false

};

export const StaffSlice = createSlice({
    name: 'Staff',
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
        setStaffs: (state, action) => {
            state.staffs = action.payload;
        },
        setAddStaff: (state, action) => {
            state.addStaff = action.payload;
        },
        setUpdateStaff: (state, action) => {
            state.updateStaff = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddStaff: (state) => {
            state.addStaff = true;
        },
        closeAddStaff: (state) => {
            state.addStaff = false;
        },
        showUpdateStaff: (state) => {
            state.updateStaff = true;
        },
        closeUpdateStaff: (state) => {
            state.updateStaff = false;
        },
        deleteManySuccess: (state) => {
            state.staffs = state.staffs.filter(staff => !state.selected.includes(staff._id));
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
    setStaffs,
    setAddStaff,
    setUpdateStaff,
    requestSort,
    showAddStaff,
    closeAddStaff,
    showUpdateStaff,
    closeUpdateStaff,
    deleteManySuccess,
    setLoading
} = StaffSlice.actions;

export default StaffSlice.reducer;
