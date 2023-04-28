import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeViewSaleOrder } from '../../slice';
import { Divider, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, Typography } from '@mui/material';
import LoadingSpinner from '../../../../ui-component/loading';
import SaleOrderService from '../../../../services/sale-order.service';
import UpdateStatusSaleOrder from '../update-status-sale-order';

const ViewSaleOrder = ({saveComplete}) => {
    const [saleOrderFull, setSaleOrderFull] = useState({
        listDetails: []
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [showStatus, setShowStatus] = useState(true);
    const state = useSelector(state => state.saleOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        getSaleOrderFull();
    }, [state.selected[0]]);

    const getSaleOrderFull = async () => {
        setLoading(true);
        if (state.selected[0]) {
            const data = await SaleOrderService.getFullById(state.selected[0]);
            if (data.result) {
                setSaleOrderFull(data.result);
                console.log(data.result);
                calculateTotal(data.result);
            }
        }
        setLoading(false);

    };
    const calculateTotal = (saleOrderFull) => {
        let total = 0;
        saleOrderFull.listDetails.forEach(e => {
            total += e.price * e.quantity;
        });
        setTotal(total);
    };

    const handleClose = () => {
        dispatch(closeViewSaleOrder());
    };

    const closeUpdateStatus = () => {
        setShowStatus(false);
    }


    return (
        <Dialog open={state.viewSaleOrder} onClose={handleClose} maxWidth={'md'}>
            <Typography variant={'h3'} margin={2}>Xem đơn hàng</Typography>
            {loading ? <LoadingSpinner /> :
                <form noValidate>
                    <DialogContent>
                        <Grid container spacing={2}>

                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-code'>Code</InputLabel>
                                    <OutlinedInput
                                        id='product-code'
                                        type='text'
                                        label='Code'
                                        value={saleOrderFull.code}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-createdBy'>Người tạo</InputLabel>
                                    <OutlinedInput
                                        id='product-createdBy'
                                        type='text'
                                        label='Code'
                                        value={saleOrderFull.user ? saleOrderFull.user.firstName + ' ' + saleOrderFull.user.lastName : ''}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-code'>Ngày tạo</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        name='createdAt'
                                        value={saleOrderFull.createdAt ? saleOrderFull.createdAt.split('T')[0] : ''}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={4}>
                                <FormControl  fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-code'>Phương thức thanh toán</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        name='createdAt'
                                        label='Phương thức thanh toán'
                                        value={saleOrderFull.paymentMethod}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>Diễn giải</InputLabel>
                                    <OutlinedInput
                                        id='product-description'
                                        type='text'
                                        name='description'
                                        label='Diễn giải'
                                        value={saleOrderFull.description}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>Ghi chú của khách hàng</InputLabel>
                                    <OutlinedInput

                                        id='product-description'
                                        label='Ghi chú khách hàng'
                                        value={saleOrderFull.note}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <br />
                            <Grid item xs={12}>
                                <Typography variant={'h4'}> Thông tin người nhận</Typography>
                            </Grid>
                            <br />
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-description'>Họ tên</InputLabel>
                                    <OutlinedInput

                                        id='product-description'
                                        label='Tên'
                                        value={saleOrderFull.firstName + ' ' + saleOrderFull.lastName}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>SDT</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='Tên'
                                        value={saleOrderFull.phone}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>Email</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='Tên'
                                        value={saleOrderFull.email}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth size='small'
                                >
                                    <InputLabel htmlFor='product-phone'>Địa chỉ</InputLabel>
                                    <OutlinedInput

                                        id='product-phone'
                                        label='Địa chỉ'
                                        value={saleOrderFull.address}
                                    />
                                </FormControl>
                            </Grid>

                        </Grid>
                        <br/>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <br/>

                        <Grid container>
                            <Typography variant={'h4'} marginBottom={2}> Chi tiết nhập hàng (Mã và tên sản phẩm, số
                                lượng, giá
                                nhập)</Typography>
                        </Grid>
                        <Grid container maxHeight={300} style={{ overflowY: 'scroll' }}>
                            {saleOrderFull.listDetails.map((e, index) => {
                                return (
                                    <Grid item container spacing={1} xs={12} marginTop={1}
                                          key={e.productDetail._id}>
                                        <Grid item xs={8}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='text'

                                                    value={e.productDetail.code + ' - ' + e.product.name}
                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='number'
                                                    value={e.quantity}

                                                />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='number'
                                                    value={e.price}
                                                    endAdornment={<InputAdornment
                                                        position='end'>$</InputAdornment>}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>);
                            })}

                        </Grid>
                        {saleOrderFull.listDetails.length > 0 ?
                            <Grid container item marginTop={2}>
                                <Grid item xs={8}>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography variant={'h4'} textAlign={'right'}>Tổng
                                        cộng: {total}$</Typography>
                                </Grid>
                            </Grid>
                            : ''}

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between'}}>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button onClick={()=> setShowStatus(!showStatus)}>Cập nhật trạng thái</Button>
                    </DialogActions>
                    <UpdateStatusSaleOrder saleOrderFull={saleOrderFull} showStatus={showStatus} closeUpdateStatus={closeUpdateStatus} saveComplete={saveComplete}/>
                </form>
            }
        </Dialog>

    );
};
export default ViewSaleOrder;
