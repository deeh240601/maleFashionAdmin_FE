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
import SupplierToolbar from './components/toolbar/Toolbar';
import SupplierTableHead from './components/toolbar/TableHead';
import SupplierService from '../../services/supplier.service';
import { useDispatch, useSelector } from 'react-redux';
import { requestSort, setPage, setRowsPerPage, setSelected, setSuppliers } from './slice';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddSupplier from './components/add-supplier';
import UpdateSupplier from './components/update-supplier';


const headCells = [

    {
        id: 'lastName',
        numberic: false,
        disablePadding: true,
        label: 'Tên'
    },
    {
        id: 'email',
        numberic: false,
        disablePadding: true,
        label: 'Email'
    },
    {
        id: 'phone',
        numberic: false,
        disablePadding: true,
        label: 'Số điện thoai'
    }

];

const Supplier = () => {
    const state = useSelector(state => state.supplier);
    const dispatch = useDispatch();
    useEffect(() => {
        getSuppliers();
    }, []);

    const getSuppliers = async () => {
        const data = await SupplierService.getAll();
        dispatch(setSuppliers(data.result));
    };
    const handleRequestSort = (event, property) => {
        dispatch(requestSort(property));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = state.suppliers.map((n) => n._id);
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
        state.page > 0 ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.suppliers.length) : 0;

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <SupplierToolbar numSelected={state.selected.length} />

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
                                <SupplierTableHead
                                    numSelected={state.selected.length}
                                    order={state.order}
                                    orderBy={state.orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={state.suppliers.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {state.suppliers.slice().sort(getComparator(state.order, state.orderBy))
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
                                                            supplier='primary'
                                                            checked={isItemSelected}
                                                            inputProps={{
                                                                'aria-labelledby': labelId
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align={'left'}>{row.lastName}</TableCell>
                                                    <TableCell align={'left'}>{row.email}</TableCell>
                                                    <TableCell align={'left'}>{row.phone}</TableCell>
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
                        count={state.suppliers.length}
                        rowsPerPage={state.rowsPerPage}
                        page={state.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            <AddSupplier saveCompleteEvent={getSuppliers} />
            <UpdateSupplier saveCompleteEvent={getSuppliers} />
        </>
    );
};
export default Supplier;
