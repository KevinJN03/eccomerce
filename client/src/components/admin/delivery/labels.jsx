
function Labels({format, setFormat}){
  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border border-dark-gray p-5">
    <h2 className="text-lg font-semibold">
        Downloading labels
    </h2>
    <p>Choose how to download and print your postage labels.</p>

    <section className="flex h-fit flex-nowrap gap-2">
        <div className="left flex h-full flex-1 flex-col gap-3">
            <h2 className="text-base font-semibold">Format</h2>
            <div className="flex flex-col gap-2">
                {[
                    { text: '1 label per page' },
                    { text: '2 label per page' },
                    { text: 'Label printers' },
                ].map(({ text }) => {
                    return (
                        <div
                            className="flex cursor-pointer flex-nowrap items-center gap-2"
                            onClick={() =>
                                setFormat(() => text)
                            }
                        >
                            <input
                                readOnly
                                checked={format === text}
                                type="radio"
                                className="daisy-radio daisy-radio-lg"
                                name="format"
                                key={text}
                            />
                            <p className="text-base">{text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
        <div className="right  flex h-full w-full flex-1 flex-col items-center gap-2">
            {format === 'Label printers' ? (
                <div className="right flex max-h-min min-h-[14.125rem] w-full  max-w-[10.938rem] flex-1 items-center justify-center rounded-md border-2 ">
                    <p className="font-gotham text-5xl font-bold text-black/50">
                        1
                    </p>
                </div>
            ) : (
                <div className=" flex h-full w-full flex-nowrap">
                    <div className="right flex h-[14.125rem] w-[10.938rem] flex-1 items-center justify-center border-2 border-r-0 ">
                        <p className="font-gotham text-5xl font-bold text-black/50">
                            1
                        </p>
                    </div>
                    <div className="h-full border-2 border-dashed " />
                    <div className="right flex h-[14.125rem] w-[10.938rem] flex-1 items-center justify-center border-2 border-l-0">
                        {format == '2 label per page' && (
                            <p className="font-gotham text-5xl font-bold text-black/50">
                                2
                            </p>
                        )}
                    </div>
                </div>
            )}

            <p className="text-sm">
                {format === 'Label printers'
                    ? '4 in x 6 in'
                    : '8.5 in x 11 in'}
            </p>
        </div>
    </section>
    <div className="flex flex-col gap-3">
        <h2 className="font-semibold">Order Details</h2>

        <div className="flex flex-nowrap gap-2">
            <input
                type="checkbox"
                className="daisy-checkbox daisy-checkbox-lg border-2 border-dark-gray"
            />
            <p className="text-base">
                When I print postage labels, include order
                details for my reference. These details will
                appear outside the label area.
            </p>
        </div>
    </div>
</div>
  )
};

export default Labels
