function Change_Btn({ setChange, change }) {
    return (
        <button
            type="button"
            id="checkout-change-btn"
            onClick={() => setChange(!change)}
        >
            Change
        </button>
    );
}

export default Change_Btn;
