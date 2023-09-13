import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';
function Transaction_Table({}) {
    const rows = [
        {
            id: uuidv4(),
            product: 'Shirt',
            product_img:
                'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/204062624-1-black?$n_240w$&wid=40&fit=constrain',
            customer: 'Adam William',
            date: '1 August',
            amount: '20.99',
            method: 'Online',
            status: 'Cancelled',
        },
        {
            id: uuidv4(),
            product: 'Shirt',
            product_img:
                'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/204062624-1-black?$n_240w$&wid=40&fit=constrain',
            customer: 'Adam William',
            date: '1 August',
            amount: '20.99',
            method: 'Online',
            status: 'Pending',
        },
        {
            id: uuidv4(),
            product: 'Shirt',
            product_img:
                'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/204062624-1-black?$n_240w$&wid=40&fit=constrain',
            customer: 'Adam William',
            date: '1 August',
            amount: '20.99',
            method: 'Online',
            status: 'Approved',
        },
        {
            id: uuidv4(),
            product: 'Shirt',
            product_img:
                'https://images.asos-media.com/products/asos-design-cargo-tapered-trousers-in-black-with-toggles/204062624-1-black?$n_240w$&wid=40&fit=constrain',
            customer: 'Adam William',
            date: '1 August',
            amount: '20.99',
            method: 'Online',
            status: 'Pending',
        },
    ];

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">
                            Transaction ID
                        </TableCell>
                        <TableCell className="tableCell">Product</TableCell>
                        <TableCell className="tableCell">Customer</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Amount</TableCell>
                        <TableCell className="tableCell">
                            Payment Method
                        </TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">
                                {row.id}
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    <img
                                        src={row.product_img}
                                        alt=""
                                        className="image"
                                    />
                                    {row.product}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">
                                {row.customer}
                            </TableCell>
                            <TableCell className="tableCell">
                                {row.date}
                            </TableCell>
                            <TableCell className="tableCell">
                                {row.amount}
                            </TableCell>
                            <TableCell className="tableCell">
                                {row.method}
                            </TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>
                                    {row.status}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Transaction_Table;
