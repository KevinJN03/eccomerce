import { Link } from 'react-router-dom';

function actionColumn({
    viewBtn,
    secondBtnClick,
    selection,
    viewClick,
    disable2ndBtn,
    buttonText 
}) {
    return [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        {viewBtn ? (
                            <button
                                type="button"
                                className="viewButton"
                                onClick={() => viewClick(params?.row?._id)}
                            >
                                View
                            </button>
                        ) : (
                            <Link to={`edit/${params.row._id}`}>
                                <div className="viewButton">View</div>
                            </Link>
                        )}

                        {/* {selection.length < 2 && ( */}

                        {!disable2ndBtn && (
                            <button
                                className="deleteButton"
                                onClick={() =>
                                    secondBtnClick(params?.row?._id)
                                }
                            >
                                {buttonText || 'Delete'}
                            </button>
                        )}

                        {/*    )} */}
                    </div>
                );
            },
        },
    ];
}

export default actionColumn;
