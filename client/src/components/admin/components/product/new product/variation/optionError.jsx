import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
function OptionError({}){
  return (
<div className='flex flex-row gap-3 items-center justify-start p-3'>
                            <ErrorOutlinedIcon className='!fill-red-800'/>
                            <p className='text-red-800 text-sm'>Option Name must be between 1 and 20 characters.</p>
                        </div>
  )
};

export default OptionError
