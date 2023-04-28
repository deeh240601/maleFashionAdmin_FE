import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from 'react-redux';
import { deleteManySuccess, setSelected, setSuppliers, showAddSupplier, showUpdateSupplier } from '../../slice';
import SupplierService from '../../../../services/supplier.service';

const EditTable = ({ numSelected }) => {
    const state = useSelector(state => state.supplier);
    const dispatch = useDispatch();
    const getSuppliers = async () => {
        const data = await SupplierService.getAll();
        dispatch(setSuppliers(data.result));
    };
    const addSupplier = () => {
        dispatch(showAddSupplier());
    };
    const updateSupplier = () => {
        dispatch(showUpdateSupplier());
    };
    const deleteSupplier = async () => {
        const data = await SupplierService.deleteAll(state.selected);
        if (data) {
            dispatch(deleteManySuccess());
            dispatch(setSelected([]));

        }

    };

    if (numSelected === 1) {
        return (
            <>
                <Tooltip title='Cập nhật nhà cung cấp'>
                    <IconButton onClick={updateSupplier}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Xóa'>
                    <IconButton onClick={deleteSupplier}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    } else if (numSelected > 1) {
        return (
            <Tooltip title='Xóa'>
                <IconButton onClick={deleteSupplier}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (<>
                <Tooltip title='Tải lại'>
                    <IconButton onClick={getSuppliers}>
                        <ReplayIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Thêm nhà cung cấp'>
                    <IconButton onClick={addSupplier}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }

};

const SupplierToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color='inherit'
                    variant='subtitle1'
                    component='div'
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant='h4'
                    id='tableTitle'
                    component='div'
                >
                    Supplier
                </Typography>
            )}
            <EditTable numSelected={numSelected} />
        </Toolbar>
    );
};
export default SupplierToolbar;
