import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Button, Platform, StyleSheet, Text, TextInput, View } from 'react-native';


const save = async (key: string, value: string) => {
    if (Platform.OS === 'web') {
        localStorage.setItem(key, value)
    } else {
        await SecureStore.setItemAsync(key, value)
    }
}

const getValueFor = async (key: string) => {
    let result;
    if (Platform.OS === 'web') {
        result = localStorage.getItem(key)
    } else {
        result = await SecureStore.getItemAsync(key)
    }
    if (result) {
        alert("🔐 Here's your value 🔐 \n" + result);
    } else {
        alert('No values stored under that key.');
    }
}

export default function SecureStoreExample() {
    const [key, onChangeKey] = useState('Your key here');
    const [value, onChangeValue] = useState('Your value here');

    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
            { }

            <TextInput
                style={styles.textInput}
                clearTextOnFocus
                onChangeText={text => onChangeKey(text)}
                value={key}
            />
            <TextInput
                style={styles.textInput}
                clearTextOnFocus
                onChangeText={text => onChangeValue(text)}
                value={value}
            />
            { }
            <Button
                title="Save this key/value pair"
                onPress={() => {
                    save(key, value);
                    onChangeKey('Your key here');
                    onChangeValue('Your value here');
                }}
            />
            <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
            <TextInput
                style={styles.textInput}
                onSubmitEditing={event => {
                    getValueFor(event.nativeEvent.text);
                }}
                placeholder="Enter the key for the value you want to get"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        marginTop: 34,
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInput: {
        height: 35,
        borderColor: 'gray',
        borderWidth: 0.5,
        padding: 4,
    },
});
