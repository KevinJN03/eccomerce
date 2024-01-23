import { useContent } from '../../../../context/ContentContext';

function ChangeSection({}) {
    const { setModalCheck } = useContent();
    return (
        <section className=" flex w-[20rem] max-w-xs flex-col bg-white ">
            <div className="w-full bg-light-grey/50 px-4 py-3 font-medium">
                <p>Change section for 1 listing</p>
            </div>

            <div className="flex w-full flex-col gap-2 px-4 py-4">
                <select
                    name="change-section"
                    id="change-section"
                    className="daisy-select daisy-select-bordered daisy-select-sm w-full !rounded-sm"
                >
                    <option value="" selected disabled>
                        Select Section...
                    </option>
                </select>

                <p className=" cursor-pointer underline hover:opacity-80">
                    Manage Sections
                </p>
            </div>

            <div className=" flex w-full flex-row justify-end gap-2 border-t border-dark-gray/50 px-4  py-2">
                <button
                    onClick={() => setModalCheck(() => false)}
                    type="button"
                    className="rounded border px-3 py-2 text-xs font-medium"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="rounded border border-black bg-black px-3 py-2 text-xs  font-medium text-white"
                >
                    Delete
                </button>{' '}
            </div>
        </section>
    );
}

export default ChangeSection;
