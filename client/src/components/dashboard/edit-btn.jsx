import edit_icon from '../../assets/icons/edit.png';
function EditButton({ handleEdit }) {
    return (
        <button
            className={`bottom flex h-fit w-fit cursor-pointer items-center gap-x-2 self-end disabled:opacity-40`}
            onClick={handleEdit}
        >
            <p className="font-bold tracking-widest !text-[var(--grey)]">
                EDIT
            </p>
            <img
                src={edit_icon}
                alt="bin outline icon with transparent background"
                className="h-7 w-7"
            />
        </button>
    );
}

export default EditButton;
