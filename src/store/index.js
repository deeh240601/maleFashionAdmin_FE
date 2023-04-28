import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import appUIReducer from './feature/AppUiSlice';
import userReducer from './feature/UserSlice';
import colorReducer from '../views/color/slice';
import categoryReducer from '../views/category/slice';
import sizeReducer from '../views/size/slice';
import productReducer from '../views/product/slice';
import customerReducer from '../views/customer/slice';
import supplierReducer from '../views/supplier/slice';
import voucherReducer from '../views/voucher/slice';
import staffReducer from '../views/staff/slice';
import buyOrderReducer from '../views/buy-order/slice';
import saleOrderReducer from '../views/sale-order/slice';


const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const rootReducer = combineReducers({
    appUI: appUIReducer,
    user: userReducer,
    color: colorReducer,
    category: categoryReducer,
    size: sizeReducer,
    product: productReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    voucher: voucherReducer,
    staff: staffReducer,
    buyOrder: buyOrderReducer,
    saleOrder: saleOrderReducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);

