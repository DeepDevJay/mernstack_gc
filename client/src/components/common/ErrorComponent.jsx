
import { Box, Typography } from '@mui/material';
import { useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
    const error = useRouteError();
    console.log(error);
    
    return (
        <Box style={{ marginLeft: 250 }} >
            <Typography variant='h4'>
                This Error is a Loading page Error
            </Typography>
        </Box>
    )
}

export default ErrorComponent;