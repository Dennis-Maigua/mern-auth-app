import { Dimensions, Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { verifyEmail } from '../utils/auth';
import { StackActions } from '@react-navigation/native';
import { updateNotification } from '../utils/helper';
import AppNotification from './AppNotification';

const inputs = Array(4).fill('');
let newInputIndex = 0;

const isObjValid = (obj) => {
    return Object.values(obj).every(val => val.trim());
};

const Verification = ({ route, navigation }) => {
    const { profile } = route.params;
    const input = useRef();
    const [OTP, setOTP] = useState({ 0: '', 1: '', 2: '', 3: '' });
    const [nextInputIndex, setNextInputIndex] = useState(0);
    const [message, setMessage] = useState({ text: '', type: '' });

    const handleOnChange = (text, index) => {
        const newOTP = { ...OTP };
        newOTP[index] = text;
        setOTP(newOTP);

        const lastInputIndex = inputs.length - 1;
        if (!text) {
            newInputIndex = index === 0 ? 0 : index - 1;
        }
        else {
            newInputIndex = index === lastInputIndex ? lastInputIndex : index + 1;
        }
        setNextInputIndex(newInputIndex);
    };

    useEffect(() => {
        input.current.focus();
    }, [nextInputIndex]);

    const submitOTP = async () => {
        Keyboard.dismiss();

        if (isObjValid(OTP)) {
            let val = '';

            Object.values(OTP).forEach(v => {
                val += v;
            });

            const res = await verifyEmail(val, profile.id);
            if (!res.success) {
                return updateNotification(setMessage, res.error);
            }

            updateNotification(setMessage, res.message, 'success');

            navigation.dispatch(
                StackActions.replace('home', { profile: res.user })
            );
        }
    };

    return (
        <>
            {message.text ? <AppNotification type={message.type} text={message.text} /> : null}
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.heading}>Please enter the OTP code that has been sent to your email.</Text>
                <View style={styles.otpContainer}>
                    {inputs.map((inp, index) => {
                        return (
                            <View key={index.toString()} style={styles.inputContainer} >
                                <TextInput
                                    value={OTP[index]}
                                    onChangeText={(text) => handleOnChange(text, index)}
                                    placeholder=''
                                    style={styles.input}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    ref={nextInputIndex === index ? input : null} />
                            </View>
                        );
                    })}
                </View>
                <TouchableOpacity style={styles.submitIcon} onPress={submitOTP}>
                    <FontAwesome6 name={'check'} size={20} color='#FFF' />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </>
    );
}

const { width } = Dimensions.get('window');
const inputWidth = Math.round(width / 6);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    heading: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 15
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: inputWidth / 2,
    },
    inputContainer: {
        width: inputWidth,
        height: inputWidth,
        borderWidth: 2,
        borderColor: '#E8363C',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        fontSize: 25,
        paddingHorizontal: 18
    },
    submitIcon: {
        alignSelf: 'center',
        padding: 20,
        backgroundColor: '#E8363C',
        borderRadius: 30,
        marginTop: 15
    }
});

export default Verification;