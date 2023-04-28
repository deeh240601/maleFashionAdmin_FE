import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeUpdateColor, setSelected } from '../../slice';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import ColorService from '../../../../services/color.service';

const UpdateColor = ({ saveCompleteEvent }) => {
    const state = useSelector(state => state.color);
    const [a, setA] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        getColorById();
    }, [state.selected[0]]);

    const getColorById = async () => {
        if (state.selected[0]) {
            const data = await ColorService.getById(state.selected[0]);
            setA(data.result);
        }

    };
    const handleClose = () => {
        dispatch(closeUpdateColor());
    };
    const handleUpdateColor = async (values) => {
        const data = await ColorService.update({ ...a, ...values });
        if (data) {
            saveCompleteEvent();
            dispatch(closeUpdateColor());
            dispatch(setSelected([]));
        }
    };
    if (a) {
        return (

            <Dialog open={state.updateColor} onClose={handleClose}>
                <Typography variant={'h3'} margin={2}>Cập nhật màu sắc</Typography>
                <Formik
                    initialValues={{
                        name: a.name,
                        code: a.code
                    }}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().max(255).required('Vui lòng nhập tên màu'),
                        code: Yup.string().max(255).required('Vui lòng chọn màu')
                    })}
                    onSubmit={handleUpdateColor}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <TextField name={'name'} label='Tên màu' variant='outlined' value={values.name}
                                           onBlur={handleBlur}
                                           onChange={handleChange} />
                                <TextField name={'code'} type={'color'} label='Mã' sx={{ width: 50 }}
                                           value={values.code}
                                           onBlur={handleBlur}
                                           onChange={handleChange} />
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
export default UpdateColor;
