import { AddRounded } from '@mui/icons-material';
import secure_icon from '../../../../assets/icons/secure-document.png';
import { useState } from 'react';
import { useAdminContext } from '../../../../context/adminContext';
import { ClickAwayListener } from '@mui/material';
import { adminAxios } from '../../../../api/axios';
import { useAdminOrderContext } from '../../../../context/adminOrder';
import dayjs from 'dayjs';

function Note({ idx, note, date, _id, lastIdx }) {
    const [error, setError] = useState({});
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(note);
    const {
        orderInfo,
        setOrderInfo,
fetchData,
        setTriggerFetchData,
    } = useAdminOrderContext();

    const { logoutUser } = useAdminContext();
    const saveEdit = async () => {
        try {   
            if (text.trim().length == 0) {
                setError(() => ({ msg: "Note can't be empty" }));
                return;
            }
            const { data } = await adminAxios.post('privateNote/edit', {
                noteId: _id,
                orderId: orderInfo?._id,
                note: text,
            });

           
            setEdit(() => false);
            setOrderInfo(() => data.order);
            fetchData()
        } catch (error) {
            logoutUser({ error });
        }
    };
    const deleteNote = async () => {
        try {
            const { data } = await adminAxios.delete(
                `privateNote/delete?noteId=${_id}&orderId=${orderInfo?._id}`
            );
            setOrderInfo(() => data.order);
            fetchData()
        } catch (error) {
            console.error(error);
            logoutUser({ error });
        }
    };
    return (
        <div className={`w-full pb-2 ${lastIdx ? '' : 'border-b-[1px]'}`}>
            {!edit ? (
                <>
                    <p className="text-xxs">{note}</p>
                    <div className={`flex flex-row flex-nowrap gap-2  `}>
                        <p className="text-xxs text-black/70">
                            Added {dayjs(date).format('DD MMM, YYYY')}
                        </p>
                        <button
                            onClick={() => setEdit(true)}
                            className="text-xxs text-black/70 underline underline-offset-1 hover:!text-black/50 "
                        >
                            Edit
                        </button>
                        <button
                            onClick={deleteNote}
                            className="text-xxs text-black/70 underline underline-offset-1 hover:!text-black/50 "
                        >
                            Delete
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex w-full flex-col gap-3">
                    <textarea
                        onChange={(e) => {
                            setText(() => e.target.value);

                            if (e.target.value.length == 0) {
                                setError(() => ({
                                    msg: "Note can't be empty",
                                }));
                            } else {
                                setError(() => ({ msg: '' }));
                            }
                        }}
                        value={text}
                        className="border-[1px] p-2 text-xs"
                        name="private-note"
                        id="private-note"
                        rows="3"
                    ></textarea>

                    {error?.msg && (
                        <p className="text-xxs text-red-700">{error.msg}</p>
                    )}
                    <div className=" flex flex-row justify-end gap-2">
                        <button
                            onClick={() => setEdit(false)}
                            className="rounded-sm border-[1px] px-2 py-1 text-xxs"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={saveEdit}
                            className="rounded-sm bg-black px-2  py-1 text-xxs text-white"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function PrivateButton({ toggle, noteCount }) {
    return (
        <button
            onClick={toggle}
            className="flex w-fit flex-nowrap items-center gap-1 whitespace-nowrap rounded-sm border-[1px] border-dark-gray/60 px-2 py-1 hover:bg-light-grey/100"
        >
            <AddRounded className="!text-sm" />
            <p className="text-xxs">
                {noteCount == 0
                    ? 'Add a private note'
                    : 'Add more private notes'}
            </p>
        </button>
    );
}
function PrivateNote({}) {
    const [open, setOpen] = useState(false);
    const [error, setError] = useState({});
    const [note, setNote] = useState('');
    const {
        orderInfo,
        setOrderInfo,
        fetchData,
        setTriggerFetchData,
    } = useAdminOrderContext();
    const { logoutUser } = useAdminContext();
    const toggle = () => {
        setOpen((prevState) => !prevState);
        return;
    };

    const addPrivateNote = async () => {
        try {
            if (note.trim().length == 0) {
                setError(() => ({ msg: "Note can't be empty" }));
                return;
            }
            const { data } = await adminAxios.post('/privateNote/add', {
                note,
                orderId: orderInfo?._id,
            });

            setOrderInfo(() => data.order);
            setOpen(() => false);
            setNote(() => '');
            fetchData()
        } catch (error) {
            console.error(error);
            logoutUser({ error });
        }
    };
    return (
        <div className="my-3 flex flex-row justify-between gap-3 rounded-sm border-[1px] p-4">
            <div className="left flex w-full flex-row items-start gap-3">
                <img
                    src={secure_icon}
                    alt="secure document icon"
                    className={`h-5 w-5 self-start`}
                />
                <section className="flex w-full flex-col gap-2">
                    {!open && !orderInfo?.private_note?.length ? (
                        <p className="text-xxs">Only you can see this note</p>
                    ) : (
                        <section className="flex flex-col gap-2">
                            {orderInfo.private_note?.map((note, idx) => {
                                return (
                                    <Note
                                        key={note._id}
                                        {...note}
                                        lastIdx={
                                            idx ==
                                            orderInfo.private_note?.length - 1
                                        }
                                    />
                                );
                            })}
                        </section>
                    )}
                    {!open && orderInfo?.private_note?.length >= 1 && (
                        <PrivateButton
                            toggle={toggle}
                            noteCount={orderInfo?.private_note?.length}
                        />
                    )}
                    {open && (
                        <div className="flex w-full flex-col gap-3">
                            <textarea
                                onChange={(e) => {
                                    setNote(() => e.target.value);

                                    if (e.target.value.length == 0) {
                                        setError(() => ({
                                            msg: "Note can't be empty",
                                        }));
                                    } else {
                                        setError(() => ({ msg: '' }));
                                    }
                                }}
                                value={note}
                                placeholder={
                                    orderInfo?.private_note?.length == 0
                                        ? 'Enter a private note'
                                        : 'Add more private notes'
                                }
                                className="border-[1px] p-2 text-xs"
                                name="private-note"
                                id="private-note"
                                // cols="30"
                                rows="3"
                            ></textarea>
                            {error?.msg && (
                                <p className="text-xxs text-red-700">
                                    {error.msg}
                                </p>
                            )}
                            <div className=" flex flex-row justify-end gap-2">
                                <button
                                    onClick={toggle}
                                    className="rounded-sm border-[1px] px-2 py-1 text-xxs"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={addPrivateNote}
                                    className="rounded-sm bg-black px-2  py-1 text-xxs text-white"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            {!open && !orderInfo?.private_note?.length && (
                <PrivateButton
                    toggle={toggle}
                    noteCount={orderInfo.private_note?.length || 0}
                />
            )}
        </div>
    );
}

export default PrivateNote;
