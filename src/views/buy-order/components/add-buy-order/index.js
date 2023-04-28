import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { closeAddBuyOrder, setListSupplier, setLoading, setSupplierSelected } from '../../slice';
import {
    Divider,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
    Typography
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BuyOrderService from '../../../../services/buy-order.service';
import LoadingSpinner from '../../../../ui-component/loading';
import SupplierService from '../../../../services/supplier.service';
import { debounce } from 'lodash';
import ProductService from '../../../../services/product.service';
import Autocomplete from '@mui/material/Autocomplete';
import { capitalizeFirstLetter } from '../../../../core/utils/string-helper';
import StaffService from '../../../../services/staff.service';
import { notifyErrorMessage } from '../../../../core/utils/notify-action';

const AddBuyOrder = ({ saveCompleteEvent }) => {
    const [productCode, setProductCode] = useState();
    const [listProducts, setListProducts] = useState([]);
    const [productSelected, setProductSelected] = useState(null);
    const [productDetailSelected, setProductDetailSelected] = useState('');
    const [loadingProductSearch, setLoadingProductSearch] = useState(false);
    const [listDetails, setListDetails] = useState([]);
    const [total, setTotal] = useState(0);
    const [createdBy, setCreatedBy] = useState(null);
    const user = useSelector(state => state.user);
    const dateNow = new Date().toISOString().split('T')[0];
    const state = useSelector(state => state.buyOrder);
    const dispatch = useDispatch();
    const debounceProductCode = useCallback(
        debounce((nextValue) => setProductCode(capitalizeFirstLetter(nextValue)), 500), []);


    useEffect(() => {

        getSupplier();
        getStaffById();
    }, []);
    useEffect(() => {
        getProductLikeCode();
    }, [productCode]);
    const getSupplier = async () => {
        const data = await SupplierService.getAll();
        if (data) {
            dispatch(setListSupplier(data.result || []));
        }
    };

    const getStaffById = async () => {
        const data = await StaffService.getById(user.id);
        if (data.result) {
            setCreatedBy(data.result);
        }
    };
    const getProductLikeCode = async () => {
        if (productCode) {
            setLoadingProductSearch(true);
            const data = await ProductService.getLikeCode(productCode);
            if (data.result) {
                setListProducts(data.result || []);
                setLoadingProductSearch(false);
            }
        }
    };
    const getProductFull = async (value) => {
        if (value) {
            const code = value.split(' - ')[0];
            if (code) {
                const data = await ProductService.getByCode(code);
                if (data.result) {
                    setProductSelected(data.result || []);
                }
            }
        }

    };

    const handleClose = () => {
        dispatch(closeAddBuyOrder());
    };
    const handleAddBuyOrder = async (values) => {
        if (validateBuyOrder()) {
            const data = await BuyOrderService.create({ ...values, supplier: state.supplierSelected, listDetails });
            console.log({ ...values, supplier: state.supplierSelected, listDetails });
            if (data) {
                saveCompleteEvent();
                dispatch(closeAddBuyOrder());
            }
        }

    };

    const handleOnChangeCode = (e) => {
        const value = e.target.value;
        debounceProductCode(value);
    };
    const handleSelectProductDetail = (e) => {
        const value = e.target.value;
        setProductDetailSelected(value);
    };

    const handleAddDetail = () => {
        const productDetailToAdd = productSelected.listDetails.find(e => e._id === productDetailSelected);
        if (checkSameKey(productDetailToAdd)) {
            const listDetailsCreated = [...listDetails];
            const detail = {
                product: productSelected,
                productDetail: productDetailToAdd,
                quantity: 0,
                amount: 0,
                price: productDetailToAdd.importPrice
            };
            listDetailsCreated.push(detail);
            setListDetails(listDetailsCreated);

        }
    };

    const checkSameKey = (productDetailToAdd) => {
        const findResult = listDetails.find(e => e.productDetail._id === productDetailToAdd._id);
        if (findResult) {
            notifyErrorMessage('Sản phẩm đã tồn tại trong danh sách');
            return false;
        }
        return true;
    };

    const onChangeQuantiy = (index, value) => {
        const listDetailCreated = [...listDetails];
        listDetailCreated[index].quantity = Number(value);
        setListDetails(listDetailCreated);
        calculateTotal();
    };
    const onChangePrice = (index, value) => {
        const listDetailCreated = [...listDetails];
        listDetailCreated[index].price = Number(value);
        setListDetails(listDetailCreated);
        calculateTotal();
    };

    const calculateTotal = () => {
        let total = 0;
        listDetails.forEach(e => {
            total += e.price * e.quantity;
        });
        setTotal(total);
    };

    const validateBuyOrder = () => {
        let result = true;
        if (listDetails.length <= 0) {
            notifyErrorMessage(`Phải có tối thiểu một chi tiết`);
            result = false;
        }
        listDetails.forEach(e => {
            if (e.quantity <= 0) {
                notifyErrorMessage(`Sản phẩm có mã ${e.productDetail.code} chưa nhập số lượng`);
                result = false;
            }
            ;
        });
        return result;
    };
    return (

        <Dialog open={state.addBuyOrder} onClose={handleClose} maxWidth={'md'}>
            <Typography variant={'h3'} margin={2}>Thêm phiếu nhập</Typography>
            {state.loading ? <LoadingSpinner /> :
                <Formik
                    initialValues={{
                        code: `PN(${nanoid(7)})`,
                        description: `Nhập hàng ngày ${dateNow}`,
                        createdAt: dateNow,
                        createdBy: user.id

                    }}
                    validationSchema={Yup.object().shape({
                        code: Yup.string().max(255).required('Vui lòng nhập mã sản phẩm'),
                        description: Yup.string().max(255).required('Vui lòng nhập Diễn giải')
                    })}
                    onSubmit={handleAddBuyOrder}
                >
                    {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                        <form noValidate onSubmit={handleSubmit}>
                            <DialogContent>
                                <Grid container spacing={2}>

                                    <Grid item xs={4}>
                                        <FormControl fullWidth size='small' error={Boolean(touched.code && errors.code)}
                                        >
                                            <InputLabel htmlFor='product-code'>Code</InputLabel>
                                            <OutlinedInput
                                                id='product-code'
                                                type='text'
                                                value={values.code}
                                                name='code'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label='Code'

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
                                                value={createdBy ? createdBy.firstName + ' ' + createdBy.lastName : ''}
                                                label='Code'
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <FormControl disabled fullWidth size='small'
                                                     error={Boolean(touched.code && errors.code)}
                                        >
                                            <InputLabel htmlFor='product-code'>Ngày tạo</InputLabel>
                                            <OutlinedInput
                                                type='text'
                                                value={values.createdAt}
                                                name='createdAt'
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
                                                defaultValue={state.listSuppliers[0]._id}
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
                                                     error={Boolean(touched.description && errors.description)}
                                        >
                                            <InputLabel htmlFor='product-description'>Diễn giải</InputLabel>
                                            <OutlinedInput
                                                id='product-description'
                                                type='text'
                                                value={values.description}
                                                name='description'
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label='Diễn giải'
                                            />
                                        </FormControl>
                                    </Grid>


                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Autocomplete
                                            loading={loadingProductSearch}
                                            id='free-solo-demo'
                                            placeholder={'Nhập mã sản phẩm'}
                                            onInputChange={(e) => handleOnChangeCode(e)}
                                            onChange={(e, value) => getProductFull(value)}
                                            options={listProducts.map((option) => option.code + ' - ' + option.name.substring(0, 15) + '...')}
                                            renderInput={(params) => <TextField {...params} label='Nhập mã sản phẩm' />}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Select
                                            fullWidth
                                            labelId='demo-simple-select-label'
                                            value={productDetailSelected}
                                            defaultValue={''}
                                            onChange={(e) => handleSelectProductDetail(e)}
                                        >
                                            {productSelected ?
                                                productSelected.listDetails.map(e => {
                                                    return (
                                                        e ? <MenuItem key={e._id}
                                                                      value={e._id}>SKU: {e.code}</MenuItem> : ''
                                                    );
                                                })
                                                : ''}

                                        </Select>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button variant='contained' style={{ height: '100%' }} onClick={handleAddDetail}
                                                fullWidth>Thêm</Button>
                                    </Grid>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Typography variant={'h4'}> Chi tiết nhập hàng (Mã và tên sản phẩm, số lượng, giá
                                        nhập)</Typography>
                                </Grid>
                                <Grid container maxHeight={300} style={{ overflowY: 'scroll' }}>
                                    {listDetails.map((e, index) => {
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
                                                            onChange={evt => onChangeQuantiy(index, evt.target.value)}
                                                            value={e.quantity}

                                                        />
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <FormControl fullWidth size='small'>
                                                        <OutlinedInput
                                                            type='number'
                                                            onChange={evt => onChangePrice(index, evt.target.value)}
                                                            value={e.price}
                                                            endAdornment={<InputAdornment
                                                                position='end'>VNĐ</InputAdornment>}
                                                        />
                                                    </FormControl>
                                                </Grid>
                                            </Grid>);
                                    })}
                                    {listDetails.length > 0 ?
                                        <Grid container item marginTop={2}>
                                            <Grid item xs={8}>
                                            </Grid>
                                            <Grid item xs={4}>
                                                <Typography variant={'h4'} textAlign={'right'}>Tổng
                                                    cộng: {total} VNĐ</Typography>
                                            </Grid>
                                        </Grid>
                                        : ''}
                                </Grid>

                            </DialogContent>
                            <DialogActions sx={{ justifyContent: 'space-between', marginTop: 2 }}>
                                <Button onClick={handleClose}>Hủy</Button>
                                <Button type={'submit'}>Thêm</Button>
                            </DialogActions>
                        </form>
                    )}
                </Formik>
            }
        </Dialog>

    );
};
export default AddBuyOrder;
