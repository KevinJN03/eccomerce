import './new.scss';
import SideBar from '../sidebar/sidebar';
import Navbar from '../navbar/navbar';
import ReactFlagsSelect from 'react-flags-select';
import { useEffect, useState } from 'react';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import User_Form from './userForm';
import Product_Form from './productForm';
import { Save } from '@mui/icons-material';
import axios, { adminAxios } from '../../../../api/axios.js';
import handleError, { closeError } from '../../../common/handleError';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { v4 as uuidv4 } from 'uuid';
import ErrorList from './errorList';
import Success from './success';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
function New({ type, title }) {
    const [selected, setSelected] = useState('');
    const [file, setFile] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [address, setAddress] = useState({});
    const [password, setPassword] = useState('');
    const [interest, setInterest] = useState('Menswear');
    const [error, setError] = useState([]);
    const [dob, setDob] = useState('');
    const [success, setSuccess] = useState(false);
    const [userId, setUserId] = useState();
    const [generateUrl, setGenerateUrl] = useState(true);
    const value = [
        { firstName, setFirstName },
        { lastName, setLastName },
        { email, setEmail },
        { mobile, setMobile },
        { password, setPassword },
        { interest, setInterest },
        { address, setAddress },
        { dob, setDob },

        // { interest, setInterest },
    ];

    const { id } = useParams();

    useEffect(() => {
        if (id) {
            adminAxios.get(`/user/${id}`).then((res) => {
                let data = res.data;

                // setFile(data.profileImg)
                setAddress(data.address[0]);
                setGenerateUrl(false);
                setFirstName(data.firstName);
                setFile(data.profileImg);
                setLastName(data.lastName);
                setMobile(data.mobile);
                setInterest(data.interest);
                setEmail(data.email);

                setDob(dayjs(data.dob));
                {
                }
            });
        }
    }, []);
    const handleFile = (e) => {
        let fileType = e.target.files[0].type;
        if (fileType.includes('image')) {
            setGenerateUrl(true);
            setFile(e.target.files[0]);
        } else {
            setError([
                ...error,
                {
                    id: uuidv4(),
                    msg: `${
                        fileType.split('/')[1]
                    } is unsupported, only png, jpeg, webp accepted.`,
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

    const save = () => {
        // const form = new FormData()

        const body = {
            firstName,
            lastName,
            email,
            interest,
            dob,

            address,
            mobile,
        };
        if (generateUrl) {
            body.file = file;
        }

        if (type == 'new') {
            body.password = password;
        }

        let option = type == 'new' ? 'create' : `update/${id}`;

        adminAxios
            .postForm(`/user/${option}`, body)
            .then((res) => {
                if (res.status == 201 || 200) {
                    setError([]);
                    setSuccess(true);
                    const { _id } = res.data;
                    setUserId(_id);
                }
            })
            .catch((error) => {
                setError(handleError(error));
            });
    };
    const handleDelete = () => {
        setFile(null);
        setGenerateUrl(true);
    };
    return (
        <section className="m-5">
            <div className="top">
                <h1 className="title">{title}</h1>
            </div>
            <section className="errors-wrapper mt-3">
                <ErrorList error={error} setError={setError} />
            </section>

            <div className="bottom">
                {success && (
                    <Success
                        setSuccess={setSuccess}
                        userId={userId}
                        type={type}
                        id={id}
                    />
                )}
                {!success && (
                    <>
                        <div className="left">
                            <div className="relative">
                                <img
                                    src={
                                        file && generateUrl
                                            ? URL.createObjectURL(file)
                                            : !generateUrl
                                              ? file
                                              : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                                    }
                                    alt=""
                                />
                                {file && (
                                    <DeleteRoundedIcon
                                        className="absolute bottom-0 right-0"
                                        onClick={handleDelete}
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
                            <section>
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

                                <User_Form states={value} type={type} />
                            </section>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default New;
