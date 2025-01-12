import React, { PureComponent } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

import { motion } from 'framer-motion';
import animationVariant from '../../home/animationVariant';
function Chart({ data }) {
    return (
        <motion.section
            className="chart rounded-lg"
            variants={animationVariant(3)}
            initial={'initial'}
            animate={'animate'}
        >
            <div className="title">Last 6 Months (Revenue)</div>
            <ResponsiveContainer width="100%" aspect={2 / 1}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#8884d8"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#8884d8"
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient
                            id="numOfOrders"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor="rgb(167, 237, 167)"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="rgb(167, 237, 167)"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="green" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" className="" />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                    <Area
                        type="monotone"
                        dataKey="numOfOrders"
                        stroke="#82ca9d"
                        fillOpacity={1}
                        fill="url(#numOfOrders)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </motion.section>
    );
}

export default Chart;
