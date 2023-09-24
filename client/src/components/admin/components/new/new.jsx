import './new.scss';
import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';
import ReactFlagsSelect from 'react-flags-select';
import { useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import User_Form from './userForm';
import Product_Form from './productForm';
import { Save } from '@mui/icons-material';
import axios, { adminAxios } from '../../../../api/axios';
import handleError, { closeError } from '../../../common/handleError';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { v4 as uuidv4 } from 'uuid';
function New({ type, title }) {
    const [selected, setSelected] = useState('');
    const [file, setFile] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [interest, setInterest] = useState('');
    const [error, setError] = useState([]);
    const [dob, setDob] = useState();
    const value = [
        { state: firstName, setState: setFirstName, id: 0 },
        { state: lastName, setState: setLastName, id: 1 },
        { state: email, setState: setEmail, id: 2 },
        { state: mobile, setState: setMobile, id: 3 },
        { state: password, setState: setPassword, id: 4 },
        { state: address, setState: setAddress, id: 5 },
        { state: dob, setState: setDob, id: 6 },

        // { interest, setInterest },
    ];

    const handleFile = (e) => {
        let fileType = e.target.files[0].type;
        if (fileType.includes('image')) {
            setFile(e.target.files[0]);
        } else {
            setError([
                ...error,
                {
                    id: uuidv4(),
                    msg: `${fileType.split('/')[1]} is unsupported, only png, jpeg, webp accepted.`,
                },
            ]);
        }
    };
    const body = {
        firstName,
        lastName,
        email,
        password,
        interest,
        mobile,
        address,
        dob,
    };

    file && (body.file = file);
    console.log('body', body);
    const save = () => {
        // const form = new FormData()

        const body = {
            firstName,
            lastName,
            email,
            password,
            interest,
            dob,
            file,
        };
        console.log('body', body);
        adminAxios
            .postForm('/user/create', {
                ...body,
            })
            .then((res) => {
                console.log(res.data);

                if (res.status == 201) {
                    setError([]);
                }
            })
            .catch((error) => {
                setError(handleError(error));
            });
    };

    return (
        <div className="new">
            <SideBar />
            <div className="newContainer">
                <Navbar />

                <section className="m-5">
                    <div className="top">
                        <h1 className="title">{title}</h1>
                    </div>
                    <section className="errors-wrapper mt-3">
                        {error.length > 0 &&
                            error.map((err) => {
                                return (
                                    <div
                                        className="alert alert-warning rounded-none"
                                        key={err.id}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                        <span>{err.msg}</span>
                                        <svg
                                            onClick={() =>
                                                closeError(
                                                    err.id,
                                                    error,
                                                    setError
                                                )
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="ml-auto h-6 w-6 shrink-0 stroke-current"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                );
                            })}
                    </section>

                    <div className="bottom">
                        <div className="left">
                            <div className="relative">
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                                    }
                                    alt=""
                                />
                                {file && (
                                    <DeleteRoundedIcon
                                        className="absolute bottom-0 right-0"
                                        onClick={() => setFile(null)}
                                    />
                                )}
                            </div>

                            <button
                                type="button"
                                className="mb-4 bg-green-500 p-2 text-white hover:bg-[var(--green)]"
                                onClick={save}
                            >
                                Create {type}
                            </button>
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
                                        accept="image/*"
                                        id="file"
                                        className="hidden"
                                        onChange={(e) => handleFile(e)}
                                    />
                                </div>
                                {type == 'User' && (
                                    <User_Form
                                        states={value}
                                        interestState={{
                                            interest,
                                            setInterest,
                                        }}
                                    />
                                )}
                                {type == 'Product' && <Product_Form />}
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default New;
