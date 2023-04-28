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
import ColorToolbar from './components/toolbar/Toolbar';
import ColorTableHead from './components/toolbar/TableHead';
import ColorService from '../../services/color.service';
import { useDispatch, useSelector } from 'react-redux';
import { requestSort, setColors, setPage, setRowsPerPage, setSelected } from './slice';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AddColor from './components/add-color';
import UpdateColor from './components/update-color';


const headCells = [
    {
        id: 'name',
        numberic: false,
        disablePadding: true,
        label: 'Tên màu'
    },
    {
        id: 'code',
        numberic: false,
        disablePadding: true,
        label: 'Mã màu'
    },
    {
        id: 'x',
        label: ''
    }
];

const Color = () => {
    const state = useSelector(state => state.color);
    const dispatch = useDispatch();
    useEffect(() => {
        getColors();
    }, []);

    const getColors = async () => {
        const data = await ColorService.getAll();
        dispatch(setColors(data.result));
    };
    const handleRequestSort = (event, property) => {
        dispatch(requestSort(property));
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = state.colors.map((n) => n._id);
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
        state.page > 0 ? Math.max(0, (1 + state.page) * state.rowsPerPage - state.colors.length) : 0;

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <ColorToolbar numSelected={state.selected.length} />

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
                                <ColorTableHead
                                    numSelected={state.selected.length}
                                    order={state.order}
                                    orderBy={state.orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={state.colors.length}
                                    headCells={headCells}
                                />
                                <TableBody>
                                    {state.colors.slice().sort(getComparator(state.order, state.orderBy))
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
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align={'left'}>{row.code}</TableCell>
                                                    <TableCell align={'left'}><Box sx={{
                                                        height: 20, width: 20,
                                                        backgroundColor: row.code
                                                    }} /> </TableCell>
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
                        rowsPerPageOptions={[10, 20, 30]}
                        component='div'
                        count={state.colors.length}
                        rowsPerPage={state.rowsPerPage}
                        page={state.page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>

            </Box>
            <AddColor saveCompleteEvent={getColors} />
            <UpdateColor saveCompleteEvent={getColors} />
        </>
    );
};
export default Color;
