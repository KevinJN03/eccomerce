import { SpaRounded } from '@mui/icons-material';

function Button({ error, text, submit, disable, loading }) {
    return (
        <button
            type="button"
            className="login-signup-btn"
            onClick={submit}
            disabled={
                Object.values(error).some((item) => item != null) || disable
            }
        >
            {loading ? (
                <svg
                    className="spinner-ring spinner-sm ![--spinner-color:var(--gray-1)]"
                    viewBox="25 25 50 50"
                    strokeWidth="5"
                >
                    <circle cx="50" cy="50" r="20" />
                </svg>
            ) : (
                <span className="text-white"> {text}</span>
            )}
        </button>
    );
}

export default Button;
