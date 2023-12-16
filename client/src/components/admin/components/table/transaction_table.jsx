import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

import { motion } from 'framer-motion';
function Transaction_Table({ data }) {
    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="caption table">
                <TableHead>
                    <TableRow>
                        {[
                            'Transaction ID',
                            'Product',
                            'Customer',
                            'Date',
                            'Amount',
                            'Payment Method',
                            'Status',
                        ].map((title) => {
                            return (
                                <TableCell className="tableCell" key={title}>
                                    <p className="font-gotham text-sm">
                                        {title}
                                    </p>
                                </TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell className="tableCell">
                                {row._id}
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    {row?.items?.map((item) => {
                                        return (
                                            <span
                                                key={uuidv4()}
                                                className="tooltip tooltip-top"
                                                data-tooltip={
                                                    item?.product.title
                                                }
                                            >
                                                <img
                                                    src={
                                                        item?.product
                                                            ?.images?.[0]
                                                    }
                                                    alt=""
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            </span>
                                        );
                                    })}

                                    {/* {row.product} */}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">
                                {row?.shipping_address?.name}
                            </TableCell>
                            <TableCell className="tableCell">
                                {dayjs(row?.createdAt).format('DD MMM, YYYY')}
                            </TableCell>
                            <TableCell className="tableCell">
                                £ {row?.transaction_cost?.total?.toFixed(2)}
                            </TableCell>
                            <TableCell className="tableCell">
                                {row?.payment_type?.[0]?.toUpperCase() +
                                    row?.payment_type?.substring(1)}
                            </TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>
                                    {row.status[0]?.toUpperCase() +
                                        row.status?.substring(1)}
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
