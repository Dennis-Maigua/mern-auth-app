import React, { useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import FormContainer from './FormContainer';
import AppInput from './AppInput';
import SubmitButton from './SubmitButton';
import FormNavigator from './FormNavigator';
import { navigateToForgotPassword, navigateToLogin, updateNotification } from '../utils/helper';
import CustomFormik from './CustomFormik';
import { signup } from '../utils/auth';
import AppNotification from './AppNotification';

const initiateValues = {
    name: '',
    email: '',
    password: ''
};

const validateSchema = yup.object({
    name: yup.string().trim().required('Name is missing!'),
    email: yup.string().email('Invalid email').required('Email is missing!'),
    password: yup.string().trim().min(8, 'Password should be 8 characters or more!').required('Password is missing!')
});

export default function SignUp() {
    const navigation = useNavigation();
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleSignUp = async (values, formikActions) => {
        const res = await signup(values);
        formikActions.setSubmitting(false);

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }

        formikActions.resetForm();
        updateNotification(setMessage, res.message, 'success');

        // setTimeout(() => {}, 3000);

        navigation.dispatch(
            StackActions.replace('verification', { profile: res.user })
        );
    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik initialValues={initiateValues} validationSchema={validateSchema} onSubmit={handleSignUp} >
                    <AppInput name="name" placeholder="Name" />
                    <AppInput name="email" placeholder="Email" />
                    <AppInput secureTextEntry name="password" placeholder="Password" />
                    <SubmitButton title="Sign Up" />
                    <FormNavigator
                        leftLinkPress={navigateToLogin(navigation)}
                        rightLinkPress={navigateToForgotPassword(navigation)}
                        leftLinkText="Log In"
                        rightLinkText="Forgot password?" />
                </CustomFormik>
            </FormContainer>
        </>
    );
}