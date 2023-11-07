function Button({ error, text, submit, disable }) {
    return (
        <button
            type="button"
            className="login-signup-btn"
            onClick={submit}
            disabled={Object.values(error).some((item) => item != null) || disable}
        >
            {text}
        </button>
    )
}

export default Button;
