import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export function Information({ msg, extraInfo }) {
    return (
        <div className="bottom flex flex-row gap-x-3 flex-wrap items-center">
            <span className="info-btn-wrapper h-8 w-8">
                <InfoOutlinedIcon style={{ fontSize: '24px' }} />
            </span>

    <p className="text-sm">{msg}</p>
            {extraInfo && (
                <p className={extraInfo['className']}>{extraInfo['msg']}</p>
            )}

            
        </div>
    );
}
