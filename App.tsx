import React from 'react';
import { Dimensions, Platform, StyleSheet } from 'react-native';
import WelcomeScreen from "./src/main/WelcomeScreen";
import HomeScreen from "./src/main/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import InputCharger from "./src/main/InputCharger";
import OutputCharger from "./src/main/OutputCharger";
import MinimumCharger from "./src/main/MinimumCharger";
import MaximumCharger from "./src/main/MaximumCharger";
const { width: screenWidth } = Dimensions.get('window')
export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const App = (): React.ReactElement => {
    const Stack = createNativeStackNavigator();
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                    headerShown: false
                    }}>
                    {/*<Stack.Screen name="Welcome" component={WelcomeScreen} />*/}
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="InputCharger" component={InputCharger} />
                    <Stack.Screen name="OutputCharger" component={OutputCharger} />
                    <Stack.Screen name="MinCharger" component={MinimumCharger} />
                    <Stack.Screen name="MaxCharger" component={MaximumCharger} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

const styles = StyleSheet.create({
});

export default App;