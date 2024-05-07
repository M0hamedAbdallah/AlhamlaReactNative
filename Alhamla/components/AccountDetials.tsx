import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AccountDetials = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <Text>AccountDetials</Text>
            </ScrollView>
        </View>
    )
}

export default AccountDetials

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: "80%"
    }
})