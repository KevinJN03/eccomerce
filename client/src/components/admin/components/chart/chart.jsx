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

function Chart({    data}) {
    return (
        <section className="chart">
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
                    </defs>
                    <XAxis dataKey="month" stroke="green" />

                    <CartesianGrid
                        strokeDasharray="3 3"
                        className="chartGrid"
                    />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#8884d8"
                        fillOpacity={1}
                        fill="url(#total)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </section>
    );
}

export default Chart;
