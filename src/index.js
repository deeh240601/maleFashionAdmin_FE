import { createRoot } from 'react-dom/client';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import App from 'App';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <BrowserRouter basename={config.basename}>
                <App />
            </BrowserRouter>
        </PersistGate>
        <Toaster containerClassName={'toast'} />
    </Provider>
);

