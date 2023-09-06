import Rating from "./rating";
import Dropdown_Size from "./dropdown/dropdown_size";
import Input_S from "./input/input_s";
function Drawer({product}) {
    return (
        <>
        <input type="checkbox" id="drawer-right" className="drawer-toggle" />
<label className="overlay" htmlFor="drawer-right"></label>
<div className="drawer drawer-right max-w-lg md+lg:px-6 sm:w-[90vw] sm:place-items-center">
	<div className="drawer-content pt-10 flex flex-col h-full sm:px-0 sm:w-[80%] ">
        <div className="review-top-container ">
        <p className="pl-6 text-sm font-semibold absolute left-2 top-6">Write a review</p>  
        <label htmlFor="drawer-right" className="btn btn-sm btn-circle btn-ghost absolute right-6 top-4">✕</label>
        
        </div>
		
        <section id="review-container" className="flex flex-row gap-3 mb-4 mt-14">
            <div className="review-img-container w-24 h-36">
			<img src={product.image} className="w-full h-full object-contain"></img>
		</div>
        <div className="review-text-container">
        <p>{product.title}</p>
        {<Rating/>}
        </div>
        </section>
        <section id="rating-size-container">
            <div id="review-size-container" className="flex flex-col"> 
                 <Dropdown_Size title={"Size Purchased"} options={product.size}/>
        <Dropdown_Size title={"Your Usual Size"} options={product.size}/>
            </div>
       
        <div id="how-it-fit-wrrapper">
<p className="mt-2 text-sm font-medium">How did it fit?</p>
<div className="fit-btn-wrapper flex flex-row max-w-full md+lg:gap-3 sm:grid sm:grid-cols-3 sm:gap-1 mt-3">
    <button type="button" className="border-1 px-4  flex justify-center sm:text-xs whitespace-nowrap py-3 rounded-full font-semibold text-sm" >True to Size</button>
    <button type="button" className="border-1 px-4  flex justify-center sm:text-xs whitespace-nowrap py-3 rounded-full font-semibold text-sm" >Runs small</button>
    <button type="button" className="border-1 px-4  flex justify-center sm:text-xs whitespace-nowrap py-3 rounded-full font-semibold text-sm" >Runs Large</button>
</div>
        </div>
        <div id="give-review-container" className="flex flex-col gap-3 mt-5">
            {/* <input type="text"placeholder="Give your review a title" className="border-1 px-3 p-4 text-sm"></input> */}
            <Input_S placeholder={"Give your review a title"}/>
            <textarea type="text" placeholder="Write a short review" className="border-1 px-3 w-full pt-3 h-32 mb-3 resize-none text-s"></textarea>
        </div>
        <div id="submit-review" className="flex flex-col w-full gap-3 sm:mb-5">
        <p className="font-semibold text-sm">Submit review as</p>
        <Input_S placeholder={"Your name"}/>
        <Input_S placeholder={"Your email address"}/>
        <label htmlFor="drawer-right"id="submit-review-btn" className="bg-black text-white h-14 rounded-full mt-3 text-sm font-semibold flex items-center justify-center">
            Submit Review
        </label >
        </div>
        </section>
	</div>
</div>
            </>
    );
}

export default Drawer