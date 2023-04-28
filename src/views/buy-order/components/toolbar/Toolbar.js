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
import { deleteManySuccess, setBuyOrders, setSelected, showAddBuyOrder, showViewBuyOrder } from '../../slice';
import BuyOrderService from '../../../../services/buy-order.service';

const EditTable = ({ numSelected }) => {
    const state = useSelector(state => state.buyOrder);
    const dispatch = useDispatch();
    const getBuyOrders = async () => {
        const data = await BuyOrderService.getAll();
        dispatch(setBuyOrders(data.result));
    };
    const addBuyOrder = () => {
        dispatch(showAddBuyOrder());
    };
    const updateBuyOrder = () => {
        dispatch(showViewBuyOrder());
    };
    const deleteBuyOrder = async () => {
        const data = await BuyOrderService.deleteAll(state.selected);
        if (data) {
            dispatch(deleteManySuccess());
            dispatch(setSelected([]));

        }

    };

    if (numSelected === 1) {
        return (
            <>
                <Tooltip title='Xem phiếu nhập'>
                    <IconButton onClick={updateBuyOrder}>
                        <RemoveRedEyeIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Xóa'>
                    <IconButton onClick={deleteBuyOrder}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    } else if (numSelected > 1) {
        return (
            <Tooltip title='Xóa'>
                <IconButton onClick={deleteBuyOrder}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (<>
                <Tooltip title='Tải lại'>
                    <IconButton onClick={getBuyOrders}>
                        <ReplayIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Thêm màu sắc'>
                    <IconButton onClick={addBuyOrder}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }

};

const BuyOrderToolbar = (props) => {
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
                    BuyOrder
                </Typography>
            )}
            <EditTable numSelected={numSelected} />
        </Toolbar>
    );
};
export default BuyOrderToolbar;
