import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import TrendingDownOutlinedIcon from '@mui/icons-material/TrendingDownOutlined';
function Featured({ todayAmount }) {
    return (
        <section className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertRoundedIcon />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={70}
                        text={'70%'}
                        strokeWidth={5}
                    />
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
        </section>
    );
}

export default Featured;
