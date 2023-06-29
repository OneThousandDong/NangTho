import React, { useState } from 'react';
import { Button, Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import RecipeDetailScreen from "./src/main/RecipeDetailScreen";
import HomeScreen from "./src/main/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const { width: screenWidth } = Dimensions.get('window')
export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from "react-native-reanimated";

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
                    <Stack.Screen name="Item" component={RecipeDetailScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
    // const boxHeight = useSharedValue(60);
    // const [maxLines, setMaxLines] = useState(2);
    //
    // const truncatedAnimation = useAnimatedStyle(() => {
    //     return {
    //         height: withTiming(boxHeight.value, {duration: 1000}),
    //     };
    // }, []);
    //
    // function showText() {
    //     setTimeout(() => {
    //         maxLines === 2 ? setMaxLines(0) : setMaxLines(2);
    //     }, 400);
    //     boxHeight.value === 60 ? (boxHeight.value = 150) : (boxHeight.value = 60);
    // }
    //
    // return (
    //     <View style={styles.parent}>
    //         <Text style={styles.header}>React Native Reanimated Tutorial</Text>
    //         <View style={styles.box}>
    //             <Button
    //                 title={maxLines === 2 ? 'View more' : 'Close Dropdown'}
    //                 onPress={showText}
    //             />
    //             <Animated.View style={[{marginTop: 20}, truncatedAnimation]}>
    //                 <Text style={styles.textBody} numberOfLines={maxLines}>
    //                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
    //                     magnam necessitatibus dolores qui sunt? Mollitia nostrum placeat
    //                     esse commodi modi quaerat, et alias minima, eligendi ipsa
    //                     perspiciatis, totam quod dolorum.
    //                     {'\n'}
    //                     {'\n'}
    //                     Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur
    //                     magnam necessitatibus dolores qui sunt? Mollitia nostrum placeat
    //                     esse commodi modi quaerat, et alias minima, eligendi ipsa
    //                     perspiciatis, totam quod dolorum.
    //                 </Text>
    //             </Animated.View>
    //         </View>
    //     </View>
    // );
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