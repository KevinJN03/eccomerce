import { useEffect, useRef, useState } from 'react';
import { adminAxios } from '../../../../api/axios';
import Template from './template';
import { useContent } from '../../../../context/ContentContext';
import UserLogout from '../../../../hooks/userLogout';
import { isEmpty } from 'lodash';
function TitleDescriptionTemplate({ property, textbox }) {
    const [sampleText, setSampleText] = useState('12344');
    const [select, setSelect] = useState('add_to_front');
    const { modalContent } = useContent();
    const [products, setProducts] = useState([]);

    const { logoutUser } = UserLogout();
    const [loading, setLoading] = useState(false);
    const [deleteInstance, setDeleteInstance] = useState(false);
    const [defaultText, setDefaultText] = useState('');

    const [text, setText] = useState({
        add_to_front: '',
        add_to_end: '',
        delete: '',
        reset: '',
        find_and_replace: {
            find: '',
            replace: '',
            replaceAll: false,
            caseSensitive: false,
        },
    });
    const abortControllerRef = useRef(new AbortController());

    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await adminAxios.get(
                    `product/${modalContent?.products}`
                );
                setProducts(() => data);

                if (property == 'detail') {
                    const newString = data[0]?.detail.join('\r\n');
                    setDefaultText(() => newString);
                    setSampleText(() => newString);
                } else {
                    setDefaultText(() => data[0]?.[property]);
                    setSampleText(() => data[0]?.[property]);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleText = ({ e, onChange }) => {
        if (onChange) {
            setText((prevState) => ({
                ...prevState,
                [select]: e.target.value,
            }));
        }

        if (select == 'add_to_front') {
            setSampleText(
                () => (onChange ? e.target.value : text?.[select]) + defaultText
            );
        }

        if (select == 'add_to_end') {
            setSampleText(
                () => defaultText + (onChange ? e.target.value : text?.[select])
            );
        }

        if (select == 'reset') {
            setSampleText(() =>
                onChange ? e.target.value : text?.[select] || defaultText
            );
        }

        if (select == 'delete') {
            let newSampleText = null;
            if (deleteInstance) {
                newSampleText = defaultText.replaceAll(
                    onChange ? e.target.value : text?.[select],
                    ''
                );
            } else {
                newSampleText = defaultText.replace(
                    onChange ? e.target.value : text?.[select],
                    ''
                );
            }

            setSampleText(() => newSampleText);
        }
    };

    const handleFindReplace = ({ find, replace }) => {
        console.log({ find, replace });
        if (!find || !replace) {
            setSampleText(() => defaultText);
            return;
        }

        let newSampleText = null;

        if (text['find_and_replace']?.replaceAll) {
            newSampleText = defaultText.replaceAll(find, replace);
        } else {
            newSampleText = defaultText.replace(find, replace);
        }

        setSampleText(() => newSampleText);
    };

    useEffect(() => {
        setSampleText(() => defaultText);

        if (select == 'find_and_replace') {
            handleFindReplace({
                ...text['find_and_replace'],
            });
        } else {
            handleText({ onChange: false });
            // setSampleText(() => defaultText);
        }
    }, [select]);

    const handleClick = async () => {
        try {
            abortControllerRef.current?.abort;
            abortControllerRef.current = new AbortController();
            setLoading(() => true);

            await adminAxios.post(
                '/product/title/update',
                {
                    selectedOption: select,
                    productIds: modalContent?.products,
                    optionData: text[select],
                },
                { signal: abortControllerRef.current?.signal }
            );
        } catch (error) {
            logoutUser({ error });
        } finally {
            setLoading(() => false);
        }
    };
    return (
        <Template
            title={`Editing ${property} for ${modalContent.products?.length} listing`}
            submit={{
                loading,
                handleClick,
                disabled:
                    select == 'find_and_replace'
                        ? isEmpty(text['find_and_replace']?.find) ||
                          isEmpty(text['find_and_replace']?.replace)
                        : isEmpty(text[select]),
            }}
        >
            <section className="flex flex-col gap-2 border-b py-3">
                <section
                    className={`flex w-full gap-5 ${
                        textbox && select == 'find_and_replace'
                            ? 'flex-col'
                            : 'flex-row'
                    }`}
                >
                    <div className="left w-full flex-1">
                        <select
                            onChange={(e) => setSelect(e.target.value)}
                            className="daisy-select daisy-select-bordered daisy-select-xs h-8 w-full max-w-40 rounded-sm"
                        >
                            {[
                                'Add to front',
                                'Add to end',
                                'Find and replace',
                                'Delete',
                                // 'Reset title',
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
                            <option
                                key={'reset'}
                                selected={select == 'reset'}
                                value={'reset'}
                            >
                                Reset {property}
                            </option>
                        </select>
                    </div>
                    <div className="right w-full flex-[2]">
                        {select == 'find_and_replace' ? (
                            <section
                                className={`flex flex-col flex-wrap gap-2`}
                            >
                                <section
                                    className={` flex !h-0 basis-full gap-2 ${
                                        textbox ? 'flex-row' : 'flex-col'
                                    }`}
                                >
                                    <div
                                        className={`left flex flex-1 ${
                                            textbox
                                                ? 'flex-col items-start'
                                                : 'flex-row items-center'
                                        } flex-nowrap  gap-2`}
                                    >
                                        <p className="flex-1 whitespace-nowrap">
                                            Find:{' '}
                                        </p>
                                        {textbox ? (
                                            <textarea
                                                className="daisy-textarea daisy-textarea-bordered w-full rounded-sm p-2"
                                                onChange={(e) => {
                                                    setText((prevState) => ({
                                                        ...prevState,
                                                        find_and_replace: {
                                                            ...prevState[
                                                                'find_and_replace'
                                                            ],
                                                            find: e.target
                                                                .value,
                                                        },
                                                    }));

                                                    handleFindReplace({
                                                        find: e.target.value,
                                                        replace:
                                                            text[
                                                                'find_and_replace'
                                                            ]?.replace,
                                                    });
                                                }}
                                                value={
                                                    text['find_and_replace']
                                                        ?.find
                                                }
                                            />
                                        ) : (
                                            <input
                                                onChange={(e) => {
                                                    setText((prevState) => ({
                                                        ...prevState,
                                                        find_and_replace: {
                                                            ...prevState[
                                                                'find_and_replace'
                                                            ],
                                                            find: e.target
                                                                .value,
                                                        },
                                                    }));

                                                    handleFindReplace({
                                                        find: e.target.value,
                                                        replace:
                                                            text[
                                                                'find_and_replace'
                                                            ]?.replace,
                                                    });
                                                }}
                                                value={
                                                    text['find_and_replace']
                                                        ?.find
                                                }
                                                type="text"
                                                className="h-8 w-full flex-[2] rounded-sm border border-dark-gray/50 p-2 text-xs"
                                            />
                                        )}
                                    </div>

                                    <div
                                        className={`left flex flex-1 ${
                                            textbox
                                                ? 'flex-col items-start'
                                                : 'flex-row items-center'
                                        } flex-nowrap  gap-2`}
                                    >
                                        <p className="flex-1 whitespace-nowrap">
                                            Replace with:{' '}
                                        </p>

                                        {textbox ? (
                                            <textarea
                                                className="daisy-textarea daisy-textarea-bordered w-full rounded-sm p-2"
                                                onChange={(e) => {
                                                    setText((prevState) => ({
                                                        ...prevState,
                                                        find_and_replace: {
                                                            ...prevState[
                                                                'find_and_replace'
                                                            ],
                                                            replace:
                                                                e.target.value,
                                                        },
                                                    }));

                                                    handleFindReplace({
                                                        find: text[
                                                            'find_and_replace'
                                                        ]?.find,
                                                        replace: e.target.value,
                                                    });
                                                }}
                                                value={
                                                    text['find_and_replace']
                                                        ?.replace
                                                }
                                            />
                                        ) : (
                                            <input
                                                onChange={(e) => {
                                                    setText((prevState) => ({
                                                        ...prevState,
                                                        find_and_replace: {
                                                            ...prevState[
                                                                'find_and_replace'
                                                            ],
                                                            replace:
                                                                e.target.value,
                                                        },
                                                    }));

                                                    handleFindReplace({
                                                        find: text[
                                                            'find_and_replace'
                                                        ]?.find,
                                                        replace: e.target.value,
                                                    });
                                                }}
                                                value={
                                                    text['find_and_replace']
                                                        ?.replace
                                                }
                                                type="text"
                                                className="h-8 w-full flex-[2] rounded-sm border border-dark-gray/50 p-2 text-xs"
                                            />
                                        )}
                                    </div>
                                </section>

                                <section className="mt-1 flex flex-nowrap justify-end gap-3">
                                    {[
                                        {
                                            label: 'Replace all',
                                            property: 'replaceAll',
                                        },
                                        {
                                            label: 'Case sensitive',
                                            property: 'caseSensitive',
                                        },
                                    ].map(({ label, property }) => {
                                        return (
                                            <div
                                                key={label}
                                                className="flex flex-row gap-2"
                                                onClick={() => {
                                                    setText((prevState) => ({
                                                        ...prevState,
                                                        find_and_replace: {
                                                            ...prevState.find_and_replace,
                                                            [property]:
                                                                !prevState
                                                                    .find_and_replace[
                                                                    property
                                                                ],
                                                        },
                                                    }));
                                                }}
                                            >
                                                <input
                                                    readOnly
                                                    value={
                                                        text[
                                                            'find_and_replace'
                                                        ][property]
                                                    }
                                                    type="checkbox"
                                                    name="replace-all"
                                                    id="replace-all"
                                                    className="daisy-checkbox daisy-checkbox-xs rounded-sm border-black"
                                                />
                                                <p className="text-xs">
                                                    {label}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </section>
                            </section>
                        ) : (
                            <>
                                {textbox ? (
                                    <textarea
                                        onChange={(e) =>
                                            handleText({ e, onChange: true })
                                        }
                                        className="daisy-textarea daisy-textarea-bordered w-full rounded-sm p-2"
                                        value={text?.[select]}
                                        type="text"
                                    />
                                ) : (
                                    <input
                                        onChange={(e) =>
                                            handleText({ e, onChange: true })
                                        }
                                        value={text?.[select]}
                                        type="text"
                                        className="h-8 w-full rounded-sm border border-dark-gray/50 p-2 text-xs"
                                    />
                                )}
                            </>
                        )}
                    </div>
                </section>
                {select == 'delete' && (
                    <div
                        onClick={() => {
                            setDeleteInstance((prevState) => !prevState);
                            let newSampleText = null;
                            if (!deleteInstance) {
                                newSampleText = defaultText.replaceAll(
                                    text,
                                    ''
                                );
                            } else {
                                newSampleText = defaultText.replace(text, '');
                            }
                            setSampleText(() => newSampleText);
                        }}
                        className="flex flex-row flex-nowrap items-center gap-2 self-end"
                    >
                        <input
                            checked={deleteInstance}
                            readOnly
                            type="checkbox"
                            className="daisy-checkbox daisy-checkbox-xs  rounded-sm border-black"
                        />
                        <p className="inline text-xs">Delete all instances</p>
                    </div>
                )}

                <p className="text-xxs text-black/80">
                    Pro tip: Don't forget to include spaces between new and
                    existing text
                </p>
            </section>
            <section className="w-full py-3">
                <p className="mb-3 font-medium text-black/70">Sample update</p>
                <section className="sample flex w-full max-w-full flex-row flex-nowrap items-center gap-3 rounded-sm bg-light-grey/60 p-2 pr-5">
                    <div className="left min-h-16 h-16 max-h-16 w-16 min-w-16 max-w-16 rounded-sm">
                        <img
                            src={products[0]?.images[0]}
                            alt=""
                            className="h-full w-full rounded-inherit object-cover"
                        />
                    </div>

                    <p className="whitespace-pre-line break-all text-xs">
                        {sampleText}
                    </p>
                </section>
            </section>
        </Template>
    );
}

export default TitleDescriptionTemplate;
