import React from 'react';
import { useFormikContext } from 'formik';
import { Dimensions, Pressable, StyleSheet, Text } from 'react-native';

const SubmitButton = ({ title }) => {
    const { handleSubmit, isSubmitting } = useFormikContext();

    return (
        <Pressable onPress={isSubmitting ? null : handleSubmit} style={[styles.btnSubmit,
        { backgroundColor: isSubmitting ? 'gray' : '#E8363C' }]}>
            <Text style={styles.btnText}>{title}</Text>
        </Pressable>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    btnSubmit: {
        height: 50,
        width: width - 40,
        marginBottom: 20,
        borderRadius: 8,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#FFF'
    }
});

export default SubmitButton;

