import React, { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import FormContainer from './FormContainer';
import AppInput from './AppInput';
import SubmitButton from './SubmitButton';
import FormNavigator from './FormNavigator';
import { navigateToForgotPassword, navigateToSignup, updateNotification } from '../utils/helper';
import CustomFormik from './CustomFormik';
import { login } from '../utils/auth';
import AppNotification from './AppNotification';

const initiateValues = {
    email: '',
    password: ''
};

const validateSchema = yup.object({
    email: yup.string().email('Invalid email')
        .required('Email is missing!'),
    password: yup.string().trim()
        .min(8, 'Password should be 8 to 20 characters long!')
        .required('Password is missing!')
});

export default function Login() {
    const navigation = useNavigation();
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleLogin = async (values, formikActions) => {
        const res = await login(values);
        formikActions.setSubmitting(false);

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }

        formikActions.resetForm();
        updateNotification(setMessage, res.message, 'success');

        setTimeout(() => {
            navigation.dispatch(
                StackActions.replace('home', { profile: res.user })
            );
        }, 1000);

    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik initialValues={initiateValues} validationSchema={validateSchema} onSubmit={handleLogin} >
                    <AppInput name="email" placeholder="Email" />
                    <AppInput secureTextEntry name="password" placeholder="Password" />
                    <SubmitButton title="Log In" />
                    <FormNavigator
                        leftLinkPress={navigateToSignup(navigation)}
                        rightLinkPress={navigateToForgotPassword(navigation)}
                        leftLinkText="Sign Up"
                        rightLinkText="Forgot password?" />
                </CustomFormik>
            </FormContainer>
        </>
    );
}