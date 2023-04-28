import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddColor } from '../../slice';
import { FormHelperText, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ColorService from '../../../../services/color.service';

const AddColor = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.color);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddColor());
    };
    const handleAddColor = async (values) => {
        const data = await ColorService.create(values);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddColor());
        }
    };

    return (

        <Dialog open={state.addColor} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm màu sắc</Typography>
            <Formik
                initialValues={{
                    name: '',
                    code: ''
                }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Vui lòng nhập tên màu'),
                    code: Yup.string().max(255).required('Vui lòng chọn màu')
                })}
                onSubmit={handleAddColor}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <TextField name={'name'} label='Tên màu' variant='outlined' value={values.name}
                                       onBlur={handleBlur}
                                       onChange={handleChange} />
                            <TextField name={'code'} type={'color'} label='Mã' sx={{ width: 50 }} value={values.code}
                                       onBlur={handleBlur}
                                       onChange={handleChange} />
                            <FormHelperText error>
                                {errors.name ? errors.name : errors.code}
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
export default AddColor;
