import Template from './template';
import emoji from '../../assets/animated-images/wired-flat-262-emoji-wow.apng';
function ErrorTemplate({}) {
    return (
        <Template>
            <section className="mt-4 flex w-full flex-col items-center justify-center gap-6">
                <img src={emoji} alt="emoji icon" className="h-44 w-44" />
                <h3 className=" font-gotham text-3xl">NOT FOUND!</h3>
                <p className="text-sm">
                    Sorry! We're having difficulties and can't find the page
                    you're looking for. You can continue or return to your bag.
                </p>
                <div className=" flex flex-row gap-2 ">
                    <button className="!bg-primary px-20 py-3 font-gotham tracking-wider text-white hover:!bg-black">
                        HOME
                    </button>
                    <button className="!bg-primary px-20 py-3 font-gotham tracking-wider text-white hover:!bg-black">
                        MY BAG
                    </button>
                </div>
            </section>
        </Template>
    );
}

export default ErrorTemplate;
