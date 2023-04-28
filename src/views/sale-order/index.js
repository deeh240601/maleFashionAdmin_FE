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
import SaleOrderToolbar from './components/toolbar/Toolbar';
import SaleOrderTableHead from './components/toolbar/TableHead';
import { useDispatch, useSelector } from 'react-redux';
import { requestSort, setPage, setRowsPerPage, setSaleOrders, setSelected } from './slice';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SaleOrderService from '../../services/sale-order.service';
import ViewSaleOrder from './components/view-sale-order';
import { Chip } from '@mui/material';
import SALE_ORDER_STATUS from '../../core/constant/sale-order-status';


const headCells = [

    {
        id: 'code',
        numberic: false,
        disablePadding: true,
        label: 'Mã phiếu xuất bán'
    },
    {
        id: 'description',
        numberic: false,
        disablePadding: true,
        label: 'Diễn giải'
    },
    {
        id: 'ngày tạo',
        numberic: false,
        disablePadding: true,
        label: 'ngày tạo'
    },
    {
        id: 'Trạng thái',
        numberic: false,
        disablePadding: true,
        label: 'Trạng thái'
    },
    {
        id: 'paymentMethod',
        numberic: false,
        disablePadding: true,
        label: 'Phương thức thanh toán'
    }

];

const SaleOrder = () => {
    const state = useSelector(state => state.saleOrder);
    const dispatch = useDispatch();
    useEffect(() => {
        getSaleOrders();
    }, []);

    const getSaleOrders = async () => {
        const data = await SaleOrderService.getAll();
        dispatch(setSaleOrders(data.result));
    };
    const handleRequestSort = (event, property) => {
        dispatch(requestSort(property));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = state.saleOrders.map((n) => n._id);
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
        state.page > 0 ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.saleOrders.length) : 0;
    const renderSwitch = (item) => {
        switch (item.status) {
            case SALE_ORDER_STATUS.PENDING:
                return <Chip label='Mới' color='success' />;
            case SALE_ORDER_STATUS.CONFIRM:
                return <Chip label='Đã xác nhận' color='primary' />;
            case SALE_ORDER_STATUS.DELIVERING:
                return <Chip label='Đang giao' color='secondary' />;
            case SALE_ORDER_STATUS.COMPLETED:
                return <Chip label='Đã hoàn thành' color='warning' />;
            case SALE_ORDER_STATUS.CANCELED:
                return <Chip label='Đã hủy' color='error' />;
            default:
                return '';
        }
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <SaleOrderToolbar numSelected={state.selected.length} />

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
                                <SaleOrderTableHead
                                    numSelected={state.selected.length}
                                    order={state.order}
                                    orderBy={state.orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={state.saleOrders.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {state.saleOrders.slice().sort(getComparator(state.order, state.orderBy))
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
                                                            color='primary'
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align={'left'}>
                                                        {row.code}
                                                    </TableCell>
                                                    <TableCell align={'left'}>{row.description}</TableCell>
                                                    <TableCell align={'left'}>{row.createdAt.split('T')[0]}</TableCell>
                                                    <TableCell align={'left'}>{renderSwitch(row)}</TableCell>
                                                    <TableCell align={'left'}>{row.paymentMethod}</TableCell>


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
                        count={state.saleOrders.length}
                        rowsPerPage={state.rowsPerPage}
                        page={state.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            <ViewSaleOrder saveComplete={getSaleOrders} />
        </>
    );
};
export default SaleOrder;
