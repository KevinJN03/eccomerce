import { CloseRounded } from '@mui/icons-material';
import { Box } from '@mui/material';
function BoxWithProps({ children }) {
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                maxWidth: '37.5rem',
            }}
        >
            {children}
        </Box>
    );
}

export function CloseModalButton({ handleClick }) {
    return (
        <div
            className="absolute right-[-4rem] cursor-pointer rounded-full bg-white/20 p-2 transition-all hover:shadow-normal"
            onClick={handleClick}
        >
            <CloseRounded className="!fill-white" sx={{ fontSize: '2rem' }} />
        </div>
    );
}

export default BoxWithProps;
