import "./datable.scss"

import { DataGrid } from '@mui/x-data-grid';

import { userColumn, userRows } from "./datatable-source";

function Datatable({}){

    const actionColumn = [{field: "action", headerName: "Action", width: 200, renderCell: ()=> {
        return (
            <div className="cellAction">
                <div className="viewButton">View</div>
                <div className="deleteButton">Delete</div>
            </div>
        )
    }}]
  return (
    <section className='datatable'>
      <DataGrid
        rows={userRows.concat(userRows)}
        columns={userColumn.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        checkboxSelection
      />
    </section>
  )
};

export default Datatable
