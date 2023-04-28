import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import Error from './Error';
import StaffRoutes from './StaffRoutes';


export default function RoutesStaff() {
    return useRoutes([StaffRoutes, AuthenticationRoutes, Error]);
}
