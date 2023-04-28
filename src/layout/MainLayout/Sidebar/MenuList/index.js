// material-ui
import { Typography } from '@mui/material';

// project imports
import NavGroup from './NavGroup';
import menuItem from 'menu-items';
import { useSelector } from 'react-redux';
import { ROLE } from '../../../../core/constant/role';

// ==============================|| SIDEBAR MENU LIST ||============================== //

const MenuList = () => {
    const role = useSelector(state => state.user.role);

    const navItems = menuItem.items.filter((item) => {
        if (role === ROLE.STAFF) {
            return item.id === 'license';
        } else {
            return true;
        }
    }).map((item) => {

        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant='h6' color='error' align='center'>
                        Menu Items Error
                    </Typography>
                );
        }
    });

    return <>{navItems}</>;
};

export default MenuList;
