import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddSize } from '../../slice';
import { FormHelperText, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SizeService from '../../../../services/size.service';

const AddSize = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.size);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddSize());
    };
    const handleAddSize = async (values) => {
        const data = await SizeService.create(values);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddSize());
        }
    };

    return (

        <Dialog open={state.addSize} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm size sản phẩm</Typography>
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Vui lòng nhập tên size')
                })}
                onSubmit={handleAddSize}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField name={'name'} label='Tên size' variant='outlined' value={values.name}
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
export default AddSize;
