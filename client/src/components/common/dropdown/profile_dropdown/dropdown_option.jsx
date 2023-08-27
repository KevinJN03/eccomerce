
function Dropdown_Option({option}){
  return (
    <span className="dropdown-item px-3 w-full h-12 my-3 flex  flex-row justify-start gap-3 items-center"
    tabIndex="-1"
            >
              <img src={option.src} className="h-full object-cover"/> 
              <p className="text-s">{option.text}</p>  
            </span>
  )
};

export default Dropdown_Option
