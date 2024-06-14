import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';

import FormContainer from './FormContainer';
import AppInput from './AppInput';
import SubmitButton from './SubmitButton';
import FormNavigator from './FormNavigator';
import { navigateToLogin, navigateToSignup, updateNotification } from '../utils/helper';
import CustomFormik from './CustomFormik';
import { forgotPassword } from '../utils/auth';
import AppNotification from './AppNotification';

const initiateValues = {
    email: ''
};

const validateSchema = yup.object({
    email: yup.string().email('Invalid email').required('Email is missing!')
});

export default function ForgotPassword() {
    const navigation = useNavigation();
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleResetLink = async (values, formikActions) => {
        const res = await forgotPassword(values.email);
        formikActions.setSubmitting(false);

        if (!res.success) {
            return updateNotification(setMessage, res.error);
        }

        formikActions.resetForm();
        updateNotification(setMessage, res.message, 'success');
    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <FormContainer>
                <CustomFormik initialValues={initiateValues} validationSchema={validateSchema} onSubmit={handleResetLink} >
                    <AppInput name="email" placeholder="Email" />
                    <SubmitButton title="Reset Password" />
                    <FormNavigator
                        leftLinkPress={navigateToLogin(navigation)}
                        rightLinkPress={navigateToSignup(navigation)}
                        leftLinkText="Log In"
                        rightLinkText="Sign Up" />
                </CustomFormik>
            </FormContainer>
        </>
    );
}