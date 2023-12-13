import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { CircularProgressbar } from 'react-circular-progressbar';
import '../../home/admin.scss';
import 'react-circular-progressbar/dist/styles.css';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
import { easeQuadInOut } from 'd3-ease';
import CircularProgress from '@mui/joy/CircularProgress';
import { Typography } from '@mui/material';
import { useCountUp } from 'use-count-up';
import {motion} from 'framer-motion'
import animationVariant from '../../home/animationVariant';
function Featured({ todayAmount }) {
    const { value, reset } = useCountUp({
        isCounting: true,
        duration: 3.2,
        start: 0,
        end: 75,
    });
    return (
        <motion.section className="featured" variants={animationVariant(2)} animate={'animate'} initial={'initial'}>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertRoundedIcon />
            </div>
            <div className="bottom">
                <div className="featuredChart flex items-center justify-center">
                    {/* <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={66}
                        duration={1.4}
                        easingFunction={easeQuadInOut}
                    >
                        {(value) => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbar
                                    value={90}
                                    text={`${roundedValue}%`}
                                    strokeWidth={5}
                                />
                            );
                        }}
                    </AnimatedProgressProvider> */}

                    {/*   <CircularProgress size={'lg'}>
                        <Typography>20</Typography>
                    </CircularProgress> */}

                    <CircularProgress
                        determinate
                        value={value}
                       
                        sx={{
                            '--CircularProgress-size': '90px',
                            '--CircularProgress-progressThickness': '9px',
                            '--CircularProgress-trackThickness': '9px',
                        }}
                    >
                        <Typography>{value}%</Typography>
                    </CircularProgress>
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">£{todayAmount}</p>
                <p className="description">
                    Previous transactions processing. Last payments may not be
                    included
                </p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <TrendingUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult negative">
                            <TrendingDownOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <TrendingUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Featured;
