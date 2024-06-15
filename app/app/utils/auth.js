import Client from "../api/client";

const catchError = error => {
    if (error?.response?.data) {
        return error.response.data;
    }
    return {
        success: false,
        error: error.message
    };
}

export const signup = async values => {
    try {
        const { data } = await Client.post('/api/user/register', { ...values });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
};

export const login = async values => {
    try {
        const { data } = await Client.post('/api/user/login', { ...values });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
};

export const forgotPassword = async email => {
    try {
        const { data } = await Client.post('/api/user/forgot-password', { email });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
};

export const verifyEmail = async (otp, userId) => {
    try {
        const { data } = await Client.post('/api/user/verify-email', { otp, userId });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
};

/*
export const logout = async userId => {
    try {
        const { data } = await Client.post('/api/user/logout', { userId });
        return data;
    }
    catch (error) {
        return catchError(error);
    }
};
*/