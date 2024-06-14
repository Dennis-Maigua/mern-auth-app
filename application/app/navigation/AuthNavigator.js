import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import ForgotPassword from '../components/ForgotPassword';
import Verification from '../components/Verification';
import Home from '../components/Home';

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="logIn" component={Login} />
            <Stack.Screen name="signUp" component={SignUp} />
            <Stack.Screen name="forgotPassword" component={ForgotPassword} />
            <Stack.Screen name="verification" component={Verification} />
            <Stack.Screen name="home" component={Home} />
        </Stack.Navigator>
    );
}