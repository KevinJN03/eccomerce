import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

export default function Arrow({show}) {
    return (
        <KeyboardArrowDownRoundedIcon
            className={` !text-[32px] ${show ? 'up-arrow' : 'down-arrow'}`}
        />
    );
}
