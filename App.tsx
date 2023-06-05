import React, { useRef } from 'react';
import { Button, Dimensions, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import Carousel, { ParallaxImage } from 'react-native-carousel-slider-layout';
import HeaderApp from "./src/components/HeaderApp";
import SettingSvg from "./src/assets/ic_setting.svg";
import { SceneMap } from "react-native-tab-view";
import TabViewExample from "./src/navigation/TabView";
import RecipeDetailScreen from "./src/main/RecipeDetailScreen";
import DATA from "./src/config/Restaurant/DATA";
import WelcomeScreen from "./src/main/WelcomeScreen";
import HomeScreen from "./src/main/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
const { width: screenWidth } = Dimensions.get('window')
export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const App = (): React.ReactElement => {
    let isCarousel = useRef();
    // const _renderItem = (item: any) => {
    //     return (
    //         <View>
    //             <FastImage
    //                 source={{
    //                     uri: item.uri,
    //                     priority: FastImage.priority.high,
    //                 }}
    //             />
    //         </View>
    //     );
    // }
    // const _renderItem = ({item, index}, parallaxProps) => {
    //     return (
    //         <View style={styles.item}>
    //             <ParallaxImage
    //                 source={{ uri: item.uri }}
    //                 containerStyle={styles.imageContainer}
    //                 style={styles.image}
    //                 parallaxFactor={0.4}
    //                 {...parallaxProps}
    //             />
    //             {/*<Text style={styles.title} numberOfLines={2}>*/}
    //             {/*    { item.title }*/}
    //             {/*</Text>*/}
    //             <Text numberOfLines={2}>
    //                 Hii
    //             </Text>
    //         </View>
    //     );
    // }

    // const data = Array.from(Array(50).keys());
    // const data = [
    //     {uri: "data:image/jpeg;base64,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"},
    //     {uri: "data:image/jpeg;base64,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"},
    //     {uri: "data:image/jpeg;base64,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"}
    // ]
    const Stack = createNativeStackNavigator();
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                    headerShown: false
                    }}>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="Item" component={RecipeDetailScreen} />
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            {/*<RecipeDetailScreen recipe={DATA[0].recipes[1]} />*/}
            {/*<WelcomeScreen />*/}
            {/*<HomeScreen />*/}
            {/*<ScrollView>*/}
            {/*<Text>Daily Groceriess.</Text>*/}
            {/*<Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>*/}
            {/*/!*<ScrollView*!/*/}
            {/*/!*    // scrollEventThrottle={16}*!/*/}
            {/*/!*>*!/*/}
            {/*    <View>*/}
            {/*        <Text style={{fontSize: 24}}>*/}
            {/*            Nguyen*/}
            {/*        </Text>*/}
            {/*        <View style={{height: 130}}>*/}
            {/*            <ScrollView*/}
            {/*                horizontal={true}*/}
            {/*                showsHorizontalScrollIndicator={false}*/}
            {/*            >*/}
            {/*                <HeaderApp imageUri={require('./src/assets/img.png')} title="Demo1"/>*/}
            {/*                <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo2"}/>*/}
            {/*                <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo3"}/>*/}
            {/*                <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo3"}/>*/}
            {/*            </ScrollView>*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={{flexDirection: "row" }}>*/}
            {/*        <Text>*/}
            {/*            Select Demo*/}
            {/*        </Text>*/}
            {/*        <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*            <SettingSvg height={25} width={25} fill="blue" />*/}
            {/*        </View>*/}
            {/*    </View>*/}
            {/*    <View style={{flexDirection: "row" }}>*/}
            {/*        <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*            <Text>*/}
            {/*                Demo 1*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*        <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*            <Text>*/}
            {/*                Demo 1*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*        <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*            <Text>*/}
            {/*                Demo 1*/}
            {/*            </Text>*/}
            {/*        </View>*/}
            {/*        <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*            <Text>*/}
            {/*                Demo 1*/}
            {/*            </Text>*/}
            {/*        </View>*/}

            {/*    </View>*/}
            {/*    /!*<TabViewExample />*!/*/}
            {/*/!*</ScrollView>*!/*/}
            {/*<TabViewExample />*/}
            {/*    <View style={{flex: 1}}>*/}
            {/*        <View>*/}
            {/*            <Text style={{fontSize: 24}}>*/}
            {/*                Nguyen*/}
            {/*            </Text>*/}
            {/*            <View style={{height: 130}}>*/}
            {/*                <ScrollView*/}
            {/*                    horizontal={true}*/}
            {/*                    showsHorizontalScrollIndicator={false}*/}
            {/*                >*/}
            {/*                    <HeaderApp imageUri={require('./src/assets/img.png')} title="Demo1"/>*/}
            {/*                    <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo2"}/>*/}
            {/*                    <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo3"}/>*/}
            {/*                    <HeaderApp imageUri={require('./src/assets/img.png')} title={"Demo3"}/>*/}
            {/*                </ScrollView>*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*        <View style={{flexDirection: "row" }}>*/}
            {/*            <Text>*/}
            {/*                Select Demo*/}
            {/*            </Text>*/}
            {/*            <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*                <SettingSvg height={25} width={25} fill="blue" />*/}
            {/*            </View>*/}
            {/*        </View>*/}
            {/*        <View style={{flexDirection: "row" }}>*/}
            {/*            <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*                <Text>*/}
            {/*                    Demo 1*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*            <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*                <Text>*/}
            {/*                    Demo 1*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*            <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*                <Text>*/}
            {/*                    Demo 1*/}
            {/*                </Text>*/}
            {/*            </View>*/}
            {/*            <View style={{flex: 1, flexDirection: 'row'}}>*/}
            {/*                <Text>*/}
            {/*                    Demo 1*/}
            {/*                </Text>*/}
            {/*            </View>*/}

            {/*        </View>*/}
            {/*    </View>*/}
            {/*</ScrollView>*/}
        </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
    imageStyles: {
        width: '100%',
        height: 200
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});

export default App;