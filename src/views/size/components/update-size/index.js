import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateSize, setSelected } from '../../slice';
import { FormHelperText, Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import SizeService from '../../../../services/size.service';

const UpdateSize = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.size);
    const [a, setA] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        getSizeById();
    }, [state.selected[0]]);
    const getSizeById = async () => {
        if (state.selected[0]) {
            const data = await SizeService.getById(state.selected[0]);
            setA(data.result);
        }

    };
    const handleClose = () => {
        dispatch(closeUpdateSize());
    };
    const handleUpdateSize = async (values) => {
        const data = await SizeService.update({ ...a, ...values });
        if (data) {
            saveCompleteEvent();
            dispatch(closeUpdateSize());
            dispatch(setSelected([]));
        }
    };
    if (a) {
        return (

            <Dialog open={state.updateSize} onClose={handleClose}>
                <Typography variant={'h3'} margin={2}>Cập nhật size sản phẩm</Typography>
                <Formik
                    initialValues={{
                        name: a.name
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Vui lòng nhập tên size')
                    })}
                    onSubmit={handleUpdateSize}
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
                                <Button type={'submit'}>Cập nhật</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>

            </Dialog>

        );
    }

};
export default UpdateSize;
