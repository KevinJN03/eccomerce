function PaginationButton({
    divideBy,
    setPage,
    page,
    buttonClassName,
    activeClassName,
}) {
    const content = () => {
        if (divideBy > 4) {
            return (
                <>
                    {[1, 2].map((item) => {
                        return (
                            <button
                                onClick={() => setPage(() => item)}
                                className={`${buttonClassName || 'btn'}  ${
                                    page == item
                                        ? activeClassName || 'btn-active'
                                        : ''
                                }`}
                                key={item}
                            >
                                {item}
                            </button>
                        );
                    })}
                    {page >= 4 && (
                        <button
                            disabled
                            className={` ${buttonClassName || 'btn'}`}
                        >
                            ...
                        </button>
                    )}
                    {page > 2 && page < divideBy && (
                        <button
                            // onClick={() => setPage(divideBy)}
                            className={` ${buttonClassName || 'btn'} ${activeClassName || 'btn-active'}`}
                        >
                            {page}
                        </button>
                    )}
                    {page < divideBy - 1 && page >= 1 && (
                        <button
                            disabled
                            className={` ${buttonClassName || 'btn'}`}
                        >
                            ...
                        </button>
                    )}
                    <button
                        onClick={() => setPage(divideBy)}
                        className={` ${buttonClassName || 'btn'} ${
                            page == divideBy
                                ? activeClassName || 'btn-active'
                                : ''
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
                            return (
                                <button
                                    onClick={() => setPage(() => idx + 1)}
                                    className={` ${buttonClassName || 'btn'} ${
                                        page == idx + 1
                                            ? activeClassName || 'btn-active'
                                            : ''
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
