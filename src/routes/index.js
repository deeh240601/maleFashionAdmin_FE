import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import Error from './Error';
import MainRoutes from './MainRoutes';


export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes, Error]);
}
