import { useEffect, useRef, useState } from 'react';
import { useContent } from '../../../../context/ContentContext';
import Template from './template';
import { adminAxios } from '../../../../api/axios';
import UserLogout from '../../../../hooks/userLogout';
import {
    ArrowBackIosNewRounded,
    CloseRounded,
    Edit,
    OpenWith,
} from '@mui/icons-material';
import { Draggable, Droppable, DragDropContext } from 'react-beautiful-dnd';

import _, { isEmpty } from 'lodash';
import { handleTimeout } from './handleTimeout';
function ChangeSection({}) {
    const { setModalCheck, modalContent, setShowAlert } = useContent();
    const [categoryArray, setCategories] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);

    const [loading, setLoading] = useState(true);
    const { logoutUser } = UserLogout();
    const [content, setContent] = useState('main');
    const [select, setSelect] = useState('');
    const [placeholderProps, setPlaceholderProps] = useState({});
    const [productData, setProductData] = useState({});
    const [text, setText] = useState('');
    const queryAttr = 'data-rbd-drag-handle-draggable-id';

    const abortControllerRef = useRef(new AbortController());
    useEffect(() => {
        const fetchData = async () => {
            try {
                abortControllerRef.current?.abort();
                abortControllerRef.current = new AbortController();
                const [{ value: categoryData }, { value: productResult }] =
                    await Promise.allSettled([
                        adminAxios.get('category/all', {
                            signal: abortControllerRef.current?.signal,
                        }),
                        adminAxios.get(`product/${modalContent?.productIds}`, {
                            signal: abortControllerRef.current?.signal,
                        }),
                    ]);

                setCategories(() =>
                    categoryData.data?.map(({ _id, name, count }) => ({
                        _id,
                        name,
                        count,
                    }))
                );

                if (productResult) {
                    setSelect(() =>
                        productResult.data?.every(
                            ({ category }) =>
                                category?._id ==
                                _.get(productResult, 'data[0].category._id')
                        )
                            ? _.get(productResult, 'data[0].category._id')
                            : ''
                    );
                }
            } catch (error) {
                console.error(error);

                logoutUser({ error });
            } finally {
                setTimeout(() => {
                    setLoading(() => false);
                }, 400);
            }
        };
        fetchData();

        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const getDraggedDom = (draggableId) => {
        const domQuery = `[${queryAttr}='${draggableId}']`;
        const draggedDOM = document.querySelector(domQuery);

        return draggedDOM;
    };

    const handleDragEnd = (result) => {
        const newCategoryArray = Array.from(categoryArray);
        if (!result?.destination || !result?.source) return;

        const [reorderedItem] = newCategoryArray.splice(result.source.index, 1);
        newCategoryArray.splice(result.destination.index, 0, reorderedItem);
        setCategories(() => newCategoryArray);
    };

    const handleApply = async () => {
        let success = false;
        let count = null;
        try {
            setBtnLoading(() => true);

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            const { data } = await adminAxios.put(
                '/product/category/update',
                {
                    ids: modalContent.productIds,
                    category: select,
                },
                { signal: abortControllerRef.current?.signal }
            );
            count = data?.total;
            success = true;
        } catch (error) {
            logoutUser({ error });
        } finally {
            handleTimeout({
                setBtnLoading,
                setLoading,
                success,
                count,
                setModalCheck,
                handleFunc: () => {
                    if (modalContent?.clearSelection) {
                        modalContent?.clearSelection();
                    }
                },
                setShowAlert,
                msg: 'Oh dear! Something went wrong - please try again.',
            });
        }
    };

    return (
        <Template
            loading={loading}
            submit={{
                text: 'Apply',
                loading: btnLoading,
                handleClick: handleApply,
            }}
            headerChildren={
                {
                    edit: true,
                    manage: true,
                    new: true,
                }?.[content] ? (
                    <div className="flex items-center gap-8">
                        <button
                            type="button"
                            onClick={() => {
                                if (content == 'edit' || content == 'new') {
                                    setContent(() => 'manage');
                                } else {
                                    setContent(() => 'main');
                                }
                            }}
                        >
                            <ArrowBackIosNewRounded />
                        </button>

                        {content == 'edit' && (
                            <p className="text-sm font-medium">
                                Edit "{`${text}`}"
                            </p>
                        )}
                        {content == 'new' && (
                            <p className="text-sm font-medium">New Section</p>
                        )}
                        {content == 'manage' && (
                            <p className="font-semibold tracking-wide">
                                Manage sections
                            </p>
                        )}
                        <div className="w-full flex-1 !self-end !text-right">
                            <button onClick={() => setModalCheck(false)}>
                                <CloseRounded className="" />
                            </button>
                        </div>
                    </div>
                ) : null
            }
            footerChildren={
                content == 'edit' ? (
                    <>
                        <button
                            type="button"
                            className="text-xs font-medium underline"
                        >
                            Delete section
                        </button>
                        <button
                            type="button"
                            className="rounded-sm border border-black bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-70"
                        >
                            Save changes
                        </button>
                    </>
                ) : content == 'manage' ? (
                    <>
                        <button
                            onClick={() => {
                                setContent(() => 'new');

                                setText(() => '');
                            }}
                            type="button"
                            className="rounded-sm border border-black bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-70"
                        >
                            Add section
                        </button>
                    </>
                ) : content == 'new' ? (
                    <>
                        {' '}
                        <button
                            onClick={() => {
                                setContent(() => 'new');

                                setText(() => '');
                            }}
                            type="button"
                            className="rounded-sm border border-black bg-black px-3 py-2 text-xs font-semibold text-white hover:opacity-70"
                        >
                            Save
                        </button>
                    </>
                ) : null
            }
            small={true}
            title={`Change section for ${modalContent.productIds?.length} listing`}
        >
            {content == 'main' && (
                <div className="mb-12 flex w-full flex-col gap-2">
                    <select
                        onChange={(e) => setSelect(() => e.target.value)}
                        name="change-section"
                        id="change-section"
                        className="daisy-select daisy-select-bordered w-full !rounded-sm"
                    >
                        <option value="" selected disabled>
                            Select Section...
                        </option>
                        <option disabled className="text-xs font-bold">
                            ------------
                        </option>{' '}
                        {categoryArray.map(({ _id, name }) => {
                            return (
                                <option
                                    selected={select === _id}
                                    key={_id}
                                    value={_id}
                                >
                                    {name[0].toUpperCase() + name.slice(1)}
                                </option>
                            );
                        })}
                    </select>

                    {/* <button
                        type="button"
                        className="w-fit text-left underline"
                        onClick={() => setContent(() => 'manage')}
                    >
                        <p className=" mt-4 cursor-pointer hover:opacity-80">
                            Manage Sections
                        </p>
                    </button> */}
                </div>
            )}

            {/* {content == 'manage' && (
                <div className="flex w-full max-w-[24rem] flex-col gap-3">
                    <p>
                        Sections help shoppers browse your shop. Drag and drop
                        sections to change their order in your shop.
                    </p>

                    <p>
                        Using{' '}
                        <span className="font-semibold">
                            {categoryArray?.length}
                        </span>{' '}
                        sections
                    </p>

                    <div className="divider !m-0 !p-0"></div>

                    <DragDropContext
                        onDragEnd={handleDragEnd}
                        // onDragStart={handleDragStart}
                        // onDragUpdate={handleDragUpdate}
                    >
                        <Droppable
                            droppableId="section-droppable"
                            direction="vertical"
                        >
                            {(provided, snapshot) => (
                                <section
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex-col"
                                >
                                    {categoryArray?.map(
                                        ({ _id, name, count }, index) => {
                                            return (
                                                <Draggable
                                                    draggableId={_id}
                                                    key={_id}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => {
                                                        if (
                                                            snapshot.isDragging
                                                        ) {
                                                            provided.draggableProps.style =
                                                                {
                                                                    ...provided
                                                                        .draggableProps
                                                                        .style,
                                                                    left: provided
                                                                        .draggableProps
                                                                        .style
                                                                        .offsetLeft,
                                                                    top: provided
                                                                        .draggableProps
                                                                        .style
                                                                        .offsetTop,
                                                                };
                                                        }
                                                        return (
                                                            <div
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                onClick={() => {
                                                                    setText(
                                                                        () =>
                                                                            name
                                                                    );
                                                                    setContent(
                                                                        () =>
                                                                            'edit'
                                                                    );
                                                                }}
                                                                className={`${
                                                                    snapshot?.isDragging
                                                                        ? 'bg-green-700/80'
                                                                        : 'bg-transparent'
                                                                } group mx-[-0.75rem] flex flex-row flex-nowrap items-center gap-3 py-3 pl-8 pr-8 hover:bg-light-grey`}
                                                            >
                                                                <OpenWith
                                                                    className={`${
                                                                        snapshot?.isDragging
                                                                            ? '!fill-white'
                                                                            : '!fill-dark-gray'
                                                                    }`}
                                                                />
                                                                <p className="">
                                                                    {name}
                                                                </p>
                                                                <Edit className="!opacity-0 group-hover:!opacity-100" />
                                                                <p
                                                                    className={`flex-1 text-right ${
                                                                        snapshot?.isDragging
                                                                            ? 'text-white'
                                                                            : 'text-black'
                                                                    }`}
                                                                >
                                                                    {count}
                                                                </p>
                                                            </div>
                                                        );
                                                    }}
                                                </Draggable>
                                            );
                                        }
                                    )}

                                    {provided.placeholder}
                                </section>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            )} */}

            {content == 'edit' && (
                <div className="flex flex-col gap-2">
                    <p>Section title</p>
                    <input
                        className="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-sm"
                        type="text"
                        value={text}
                        onChange={(e) => setText(() => e.target.value)}
                    />
                </div>
            )}
            {content == 'new' && (
                <div className="flex flex-col gap-2">
                    <p>Section title</p>
                    <input
                        className="daisy-input daisy-input-bordered daisy-input-sm w-full rounded-sm"
                        type="text"
                        value={text}
                        onChange={(e) => setText(() => e.target.value)}
                    />
                </div>
            )}
        </Template>
    );
}

export default ChangeSection;
