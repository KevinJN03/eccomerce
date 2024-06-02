import { Backdrop } from '@mui/material';
import { withStyles } from '@mui/styles';

const StyledBackdrop = withStyles({
    root: {
        zIndex: 1200,
        // zIndex: (theme)=> console.log({theme})
    },
})(Backdrop);

export default StyledBackdrop;
