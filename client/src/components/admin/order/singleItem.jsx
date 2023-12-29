function SingleItem({ itemObj }) {
    return (
        <div className="mt-2 flex flex-row gap-3 single-item border-black">
            <img
                className="h-20 w-20 rounded-md object-cover object-center"
                src="https://aws-glamo-upload-bucket.s3.eu-west-2.amazonaws.com/products/65678b9cd4593491cfa021c3/primary.png
"
                alt=""
            />
            <div className="product-order-info flex max-w-[400px] flex-col gap-[2px] ">
                <p >
                    {itemObj.product?.title}
                </p>

                <p className="!text-primary/80 mt-2">
                    Quantity <span className="font-semibold">{itemObj?.quantity}</span>
                </p>
               {itemObj.variation1?.title && <p className="!text-primary/80">
                    {itemObj.variation1?.title} <span>{itemObj.variation1?.variation}</span>
                </p>}
                {itemObj.variation2?.title && <p className="!text-primary/80">
                    {itemObj.variation2?.title} <span>{itemObj.variation2?.variation}</span>
                </p>}
            </div>
        </div>
    );
}

export default SingleItem;
