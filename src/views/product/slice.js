import { createSlice } from '@reduxjs/toolkit';
import { notifyErrorMessage } from '../../core/utils/notify-action';

const initialState = {
    order: 'asc',
    orderBy: 'name',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    products: [],
    addProduct: false,
    updateProduct: false,
    loading: false,

    productCurrent: {},

    listSizes: [],
    listColors: [],
    listSuppliers: [],
    listCategories: [],
    listColorsSelected: [],
    listSizesSelected: [],
    supplierSelected: null,
    categorySelected: null,
    mainImage: '',

    listProductDetail: [],

    productFullUpdate: {}

};

export const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        setOrder: (state, action) => {
            state.order = action.payload;
        },
        setOrderBy: (state, action) => {
            state.orderBy = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        setAddProduct: (state, action) => {
            state.addProduct = action.payload;
        },
        setUpdateProduct: (state, action) => {
            state.updateProduct = action.payload;
        },
        setListSize: (state, action) => {
            state.listSizes = action.payload;
        },
        setListColor: (state, action) => {
            state.listColors = action.payload;
        },
        setListSupplier: (state, action) => {
            state.listSuppliers = action.payload;
        },
        setListCategory: (state, action) => {
            state.listCategories = action.payload;
        },
        setSupplierSelected: (state, action) => {
            state.supplierSelected = action.payload;
        },
        setCategorySelected: (state, action) => {
            state.categorySelected = action.payload;
        },
        setListSizeSelected: (state, action) => {
            state.listSizesSelected = action.payload;
        },
        setListColorSelected: (state, action) => {
            state.listColorsSelected = action.payload;
        },
        setListProductDetail: (state, action) => {
            state.listProductDetail = action.payload;
        },
        setMainImage: (state, action) => {
            state.mainImage = action.payload;
        },
        generateProductDetail: (state) => {
            if (!state.listColorsSelected[0]) notifyErrorMessage('Sản phẩm phải có tối thiểu một màu');
            if (!state.listSizesSelected[0]) notifyErrorMessage('Sản phẩm phải có tối thiểu một size');
            if (state.listColorsSelected[0] && state.listSizesSelected[0]) {
                state.listProductDetail = [];
                state.listColorsSelected.forEach(color => {
                    state.listSizesSelected.forEach(size => {
                        state.listProductDetail.push({
                            id: color.name + size.name,
                            color, size,
                            stock: 1,
                            importPrice: 0,
                            exportPrice: 0,
                            salePrice: 0,
                            image: ''
                        });
                    });
                });
            } else {
                state.listProductDetail = [];
            }
        },
        setDataDetail: (state, action) => {
            const { event, detail, actionType } = action.payload;
            state.listProductDetail.forEach(item => {
                if (item.id === detail.id) {
                    switch (actionType) {
                        case 'stock':
                            item.stock = event.target.value;
                            break;
                        case 'importPrice':
                            item.importPrice = event.target.value;
                            break;
                        case 'exportPrice':
                            item.exportPrice = event.target.value;
                            break;
                        case 'salePrice':
                            item.salePrice = event.target.value;
                            break;
                        case 'image':
                            item.image = event;
                            break;

                    }
                    return false;
                }
            });
        },
        requestSort: (state, action) => {
            const property = action.payload;
            const isAsc = state.orderBy === property && state.order === 'asc';
            state.order = isAsc ? 'desc' : 'asc';
            state.orderBy = property;
        },
        showAddProduct: (state) => {
            state.listProductDetail = [];
            state.listColorsSelected = [];
            state.listSizesSelected = [];
            state.mainImage = '';
            state.addProduct = true;
        },
        closeAddProduct: (state) => {
            state.addProduct = false;
        },
        showUpdateProduct: (state) => {
            state.updateProduct = true;
        },
        closeUpdateProduct: (state) => {
            state.updateProduct = false;
        },
        deleteManySuccess: (state) => {
            state.products = state.products.filter(product => !state.selected.includes(product._id));
        },
        setProductFullUpdate: (state, action) => {
            state.productFullUpdate = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }


    }
});

// Action creators are generated for each case reducer function
export const {
    setOrder,
    setOrderBy,
    setSelected,
    setPage,
    setRowsPerPage,
    setProducts,
    setAddProduct,
    setUpdateProduct,
    requestSort,
    showAddProduct,
    closeAddProduct,
    showUpdateProduct,
    closeUpdateProduct,
    deleteManySuccess,
    setListSize,
    setListColor,
    setListSupplier,
    setListCategory,
    setListSizeSelected,
    setListColorSelected,
    setSupplierSelected,
    setCategorySelected,
    setListProductDetail,
    generateProductDetail,
    setMainImage,
    setDataDetail,
    setProductFullUpdate,
    setLoading
} = ProductSlice.actions;

export default ProductSlice.reducer;
