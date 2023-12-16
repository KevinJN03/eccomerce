function PaginationButton({ divideBy, setPage, page }) {
    const content = () => {
        if (divideBy > 4) {
            return (
                <>
                    {[1, 2].map((item) => {
                        return (
                            <button
                                onClick={() => setPage(() => item)}
                                className={`btn ${
                                    page == item ? 'btn-active' : ''
                                }`}
                                key={item}
                            >
                                {item}
                            </button>
                        );
                    })}
                    {page >= 4 && (
                        <button disabled className="btn">
                            ...
                        </button>
                    )}
                    {page > 2 && page < divideBy && (
                        <button
                            // onClick={() => setPage(divideBy)}
                            className={`btn-active btn`}
                        >
                            {page}
                        </button>
                    )}
                    {page < divideBy - 1 && page >= 1 && (
                        <button disabled className="btn">
                            ...
                        </button>
                    )}
                    <button
                        onClick={() => setPage(divideBy)}
                        className={`btn ${
                            page == divideBy ? 'btn-active' : ''
                        }`}
                    >
                        {divideBy}
                    </button>
                </>
            );
        } else {
            return (
                <>
                    {Array(divideBy)
                        .fill(1)
                        .map((item, idx) => {
                            console.log({ item });
                            return (
                                <button
                                    onClick={() => setPage(() => idx + 1)}
                                    className={`btn ${
                                        page == idx + 1 ? 'btn-active' : ''
                                    }`}
                                    key={idx + 1}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                </>
            );
        }
    };

    return <>{content()}</>;
}

export default PaginationButton;
