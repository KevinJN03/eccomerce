import { useContent } from "../../../../../context/ContentContext";

function Delete({}) {

    const { setModalCheck} = useContent()
    return (
        <section className="w-full max-w-xs bg-white ">
            <div className="py-3 px-4 font-medium w-full bg-light-grey/50">

             <p>You are about to delete 1 listing</p></div>
           

            <p className="px-4 py-4">
                Keep in mind that deleted listings can’t be retrieved. If you’d
                like to keep a listing from being viewed publicly without
                deleting it permanently, please deactivate the listing instead.
                This will allow you to edit or reactivate it at any time.
            </p>

            <div className="flex flex-row gap-2 justify-end border-t border-dark-gray/50 py-2  px-4">
                <button onClick={()=> setModalCheck(()=> false)} type="button" className="border rounded font-medium text-xs py-2 px-3">Cancel</button>
                <button type="button" className="border border-black rounded font-medium text-xs py-2 px-3  bg-black text-white">Delete</button>{' '}
            </div>
        </section>
    );
}

export default Delete;
