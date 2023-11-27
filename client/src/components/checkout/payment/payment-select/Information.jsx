import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export function Information({ msg, extraInfo }) {
    return (
        <div className="bottom flex flex-row gap-x-3">
            <span className="info-btn-wrapper h-8 w-8">
                <InfoOutlinedIcon style={{ fontSize: '24px' }} />
            </span>
<div className='flex flex-col gap-y-2'>
    <p className="text-sm">{msg}</p>
            {extraInfo && (
                <p className={extraInfo['className']}>{extraInfo['msg']}</p>
            )}
</div>
            
        </div>
    );
}
