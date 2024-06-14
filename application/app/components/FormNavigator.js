import { StyleSheet, View } from 'react-native'
import React from 'react'
import AppLink from './AppLink';

const FormNavigator = ({ leftLinkText, rightLinkText, leftLinkPress, rightLinkPress }) => {
    return (
        <View style={styles.linkContainer}>
            <AppLink onPress={leftLinkPress} text={leftLinkText} />
            <AppLink onPress={rightLinkPress} text={rightLinkText} />
        </View>
    );
}

const styles = StyleSheet.create({
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

export default FormNavigator;