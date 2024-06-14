import { Formik } from 'formik';
import React from 'react';

export default function CustomFormik({ children, initialValues, validationSchema, onSubmit }) {
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit} >

            {() => {
                return children;
            }}
        </Formik>
    );
}