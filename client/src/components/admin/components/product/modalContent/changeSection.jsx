import { useContent } from "../../../../../context/ContentContext";

function ChangeSection({}) {

    const {setModalCheck} = useContent()
    return( <section className=" max-w-xs w-[20rem] flex flex-col bg-white ">
    <div className="py-3 px-4 font-medium w-full bg-light-grey/50">

     <p>Change section for 1 listing

</p></div>
   

    <div className="px-4 py-4 w-full gap-2 flex flex-col">
        <select name="change-section" id="change-section" className="daisy-select daisy-select-bordered daisy-select-sm w-full !rounded-sm">
<option value="" selected disabled>Select Section...</option>

        </select>

        <p className=" underline hover:opacity-80 cursor-pointer">
            Manage Sections
        </p>
    </div>

    <div className=" w-full flex flex-row gap-2 justify-end border-t border-dark-gray/50 py-2  px-4">
        <button onClick={()=> setModalCheck(()=> false)} type="button" className="border rounded font-medium text-xs py-2 px-3">Cancel</button>
        <button type="button" className="border border-black rounded font-medium text-xs py-2 px-3  bg-black text-white">Delete</button>{' '}
    </div>
</section>)
}

export default ChangeSection;
