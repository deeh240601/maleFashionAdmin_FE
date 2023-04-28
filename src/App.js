import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
// defaultTheme
import themes from 'themes';


// project imports
import NavigationScroll from 'layout/NavigationScroll';
import RoutesStaff from './routes/RouteStaffRole';
import RoutesAdmin from './routes/RouteAdminRole';
import { ROLE } from './core/constant/role';
// ==============================|| APP ||============================== //

const App = () => {
    const appUI = useSelector((state) => state.appUI);
    const user = useSelector((state) => state.user);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(appUI)}>
                <CssBaseline />
                <NavigationScroll>
                    {user.role === ROLE.ADMIN ? <RoutesAdmin /> : <RoutesStaff />}
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>

    );
};

export default App;
