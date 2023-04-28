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
import { deleteManySuccess, setSelected, setStaffs, showAddStaff, showUpdateStaff } from '../../slice';
import StaffService from '../../../../services/staff.service';

const EditTable = ({ numSelected }) => {
    const state = useSelector(state => state.staff);
    const dispatch = useDispatch();
    const getStaffs = async () => {
        const data = await StaffService.getAll();
        dispatch(setStaffs(data.result));
    };
    const addStaff = () => {
        dispatch(showAddStaff());
    };
    const updateStaff = () => {
        dispatch(showUpdateStaff());
    };
    const deleteStaff = async () => {
        const data = await StaffService.deleteAll(state.selected);
        if (data) {
            dispatch(deleteManySuccess());
            dispatch(setSelected([]));

        }

    };

    if (numSelected === 1) {
        return (
            <>
                <Tooltip title='Cập nhật nhân viên'>
                    <IconButton onClick={updateStaff}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Xóa'>
                    <IconButton onClick={deleteStaff}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    } else if (numSelected > 1) {
        return (
            <Tooltip title='Xóa'>
                <IconButton onClick={deleteStaff}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (<>
                <Tooltip title='Tải lại'>
                    <IconButton onClick={getStaffs}>
                        <ReplayIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Thêm nhân viên'>
                    <IconButton onClick={addStaff}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }

};

const StaffToolbar = (props) => {
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
                    Staff
                </Typography>
            )}
            <EditTable numSelected={numSelected} />
        </Toolbar>
    );
};
export default StaffToolbar;
