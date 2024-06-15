import { Dimensions, Image, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';

const FormContainer = ({ children }) => {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image style={styles.logo} source={require('../assets/logo.png')} />
                {children}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    logo: {
        height: 150,
        width: 150,
        marginBottom: 20,
        marginTop: height * 0.1,
        alignSelf: 'center'
    }
});

export default FormContainer;