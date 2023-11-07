function Button({ error, text, submit }) {
    return (
        <button
            type="button"
            className="login-signup-btn"
            onClick={submit}
            disabled={Object.values(error).some((item) => item != null)}
        >
            {text}
        </button>
    )
}

export default Button;
