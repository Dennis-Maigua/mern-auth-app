import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { StackActions, useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();

    const handleLogOut = async (userId) => {
        navigation.dispatch(
            StackActions.replace('logIn', {})
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.pageTitle}>Welcome to Mern-Auth-App!</Text>
            <Pressable style={styles.button} onPress={handleLogOut}>
                <Text style={styles.text}>Log Out</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        marginBottom: 20,
        textAlign: 'center',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#E8363C',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    }
});