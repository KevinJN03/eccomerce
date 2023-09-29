import { useVariation } from '../../../../../../context/variationContext';
import { useState } from 'react';
import Switch from './switch';
function VariationList({}) {
    const { variations } = useVariation();
    return (
        <section className="mt-12 flex basis-full flex-col">
            <section className="flex w-full flex-row justify-between">
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold tracking-wide">
                        {variations[0].name}
                    </h3>
                    <p>{`${variations.length} ${
                        variations.length > 1 ? 'variants' : 'variant'
                    }`}</p>
                </div>
                <span className="flex-no-wrap flex flex-row items-center gap-x-3 py-2">
                    <p>{1} selected</p>
                    <button type="button" className="theme-btn">
                        Update price
                    </button>
                    <button type="button" className="theme-btn">
                        Update Quantity
                    </button>
                </span>
            </section>

            {/* <div className="no-wrap my-5 flex w-full flex-row items-end gap-x-8 px-4 text-sm font-medium underline">
                <input type="checkbox" checked="checked" className="checkbox" />
                <h4>{variations[0].name}</h4>
                <h4>Price</h4>
                <h4>Quantity</h4>
                <h4 className="ml-auto">Visible</h4>
            </div> */}

            {/* <div className='flex flex-row items-center gap-3'>
            <input type="checkbox" checked="checked" className="checkbox" />
            <input type="text" placeholder="Type here" className="input w-full max-w-xs" />
            <input type="text" placeholder="Type here" className="input w-full max-w-xs" /> 
            </div> */}
            <table className="w-full">
                <tr className="">
                    <th>
                        <input
                            type="checkbox"
                            checked="checked"
                            className="checkbox"
                        />
                    </th>
                    <th>{variations[0].name}</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th className="text-right">Visible </th>
                </tr>
                {variations[0].options.map(({ variation }) => {
                    const [state, setState] = useState(true);
                    const [check, setCheck] = useState(false);
                    return (
                        <tr className="h-16">
                            <td className="">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    checked={check}
                                    onChange={() => setCheck(!check)}
                                />
                            </td>

                            <td className="pl-4">{variation}</td>
                            <td className="!relative ">
                            <span className="relative !left-5 !inset-0 !m-auto font-medium pound">
                                    £
                                </span>
                                <input
                                    type="text"
                                    className="input input-lg w-full max-w-[200px] rounded-lg price-input px-4"
                                />
                             
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="input  input-lg w-full max-w-[200px] rounded-lg"
                                />
                            </td>
                            <td className="flex !h-16 justify-end ">
                                <Switch state={state} setState={setState} />
                            </td>
                        </tr>
                    );
                })}
            </table>
        </section>
    );
}

export default VariationList;
