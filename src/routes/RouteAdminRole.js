import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from './AuthenticationRoutes';
import Error from './Error';
import AdminRoutes from './AdminRoutes';
import StaffRoutes from './StaffRoutes';

export default function RoutesAdmin() {
    return useRoutes([AdminRoutes, StaffRoutes, AuthenticationRoutes, Error]);
}
