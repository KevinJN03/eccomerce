import './new.scss';
import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';
import ReactFlagsSelect from 'react-flags-select';
import { useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import User_Form from './userForm';
import Product_Form from './productForm';
function New({ type, title }) {
    const [selected, setSelected] = useState('');
    const [file, setFile] = useState('');

    return (
        <div className="new">
            <SideBar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1 className="title">{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                            }
                            alt=""
                        />
                    </div>

                    <div className="right">
                        <form action>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image:
                                    <DriveFolderUploadIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    placeholder="Choose File"
                                    id="file"
                                    className="hidden"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </div>
                            {type == 'User' && <User_Form />}
                            {type == 'Product' && <Product_Form />}
                            <button type="submit" className="submit-btn">
                                Create {type}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default New;
