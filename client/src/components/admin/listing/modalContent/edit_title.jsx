import { useEffect, useState } from 'react';
import Template from './template';
import { useContent } from '../../../../context/ContentContext';
import { adminAxios } from '../../../../api/axios';

function Edit_Title({}) {
    const [text, setText] = useState('');
    const [sampleText, setSampleText] = useState('12344');
    const [select, setSelect] = useState('add_to_front');
    const { modalContent } = useContent();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await adminAxios.get(
                    `product/${
                        modalContent?.products || ['65ace5838f9aa588e0e6d225']
                    }`
                );
                setProducts(() => data);

                setSampleText(() => data[0]?.title);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setSampleText(() => products[0]?.title);
    }, [select]);

    const handleText = (e) => {
        setText(() => e.target.value);

        if (select == 'add_to_front') {
            setSampleText(() => e.target.value + products[0]?.title);
        }

        if (select == 'add_to_back') {
            setSampleText(() => products[0]?.title + e.target.value);
        }

        if(select == 'reset_title') {
            setSampleText(() => e.target.value)
        }

        if(select == 'delete') {
            
        }
    };
    return (
        <Template
            title={`Editing title for ${modalContent.products?.length} listing`}
        >
            <section className="flex flex-col gap-2 border-b py-3">
                <section className="flex w-full flex-row flex-nowrap items-center gap-3 ">
                    <div className="left w-full flex-1">
                        <select
                            onChange={(e) => setSelect(e.target.value)}
                            className="daisy-select daisy-select-bordered daisy-select-xs h-8 w-full rounded-sm"
                        >
                            {[
                                'Add to front',
                                'Add to Back',
                                'Find and replace',
                                'Delete',
                                'Reset title',
                            ].map((value) => {
                                const newValue = value
                                    .toLowerCase()
                                    .replaceAll(' ', '_');
                                return (
                                    <option
                                        key={newValue}
                                        selected={newValue == select}
                                        value={newValue}
                                    >
                                        {value}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="right w-full flex-[2]">
                        <input
                            onChange={handleText}
                            value={text}
                            type="text"
                            className="h-8 w-full rounded-sm border border-dark-gray/50 p-2 text-xs"
                        />
                    </div>
                </section>

                <p className="text-xxs text-black/80">
                    Pro tip: Don't forget to include spaces between new and
                    existing text
                </p>
            </section>
            <section className="py-3">
                <p className="mb-3 font-medium text-black/70">Sample update</p>
                <section className="sample flex w-full flex-row flex-nowrap items-center gap-3 rounded-sm bg-light-grey/60 p-2 pr-5">
                    <div className="left h-16 w-16 rounded-sm">
                        <img
                            src={products[0]?.images[0]}
                            alt=""
                            className="h-full w-full rounded-inherit object-cover"
                        />
                    </div>
                    <div className="right">
                        <p className="text-xs">{sampleText}</p>
                    </div>
                </section>
            </section>
        </Template>
    );
}

export default Edit_Title;
