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
import { Link } from 'react-router-dom';
import CollapseExpandIcon from '../../finance/collapseExpandIcon';
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
                                <Link
                                className='hover:underline font-medium hover:text-black/80 transition-all'
                                    to={`/admin/orders/${row.status == 'recieved' ? 'new' : 'complete'}?orderId=${row._id}`}
                                >
                                    {' '}
                                    {row._id}
                                </Link>
                            </TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">

                                <CollapseExpandIcon array={row?.items}/>

                                    {/* {row?.items?.map((item) => {
                                        return (
                                           <CollapseExpandIcon array={}/>
                                            // <span
                                            //     key={uuidv4()}
                                            //     className="tooltip tooltip-top"
                                            //     data-tooltip={
                                            //         item?.title
                                            //     }
                                            // >
                                            //     <img
                                            //         src={
                                            //             item?.images?.[0]
                                            //         }
                                            //         alt=""
                                            //         className="h-10 w-10 rounded-full object-cover"
                                            //     />
                                            // </span>
                                        );
                                    })} */}
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
