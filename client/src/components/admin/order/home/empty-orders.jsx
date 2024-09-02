import box_icon from '../../../assets/icons/box.png';
function EmptyOrders({}) {
    return (
        <section className=" flex h-2/4 w-full items-center justify-center">
            <section className="flex flex-col items-center justify-center gap-4">
                <div className="flex h-fit w-fit items-center justify-center rounded-full bg-light-grey p-5">
                    <img
                        src={box_icon}
                        alt="box outline icon"
                        className="h-20 w-20"
                    />
                </div>
                <p className="text-base font-semibold">
                    No orders here right now
                </p>
            </section>
        </section>
    );
}

export default EmptyOrders;
