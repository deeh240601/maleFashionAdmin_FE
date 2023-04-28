import { createSlice } from '@reduxjs/toolkit';
import { VOUCHER_STATUS } from '../../core/constant/data/voucher-status';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    vouchers: [],
    addVoucher: false,
    updateVoucher: false,
    updateVoucherCurrent: {}

};

export const VoucherSlice = createSlice({
    name: 'Voucher',
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
        setVouchers: (state, action) => {
            const voucherList = action.payload;
            const dateNow = new Date().toISOString().split('T')[0];
            voucherList.forEach(item => {
                let startDate = Date.parse(item.startDate);
                let endDate = Date.parse(item.endDate);
                let now = Date.parse(dateNow);

                if (now < startDate) {
                    item.status = VOUCHER_STATUS.NON_START;
                } else if (now >= startDate && now <= endDate) {
                    item.status = VOUCHER_STATUS.HAPPENING;
                } else if (now > endDate) {
                    item.status = VOUCHER_STATUS.OVER;
                }
            });
            state.vouchers = action.payload;
        },
        setAddVoucher: (state, action) => {
            state.addVoucher = action.payload;
        },
        setUpdateVoucher: (state, action) => {
            state.updateVoucher = action.payload;
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddVoucher: (state) => {
            state.addVoucher = true;
        },
        closeAddVoucher: (state) => {
            state.addVoucher = false;
        },
        showUpdateVoucher: (state) => {
            state.updateVoucher = true;
        },
        closeUpdateVoucher: (state) => {
            state.updateVoucher = false;
        },
        deleteManySuccess: (state) => {
            state.vouchers = state.vouchers.filter(voucher => !state.selected.includes(voucher._id));
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
    setVouchers,
    setAddVoucher,
    setUpdateVoucher,
    requestSort,
    showAddVoucher,
    closeAddVoucher,
    showUpdateVoucher,
    closeUpdateVoucher,
    deleteManySuccess
} = VoucherSlice.actions;

export default VoucherSlice.reducer;
