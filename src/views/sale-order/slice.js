import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    saleOrders: [],
    addSaleOrder: false,
    viewSaleOrder: false,
    loading: false,
    updateSaleOrderCurrent: {},
    listSuppliers: [],
    supplierSelected: null

};

export const SaleOrderSlice = createSlice({
    name: 'SaleOrder',
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
        setSaleOrders: (state, action) => {
            state.saleOrders = action.payload;
        },
        setAddSaleOrder: (state, action) => {
            state.addSaleOrder = action.payload;
        },
        setUpdateSaleOrder: (state, action) => {
            state.updateSaleOrder = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddSaleOrder: (state) => {
            state.addSaleOrder = true;
        },
        closeAddSaleOrder: (state) => {
            state.addSaleOrder = false;
        },
        showViewSaleOrder: (state) => {
            state.viewSaleOrder = true;
        },
        closeViewSaleOrder: (state) => {
            state.viewSaleOrder = false;
        },
        deleteManySuccess: (state) => {
            state.saleOrders = state.saleOrders.filter(saleOrder => !state.selected.includes(saleOrder._id));
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
    setSaleOrders,
    setAddSaleOrder,
    setUpdateSaleOrder,
    requestSort,
    showAddSaleOrder,
    closeAddSaleOrder,
    showViewSaleOrder,
    closeViewSaleOrder,
    deleteManySuccess,
    setSupplierSelected,
    setListSupplier,
    setLoading
} = SaleOrderSlice.actions;

export default SaleOrderSlice.reducer;
