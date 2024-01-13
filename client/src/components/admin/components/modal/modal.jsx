import * as React from 'react';
import './modal.scss';
import { useEffect } from 'react';

import axios from '../../../../api/axios';
function Modal({
    id,

    setCheck,
    check,
    loading,
    deleteType,
    setLoading,
    ModalContent,
    className,
   
    selection,
}) {
    const handleDelete = () => {
        if (selection && selection.length > 1) {
            axios
                .delete(`/admin/delete/${deleteType}/many/${selection}`)
                .then((res) => {
                    if (res.status === 200) {
                        setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        setCheck(false)
                      }, 1000)
                    }
                });
        } else {
            axios.delete(`/admin/delete/${deleteType}/${id}`).then((res) => {
                if (res.status === 200) {
                    setLoading(true);
                    setTimeout(() => {
                        setLoading(false);
                        setCheck(false)
                      }, 1000)
                }
            });
        }
    };

    return (
        <section className='z-50'>
            <input
                className="modal-state  "
                id="modal-3"
                type="checkbox"
                checked={check}
                readOnly
            />
            <div className={` modal  `}>
                <label
                    className={`modal-overlay bg-transparent  `}
                    htmlFor="modal-3"
                    onClick={() => setCheck(false)}
                ></label>
                <div
                    className={`modal-content flex flex-col items-center gap-4 rounded-none border-none ${className} !bg-white`}
                >
                    {loading ? (
                        <div class="spinner-circle [--spinner-color:var(--gray-9)]"></div>
                    ) : (
                        <>
                            {ModalContent && { ...ModalContent }}
                            {ModalContent == null && (
                                <>
                                    <label
                                        htmlFor="modal-1"
                                        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                                        onClick={() => setCheck(false)}
                                    >
                                        ✕
                                    </label>
                                    <h2 className="text-center font-gotham text-xl tracking-wider">
                                        CONFIRMATION
                                    </h2>
                                    <span className="text-center">
                                        {selection && selection.length > 1
                                            ? `Are you sure you want to delete (${selection.length}) ${deleteType}`
                                            : 'Are you sure you want to delete this'}
                                    </span>
                                    <div className="flex w-full justify-center gap-5">
                                        <button
                                            className="bg-red-200 px-2 py-1  hover:bg-red-500"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="bg-blue-100  px-2 py-1 hover:bg-blue-500"
                                            onClick={() => setCheck(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Modal;
