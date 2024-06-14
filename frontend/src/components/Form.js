import axios from 'axios';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';

const baseURL = 'http://localhost:8000/api/user';

function Form() {
    const location = useLocation();
    const navigate = useNavigate();
    const [invalidUser, setInvalidUser] = useState('');
    const [busy, setBusy] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState({
        password: '',
        confirmPassword: ''
    });

    const { token, id } = queryString.parse(location.search);

    const verifyToken = async () => {
        try {
            await axios(
                `${baseURL}/verify-token?token=${token}&id=${id}`
            );
            setBusy(false);
        }
        catch (error) {
            if (error?.response?.data) {
                const { data } = error.response;

                if (!data.success) {
                    return setInvalidUser(data.error);
                }
                return console.log(error.response.data);
            }
            console.log(error);
        }
    };

    useEffect(() => { verifyToken() }, []);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;

        setNewPassword({ ...newPassword, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = newPassword;

        if (password.trim().length < 8 || password.trim().length > 20) {
            return setError('Password must be 8 to 20 characters long!');
        }
        if (password !== confirmPassword) {
            return setError('Passwords do not match!');
        }

        try {
            setBusy(true);
            const { data } = await axios.post(
                `${baseURL}/reset-password?token=${token}&id=${id}`, { password }
            );
            setBusy(false);

            if (data.success) {
                navigate('/reset-password', { replace: true });
                setSuccess(true);
            }
        }
        catch (error) {
            setBusy(false);

            if (error?.response?.data) {
                const { data } = error.response;

                if (!data.success) {
                    return setError(data.error);
                }
                return console.log(error.response.data);
            }
            console.log(error);
        }
    };

    if (success) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    Password Reset Successful!
                </h1>
                <br />
                <p className="text-center text-lg text-gray-500">Please return to the app and log in using your new password.</p>
            </div>
        );
    }

    if (invalidUser) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    {invalidUser}
                </h1>
            </div>
        );
    }

    if (busy) {
        return (
            <div className="max-w-screen-sm m-auto pt-40">
                <h1 className="text-center text-3xl text-gray-500 mb-3">
                    Please wait while we verify your reset token.
                </h1>
            </div>
        );
    }

    return (
        <div className="max-w-screen-sm m-auto pt-40">
            <h1 className="text-center text-3xl text-gray-500 mb-3">
                Reset Password
            </h1>

            <form onSubmit={handleSubmit} className="shadow w-full rounded-lg p-10">
                {error && (
                    <p className="p-2 mb-3 text-center text-red-500 font-medium">
                        {error}
                    </p>
                )}
                <div className="space-y-8">
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password"
                        onChange={handleOnChange}
                        className="px-4 text-lg h-10 bg-gray-100 w-full border-gray-500 shadow rounded"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleOnChange}
                        className="px-4 text-lg h-10 bg-gray-100 w-full border-gray-500 shadow rounded"
                    />
                    <input
                        type="submit"
                        value="Reset Password"
                        className="bg-red-500 w-full py-2 text-white font-bold rounded shadow cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
};

export default Form;