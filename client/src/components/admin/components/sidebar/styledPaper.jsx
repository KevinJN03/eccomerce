import { Backdrop, Paper } from '@mui/material';
import { withStyles } from '@mui/styles';

const StyledPaper = withStyles({
    root: {
        zIndex: 1200,
        // zIndex: (theme)=> console.log({theme})
        position: 'absolute',
        height: '100%',
        left: '0px',
        maxWidth: '31rem',
        width: '100%',
        borderRadius: '0px'
    },
})(Paper);

export default StyledPaper;
