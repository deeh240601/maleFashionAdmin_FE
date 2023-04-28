import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


const Notfound = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate('/');
    };
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: '#f3f2ee'
            }}
        >

            <Grid>
                <Grid marginBottom={'30px'}>
                    <Typography variant='h1' align={'center'} style={{ color: 'black' }}>
                        404
                    </Typography>
                </Grid>
                <Grid>
                    <Button onClick={navigateHandler} variant='outlined'>Back to home</Button>
                </Grid>
            </Grid>

        </Box>
    );
};
export default Notfound;
