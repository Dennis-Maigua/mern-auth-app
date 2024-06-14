import { Animated, StyleSheet, Text } from 'react-native';
import React, { useEffect, useRef } from 'react';

const AppNotification = ({ type, text }) => {
    const height = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(height, {
            toValue: 40,
            duration: 500,
            useNativeDriver: false
        }).start()
    }, []);

    const backgroundColor = type === 'error' ? 'rgba(234, 67, 55, 0.7)' : 'rgba(75, 181, 67, 0.7)';

    return (
        <Animated.View style={[styles.container, { height, backgroundColor }]}>
            <Text style={styles.notification}>{text}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    notification: {
        color: '#FFF',
        fontSize: 16
    }
});

export default AppNotification;