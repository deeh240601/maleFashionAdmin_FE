import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    buyOrders: [],
    addBuyOrder: false,
    viewBuyOrder: false,
    loading: false,
    updateBuyOrderCurrent: {},
    listSuppliers: [],
    supplierSelected: null

};

export const BuyOrderSlice = createSlice({
    name: 'BuyOrder',
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
        setBuyOrders: (state, action) => {
            state.buyOrders = action.payload;
        },
        setAddBuyOrder: (state, action) => {
            state.addBuyOrder = action.payload;
        },
        setUpdateBuyOrder: (state, action) => {
            state.updateBuyOrder = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddBuyOrder: (state) => {
            state.addBuyOrder = true;
        },
        closeAddBuyOrder: (state) => {
            state.addBuyOrder = false;
        },
        showViewBuyOrder: (state) => {
            state.viewBuyOrder = true;
        },
        closeViewBuyOrder: (state) => {
            state.viewBuyOrder = false;
        },
        deleteManySuccess: (state) => {
            state.buyOrders = state.buyOrders.filter(buyOrder => !state.selected.includes(buyOrder._id));
        },
        setListSupplier: (state, action) => {
            state.listSuppliers = action.payload;
        },

        setSupplierSelected: (state, action) => {
            state.supplierSelected = action.payload;
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
    setBuyOrders,
    setAddBuyOrder,
    setUpdateBuyOrder,
    requestSort,
    showAddBuyOrder,
    closeAddBuyOrder,
    showViewBuyOrder,
    closeViewBuyOrder,
    deleteManySuccess,
    setSupplierSelected,
    setListSupplier,
    setLoading
} = BuyOrderSlice.actions;

export default BuyOrderSlice.reducer;
