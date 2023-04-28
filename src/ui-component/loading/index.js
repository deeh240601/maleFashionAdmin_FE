import { CircularProgress, Grid } from '@mui/material';

const LoadingSpinner = () => {
    return (
        <Grid container justifyContent={'center'} alignItems={'center'} minHeight={'100px'} minWidth={'200px'}>
            <CircularProgress />
        </Grid>
    );
};
export default LoadingSpinner;
