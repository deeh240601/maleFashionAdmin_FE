import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddCategory } from '../../slice';
import { FormHelperText, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CategoryService from '../../../../services/category.service';

const AddCategory = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.category);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddCategory());
    };
    const handleAddCategory = async (values) => {
        const data = await CategoryService.create(values);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddCategory());
        }
    };

    return (

        <Dialog open={state.addCategory} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm loại sản phẩm</Typography>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Vui lòng nhập tên loại')
                })}
                onSubmit={handleAddCategory}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField name={'name'} label='Tên loại' variant='outlined' value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange} />

                            <FormHelperText error>
                                {errors.name ? errors.name : ''}
                            </FormHelperText>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                            <Button onClick={handleClose}>Hủy</Button>
                            <Button type={'submit'}>Thêm</Button>
                        </DialogActions>
                    </form>
                )}
            </Formik>

        </Dialog>

    );
};
export default AddCategory;
