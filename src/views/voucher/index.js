import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { getComparator } from '../../core/utils/table';
import VoucherToolbar from './components/toolbar/Toolbar';
import VoucherTableHead from './components/toolbar/TableHead';
import VoucherService from '../../services/voucher.service';
import { useDispatch, useSelector } from 'react-redux';
import { requestSort, setPage, setRowsPerPage, setSelected, setVouchers } from './slice';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddVoucher from './components/add-voucher';
import UpdateVoucher from './components/update-voucher';
import { VOUCHER_STATUS } from '../../core/constant/data/voucher-status';
import { Chip } from '@mui/material';


const headCells = [
    {
        id: 'code',
        numberic: false,
        disablePadding: true,
        label: 'Mã khuyến mãi'
    }, {
        id: 'condition',
        numberic: false,
        disablePadding: true,
        label: 'Hóa đơn trên'
    }, {
        id: 'percent',
        numberic: false,
        disablePadding: true,
        label: 'Phần trăm giảm'
    }, {
        id: 'status',
        numberic: false,
        disablePadding: true,
        label: 'Trạng thái'
    }
];

const Voucher = () => {
    const state = useSelector(state => state.voucher);
    const dispatch = useDispatch();
    useEffect(() => {
        getVouchers();
    }, []);

    const getVouchers = async () => {
        const data = await VoucherService.getAll();
        dispatch(setVouchers(data.result));
    };
    const handleRequestSort = (event, property) => {
        dispatch(requestSort(property));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = state.vouchers.map((n) => n._id);
            dispatch(setSelected(newSelected));
            return;
        }
        dispatch(setSelected([]));
    };

    const handleClick = (event, id) => {
        const selectedIndex = state.selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(state.selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(state.selected.slice(1));
        } else if (selectedIndex === state.selected.length - 1) {
            newSelected = newSelected.concat(state.selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                state.selected.slice(0, selectedIndex),
                state.selected.slice(selectedIndex + 1)
            );
        }
        dispatch(setSelected(newSelected));
    };

    const handleChangePage = (event, newPage) => {
        dispatch(setPage(newPage));
    };

    const handleChangeRowsPerPage = (event) => {
        dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
        dispatch(setPage(0));
    };
    const isSelected = (name) => state.selected.indexOf(name) !== -1;

    const emptyRows =
        state.page > 0 ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.vouchers.length) : 0;
    const renderSwitch = (item) => {
        switch (item.status) {
            case VOUCHER_STATUS.NON_START:
                return <Chip label='Chưa bắt đầu' color='primary' />;
            case VOUCHER_STATUS.HAPPENING:
                return <Chip label='Đang diễn ra' color='success' />;
                ;
            case VOUCHER_STATUS.OVER:
                return <Chip label='Đã kết thúc' color='error' />;
            default:
                return '';
        }
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <VoucherToolbar numSelected={state.selected.length} />

                    <TableContainer>
                        <PerfectScrollbar
                            component='div'
                            style={{
                                height: '660px',
                                paddingLeft: '16px',
                                paddingRight: '16px'
                            }}
                        >
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby='tableTitle'
                                size={'medium'}
                                stickyHeader
                            >
                                <VoucherTableHead
                                    numSelected={state.selected.length}
                                    order={state.order}
                                    orderBy={state.orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={state.vouchers.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {state.vouchers.slice().sort(getComparator(state.order, state.orderBy))
                                        .slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row._id);
                                            const labelId = `enhanced-table-checkbox-${index}`;
                                            return (
                                                <TableRow
                                                    hover
                                                    onClick={(event) => handleClick(event, row._id)}
                                                    role='checkbox'
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row._id}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell padding='checkbox'>
                                                        <Checkbox
                                                            size='medium'
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align={'left'}>
                                                        {row.code}
                                                    </TableCell>
                                                    <TableCell align={'left'}>
                                                        {row.condition}$
                                                    </TableCell>
                                                    <TableCell align={'left'}>
                                                        {row.percent}%
                                                    </TableCell>
                                                    <TableCell align={'left'}>
                                                        {renderSwitch(row)}
                                                    </TableCell>

                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (53) * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </PerfectScrollbar>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component='div'
                        count={state.vouchers.length}
                        rowsPerPage={state.rowsPerPage}
                        page={state.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            <AddVoucher saveCompleteEvent={getVouchers} />
            <UpdateVoucher saveCompleteEvent={getVouchers} />
        </>
    );
};
export default Voucher;
