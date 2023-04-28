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
import { deleteManySuccess, setCategorys, setSelected, showAddCategory, showUpdateCategory } from '../../slice';
import CategoryService from '../../../../services/category.service';

const EditTable = ({ numSelected }) => {
    const state = useSelector(state => state.category);
    const dispatch = useDispatch();
    const getCategorys = async () => {
        const data = await CategoryService.getAll();
        dispatch(setCategorys(data.result));
    };
    const addCategory = () => {
        dispatch(showAddCategory());
    };
    const updateCategory = () => {
        dispatch(showUpdateCategory());
    };
    const deleteCategory = async () => {
        const data = await CategoryService.deleteAll(state.selected);
        if (data) {
            dispatch(deleteManySuccess());
            dispatch(setSelected([]));

        }

    };

    if (numSelected === 1) {
        return (
            <>
                <Tooltip title='Cập nhật loại sản phẩm'>
                    <IconButton onClick={updateCategory}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Xóa'>
                    <IconButton onClick={deleteCategory}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    } else if (numSelected > 1) {
        return (
            <Tooltip title='Xóa'>
                <IconButton onClick={deleteCategory}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        );
    } else {
        return (<>
                <Tooltip title='Tải lại'>
                    <IconButton onClick={getCategorys}>
                        <ReplayIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Thêm loại sản phẩm'>
                    <IconButton onClick={addCategory}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </>
        );
    }

};

const CategoryToolbar = (props) => {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcategory: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
                })
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    category='inherit'
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
                    Category
                </Typography>
            )}
            <EditTable numSelected={numSelected} />
        </Toolbar>
    );
};
export default CategoryToolbar;
