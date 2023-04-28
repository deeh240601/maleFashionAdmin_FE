import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddVoucher } from '../../slice';
import { FormHelperText, Grid, Tooltip, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import VoucherService from '../../../../services/voucher.service';

const AddVoucher = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.voucher);
    const user = useSelector(state => state.user);
    const dateNow = new Date().toISOString().split('T')[0];

    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(closeAddVoucher());
    };
    const handleAddVoucher = async (values) => {
        const data = await VoucherService.create({ ...values, createdBy: user.refId });
        if (data) {
            saveCompleteEvent();
            dispatch(closeAddVoucher());
        }
    };

    return (

        <Dialog open={state.addVoucher} onClose={handleClose}>
            <Typography variant={'h3'} margin={2}>Thêm voucher sản phẩm</Typography>
            <Formik
                initialValues={{
                    code: '',
                    description: '',
                    condition: 0,
                    percent: 0,
                    quantity: 0,
                    startDate: dateNow,
                    endDate: dateNow
                }}
                validationSchema={Yup.object().shape({
                    code: Yup.string().max(255).required('Vui lòng nhập tên voucher'),
                    description: Yup.string().required('Vui lòng nhập mô tả'),
                    condition: Yup.number().required('Điều kiện không được để trống'),
                    percent: Yup.number().required('vui lòng nhập phần trăm giảm'),
                    startDate: Yup.date().required('Vui lòng nhập ngày bắt đầu'),
                    endDate: Yup.date().required('Vui lòng nhập ngày kết thúc'),
                    quantity: Yup.number().required('Vui lòng số lượng phát hành')
                })}
                onSubmit={handleAddVoucher}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.code}
                                               onChange={handleChange}
                                               label='Mã khuyến mãi'
                                               name='code'
                                               size='small'
                                    />
                                    {touched.code && errors.code && (
                                        <FormHelperText error>
                                            {errors.code}
                                        </FormHelperText>
                                    )}

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.quantity}
                                               onChange={handleChange}
                                               label='Số lượng phát hành'
                                               name='quantity'
                                               size='small'
                                               type='number'
                                    />
                                    {touched.quantity && errors.quantity && (
                                        <FormHelperText error>
                                            {errors.quantity}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Tooltip title={'Tổng giá trị đơn hàng phải trên mức này'} placement='top'>
                                        <TextField fullWidth
                                                   value={values.condition}
                                                   onChange={handleChange}
                                                   label='Điều kiện'
                                                   name='condition'
                                                   size='small'
                                                   type='number'
                                        />
                                    </Tooltip>
                                    {touched.condition && errors.condition && (
                                        <FormHelperText error>
                                            {errors.condition}
                                        </FormHelperText>
                                    )}

                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.percent}
                                               onChange={handleChange}
                                               label='Phần trăm giảm'
                                               name='percent'
                                               size='small'
                                               type='number'
                                    />
                                    {touched.percent && errors.percent && (
                                        <FormHelperText error>
                                            {errors.percent}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.startDate}
                                               onChange={handleChange}
                                               label='Ngày bắt đầu'
                                               name='startDate'
                                               size='small'
                                               type={'date'}
                                    />
                                    {touched.startDate && errors.startDate && (
                                        <FormHelperText error>
                                            {errors.startDate}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth
                                               value={values.endDate}
                                               onChange={handleChange}
                                               label='Ngày kết thúc'
                                               name='endDate'
                                               size='small'
                                               type={'date'}
                                    />
                                    {touched.endDate && errors.endDate && (
                                        <FormHelperText error>
                                            {errors.endDate}
                                        </FormHelperText>
                                    )}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                               value={values.description}
                                               onChange={handleChange}
                                               multiline
                                               rows={4}
                                               label='Mô tả'
                                               name='description'
                                               size='small'
                                    />
                                    {touched.description && errors.description && (
                                        <FormHelperText error>
                                            {errors.description}
                                        </FormHelperText>
                                    )}
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
export default AddVoucher;
