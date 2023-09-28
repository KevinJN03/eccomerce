import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
function OptionError({ msg }) {
    return (
        <div className="flex flex-row items-center justify-start gap-3 p-3">
            <ErrorOutlinedIcon className="!fill-red-800" />
            <p className="text-sm text-red-800">
                {msg || 'Option Name must be between 1 and 20 characters.'}
            </p>
        </div>
    );
}

export default OptionError;
