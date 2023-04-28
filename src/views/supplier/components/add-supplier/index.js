import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddSupplier } from '../../slice';
import { Avatar, FormHelperText, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SupplierService from '../../../../services/supplier.service';
import { convertBase64 } from '../../../../core/utils/base64';
import { notifyErrorMessage } from '../../../../core/utils/notify-action';
import { PhotoCamera } from '@mui/icons-material';


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const AddSupplier = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.supplier);
    const [mainImage, setMainImage] = useState('');
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddSupplier());
    };
    const handleAddSupplier = async (values) => {
        const supplier = {
            ...values,
            avatar: mainImage
        };
        const data = await SupplierService.create(supplier);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddSupplier());
        }
    };
    const handleChangeMainImage = async (event) => {
        if (!validateSizeImage(event)) return;
        const base64 = await convertBase64(event.target.files[0]);
        setMainImage(base64);
    };
    const validateSizeImage = (event) => {
        if (event.target.files[0].size > 300000) {
            notifyErrorMessage('Dung lượng ảnh quá lớn');
            return false;
        }
        return true;
    };
    return (

        <Dialog open={state.addSupplier} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm Nhà cung cấp</Typography>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    address: ''
                }}
                validationSchema={Yup.object().shape({
                    lastName: Yup.string().max(255).required('Vui lòng nhập tên'),
                    phone: Yup.string().max(255).matches(phoneRegExp, 'Số điện thoại không hợp lệ').required('Vui lòng nhập số điện thoại'),
                    email: Yup.string().max(255).required('Vui lòng nhập email')
                })}
                onSubmit={handleAddSupplier}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid container item xs={12} justifyContent={'center'} alignItems={'center'}>

                                    <IconButton color='primary' aria-label='upload picture'
                                                component='label'>
                                        <input hidden accept='image/*'
                                               onChange={handleChangeMainImage}
                                               type='file' />
                                        <Avatar
                                            src={mainImage}
                                            style={{
                                                margin: '10px',
                                                width: '60px',
                                                height: '60px'
                                            }}
                                        />
                                        <PhotoCamera sx={{ position: 'absolute', bottom: '10px', right: '10px' }} />
                                    </IconButton>

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.lastName}
                                               onChange={handleChange}
                                               label='Tên'
                                               name='lastName'
                                               size='small'
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error>
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.firstName}
                                               onChange={handleChange}
                                               label='Họ'
                                               name='firstName'
                                               size='small'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.email}
                                               onChange={handleChange}
                                               label='Email'
                                               name='email'
                                               size='small'
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error>
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.phone}
                                               onChange={handleChange}
                                               label='Số điện thoại'
                                               name='phone'
                                               size='small'
                                               type='number'
                                    />
                                    {touched.phone && errors.phone && (
                                        <FormHelperText error>
                                            {errors.phone}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                               value={values.address}
                                               onChange={handleChange}
                                               label='Địa chỉ'
                                               name='address'
                                               size='small'
                                    />
                                </Grid>


                            </Grid>
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
export default AddSupplier;
