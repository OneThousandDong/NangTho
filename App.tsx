import React, { useState } from 'react';
import { Button, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import SettingScreen from "./src/main/SettingScreen";
import HomeScreen from "./src/main/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const App = (): React.ReactElement => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                    headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Setting" component={SettingScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    box: {
        backgroundColor: '#000',
        borderRadius: 15,
        padding: 20,
    },
    textBody: {
        fontSize: 20,
        marginBottom: 20,
        color: 'red'
    },
});

export default App;