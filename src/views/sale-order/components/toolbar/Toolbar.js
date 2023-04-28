import Toolbar from '@mui/material/Toolbar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AddIcon from '@mui/icons-material/Add';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from 'react-redux';
import { deleteManySuccess, setSaleOrders, setSelected, showAddSaleOrder, showViewSaleOrder } from '../../slice';
import SaleOrderService from '../../../../services/sale-order.service';

const EditTable = ({ numSelected }) => {
    const state = useSelector(state => state.saleOrder);
    const dispatch = useDispatch();
    const getSaleOrders = async () => {
        const data = await SaleOrderService.getAll();
        dispatch(setSaleOrders(data.result));
    };
    const addSaleOrder = () => {
        dispatch(showAddSaleOrder());
    };
    const updateSaleOrder = () => {
        dispatch(showViewSaleOrder());
    };
    const deleteSaleOrder = async () => {
        const data = await SaleOrderService.deleteAll(state.selected);
        if (data) {
            dispatch(deleteManySuccess());
            dispatch(setSelected([]));

        }

    };

    if (numSelected === 1) {
        return (
            <>
                <Tooltip title='Xem phiếu nhập'>
                    <IconButton onClick={updateSaleOrder}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Xóa'>
                    <IconButton onClick={deleteSaleOrder}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    } else if (numSelected > 1) {
        return (
            <Tooltip title='Xóa'>
                <IconButton onClick={deleteSaleOrder}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (<>
                <Tooltip title='Tải lại'>
                    <IconButton onClick={getSaleOrders}>
                        <ReplayIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Thêm màu sắc'>
                    <IconButton onClick={addSaleOrder}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }

};

const SaleOrderToolbar = (props) => {
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
                    SaleOrder
                </Typography>
            )}
            <EditTable numSelected={numSelected} />
        </Toolbar>
    );
};
export default SaleOrderToolbar;
