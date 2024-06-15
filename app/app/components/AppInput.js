import React from 'react';
import { useFormikContext } from 'formik';
import { Dimensions, StyleSheet, Text, TextInput } from 'react-native';

const AppInput = ({ name, placeholder, ...rest }) => {
    const { errors, values, touched, handleBlur, handleChange } = useFormikContext();
    const value = values[name];
    const error = errors[name];
    const isInputTouched = touched[name];

    return (
        <>
            {isInputTouched && error ? <Text style={styles.textError}>{error}</Text> : null}
            <TextInput
                value={value}
                placeholder={placeholder}
                onChangeText={handleChange(name)}
                onBlur={handleBlur(name)}
                style={styles.input}
                {...rest}
            />
        </>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    input: {
        height: 50,
        width: width - 40,
        fontSize: 18,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        elevation: 3
    },
    textError: {
        color: 'red',
        paddingVertical: 3
    }
});

export default AppInput;