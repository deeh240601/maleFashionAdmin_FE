import * as React from 'react';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { closeViewBuyOrder, setSupplierSelected } from '../../slice';
import {
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from '@mui/material';
import LoadingSpinner from '../../../../ui-component/loading';
import BuyOrderService from '../../../../services/buy-order.service';

const ViewBuyOrder = () => {
    const [buyOrderFull, setBuyOrderFull] = useState({
        listDetails: []
    });
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const state = useSelector(state => state.buyOrder);
    const dispatch = useDispatch();

    useEffect(() => {
        getBuyOrderFull();
    }, [state.selected[0]]);

    const getBuyOrderFull = async () => {
        setLoading(true);
        if (state.selected[0]) {
            const data = await BuyOrderService.getById(state.selected[0]);
            if (data.result) {
                setBuyOrderFull(data.result);
                calculateTotal(data.result);
            }
        }
        setLoading(false);

    };
    const calculateTotal = (buyOrderFull) => {
        let total = 0;
        buyOrderFull.listDetails.forEach(e => {
            total += e.price * e.quantity;
        });
        setTotal(total);
    };

    const handleClose = () => {
        dispatch(closeViewBuyOrder());
    };


    return (
        <Dialog open={state.viewBuyOrder} onClose={handleClose} maxWidth={'md'}>
            <Typography variant={'h3'} margin={2}>Xem phiếu nhập</Typography>
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
                                        value={buyOrderFull.code}

                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl disabled fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-createdBy'>Người tạo</InputLabel>
                                    <OutlinedInput
                                        id='product-createdBy'
                                        type='text'
                                        label='Code'
                                        value={buyOrderFull.createdBy ? buyOrderFull.createdBy.firstName + ' ' + buyOrderFull.createdBy.lastName : ''}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl disabled fullWidth size='small'

                                >
                                    <InputLabel htmlFor='product-code'>Ngày tạo</InputLabel>
                                    <OutlinedInput
                                        type='text'
                                        name='createdAt'
                                        value={buyOrderFull.createdAt ? buyOrderFull.createdAt.split('T')[0] : ''}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={4}>
                                <FormControl size={'small'} fullWidth>
                                    <InputLabel id='product-supplier'>Nhà cung cấp</InputLabel>
                                    <Select
                                        id='product-supplier'
                                        onChange={(evt) => dispatch(setSupplierSelected(evt.target.value))}
                                        input={<OutlinedInput label='Nhà cung cấp' />}
                                        defaultValue={state.listSuppliers[0] ?state.listSuppliers[0]._id :null}
                                    >
                                        {state.listSuppliers.map((supplierItm) => (
                                            <MenuItem
                                                key={supplierItm._id}
                                                value={supplierItm._id}
                                            >
                                                {supplierItm.sortName + ' - ' + supplierItm.phone}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                        value={buyOrderFull.description}
                                    />
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                        </Grid>
                        <br />
                        <Grid container>
                            <Typography variant={'h4'}> Chi tiết nhập hàng (Mã và tên sản phẩm, số lượng, giá
                                nhập)</Typography>
                        </Grid>
                        <Grid container maxHeight={300} style={{ overflowY: 'scroll' }}>
                            {buyOrderFull.listDetails.map((e, index) => {
                                return (
                                    <Grid item container spacing={1} xs={12} marginTop={1}
                                          key={e.productDetail._id}>
                                        <Grid item xs={8}>
                                            <FormControl fullWidth size='small'>
                                                <OutlinedInput
                                                    type='text'
                                                    disabled
                                                    value={e.productDetail.code + '-' + e.product.name}
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
                            {buyOrderFull.listDetails.length > 0 ?
                                <Grid container item marginTop={2}>
                                    <Grid item xs={8}>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Typography variant={'h4'} textAlign={'right'}>Tổng
                                            cộng: {total}$</Typography>
                                    </Grid>
                                </Grid>
                                : ''}
                        </Grid>

                    </DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                        <Button onClick={handleClose}>Hủy</Button>
                    </DialogActions>
                </form>
            }
        </Dialog>

    );
};
export default ViewBuyOrder;
