import { useState } from 'react';
import BubbleButton from '../../../buttons/bubbleButton';
import { useContent } from '../../../../context/ContentContext';

function DeleteProfile({}) {
    const { setModalCheck } = useContent();


    return (
        <section className="rounded-3xl bg-white p-8 flex flex-col gap-4 !max-w-[100rem] !w-[27rem]">
            <h1 className="font-EBGaramond text-4xl">
                Delete delivery profiles
            </h1>

            <p className='text-sm'>Are you sure you want to delete this profile?</p>

            <footer className='flex w-full justify-between mt-6'>
                <BubbleButton handleClick={() => setModalCheck(() => false)} />
                <button type="button" className='text-white bg-black font-base px-5 py-3 rounded-full'>
                    Delete profile
                </button>
            </footer>
        </section>
    );
}

export default DeleteProfile;
