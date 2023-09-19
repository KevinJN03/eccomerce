import { useContent } from "../../../../../../context/ContentContext";
import Input from "../input";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function New({profile, setContent, MainContent}) {

    const {content, dispatch} = useContent()

    const back = () => {
        dispatch({type: 'Main'})
    }
    return (
        <section className="new-delivery flex flex-col gap-3 w-full">
            <span  className="self-end mb-2 bg-slate-100 rounded-full p-1 flex justify-center items-center hover:bg-slate-300" onClick={back}> <CloseRoundedIcon/> </span>
                 <h3 className="text-center font-gotham text-lg">CREATE A DELIVERY PROFILE</h3>
<input className="font-poppins text-sm w-full p-2 font-light border-1 border-black" type='text' placeholder="Name Your Delivery Profile" defaultValue={profile ? profile.name : ''}/>
                <button onClick={back }>
                    Save
                </button>
       
        </section>
    );
}

export default New;
