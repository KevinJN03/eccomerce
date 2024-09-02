import delete_icon from '../../assets/icons/delete-icon.png';
export function DeleteButton({ isDefault, handleDelete }) {
    return (
        <button
            className={`bottom flex h-fit w-fit cursor-pointer items-center gap-x-2 disabled:opacity-40`}
            disabled={isDefault}
            onClick={handleDelete}
        >
            <p className="font-bold tracking-widest !text-[var(--grey)]">
                DELETE
            </p>
            <img
                src={delete_icon}
                alt="bin outline icon with transparent background"
                className="h-7 w-7"
            />
        </button>
    );
}

export default DeleteButton;
