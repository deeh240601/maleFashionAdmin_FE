import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddCustomer } from '../../slice';
import { Avatar, Grid, IconButton, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import CustomerService from '../../../../services/customer.service';
import { convertBase64 } from '../../../../core/utils/base64';
import { notifyErrorMessage } from '../../../../core/utils/notify-action';
import { PhotoCamera } from '@mui/icons-material';


const AddCustomer = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.customer);
    const [mainImage, setMainImage] = useState('');
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddCustomer());
    };
    const handleAddCustomer = async (values) => {
        const customer = {
            ...values,
            avatar: mainImage
        };
        const data = await CustomerService.create(customer);
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddCustomer());
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

        <Dialog open={state.addCustomer} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm khách hàng</Typography>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    phone: '',
                    birthday: '2014-02-09',
                    email: '',
                    address: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('Vui lòng nhập name'),
                    lastName: Yup.string().max(255).required('Vui lòng nhập tên'),
                    phone: Yup.string().max(255).required('Vui lòng nhập số điện thoại'),
                    birthday: Yup.date(),
                    email: Yup.string().max(255).required('Vui lòng nhập email'),
                    address: Yup.string().max(255).required('Vui lòng nhập địa chỉ'),
                    password: Yup.string()
                })}
                onSubmit={handleAddCustomer}
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
                                               value={values.firstName}
                                               onChange={handleChange}
                                               label='Tên'
                                               name='firstName'
                                               size='small'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.lastName}
                                               onChange={handleChange}
                                               label='Họ'
                                               name='lastName'
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
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.phone}
                                               onChange={handleChange}
                                               label='Số điện thoại'
                                               name='phone'
                                               size='small'
                                    />
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
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.birthday}
                                               onChange={handleChange}
                                               label='Ngày sinh'
                                               name='birthday'
                                               size='small'
                                               type={'date'}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.password}
                                               onChange={handleChange}
                                               label='Mật khẩu'
                                               name='password'
                                               size='small'
                                               type={'password'}
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
export default AddCustomer;
