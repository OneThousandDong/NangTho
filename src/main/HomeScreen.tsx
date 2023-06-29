import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions, ImageBackground, Easing, Button, Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import SPACING from "../config/SPACING";
import colors from "../config/Restaurant/colors";
import FastImage from "react-native-fast-image";
// import { Animated } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue, withDelay,
    withRepeat,
    withTiming,
    concat,
    withSequence
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const Pulse = ({ delay = 0, repeat }) => {
    const animation = useSharedValue(0);

    useEffect(() => {
        animation.value = withDelay(
            delay,
            withRepeat(withTiming(1, {
                duration: 2000,
            }),
                repeat ? -1 : 0,
                false
            ))
    }, []);
    // useEffect(() => {
    //     animation.value = withRepeat(withTiming(1, { duration: 200, easing: Easing.linear }), 6, true);
    //     const interval = setInterval(() => {
    //         animation.value = withRepeat(withTiming(1, { duration: 400 }), 6, true);
    //     }, 6000);
    //     return () => clearInterval(interval);
    // }, []);

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            animation.value,
            [0, 1.5],
            [0.6, 0],
            Extrapolate.CLAMP
        )
        return {
            opacity: opacity,
            transform: [{ scale: animation.value * 1.1 }]
        }
    })
    return <Animated.View style={[styles.circle, animatedStyles]} />
}

const HomeScreen = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
    }, []);
    // const animation = useSharedValue(0);
    // const spin = interpolate(
    //     animation.value,
    //     [0, 1],
    //     [40, 30],
    //     Extrapolate.CLAMP
    // )

    const startAnimation = () => {
        // withTiming(1,  { 
        //     duration: 200, 
        //     easing: Easing.linear 
        // })
        // Animated.timing(spin, {
        //     toValue: 1,
        //     duration: 200,
        //     easing: Easing.linear,
        //     useNativeDriver: false
        // }).start(() => startAnimation);
    }
    //
    // let spinValue = new Animated.Value(0);
    //
    // const startAnimation = () => {
    //     spinValue.setValue(0);
    //     Animated.timing(spinValue, {
    //         toValue: 1,
    //         duration: 200,
    //         easing: Easing.linear,
    //         useNativeDriver: false
    //     }).start(() => startAnimation);
    // }
    // const spin = spinValue.interpolate({
    //     inputRange: [0, 1],
    //     outputRange: ['40deg', '30deg']
    // })
    // let verticalVal = new Animated.Value(0)
    // const startFloating = () => {
    //     Animated.timing(verticalVal,
    //         {
    //             toValue: 50,
    //             duration: 1000,
    //             easing: Easing.inOut(Easing.quad),
    //             useNativeDriver: false,
    //         }).start(() => startFloating());
    //     // verticalVal.addListener(({value}) => {
    //     //     console.log(value)
    //     //     if (value == 50) {
    //     //         Animated.timing(verticalVal,
    //     //             {
    //     //                 toValue: 0,
    //     //                 duration: 1000,
    //     //                 easing: Easing.inOut(Easing.quad),
    //     //                 useNativeDriver: false,
    //     //             }
    //     //         ).start();
    //     //     } else if (value == 0) {
    //     //         Animated.timing(verticalVal,
    //     //             {
    //     //                 toValue: 50,
    //     //                 duration: 1000,
    //     //                 easing: Easing.inOut(Easing.quad),
    //     //                 useNativeDriver: false,
    //     //             }).start();
    //     //     }
    //     // })
    // }
    const [pulse, setPulse] = useState([1]);
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${rotation.value}deg` }],
            marginLeft: 150,
            marginTop: 10
        };
    });

    useEffect(() => {
        // rotation.value = withRepeat(withTiming(10, { duration: 400 }), 6, true);
        // const interval = setInterval(() => {
        //     rotation.value = withRepeat(withTiming(10, { duration: 400 }), 6, true);
        // }, 6000);
        // return () => clearInterval(interval);
        rotation.value = withRepeat(withTiming(10, {
                duration: 1500,
            }),
                -1,
                false
            )
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/back.jpg')} resizeMode={'cover'}
                   style={styles.backgroundImage}>
            <Pressable style={styles.backgroundImage} onPress={() => rotation.value = withRepeat(withTiming(0, { duration: 400 }), -1, false)}>
                <View style={{ flex: 1 }}>
                    {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Pressable
                        style={styles.innerCircle}
                        onPress={() => setPulse((prev) => [...prev, Math.random()])}
                    >
                        <FastImage
                            style={styles.innerCircle}
                            // source={require('../assets/11.png')}
                            source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/640px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg"}}
                            // resizeMode={FastImage.resizeMode.contain}
                        />
                    </Pressable>
                    {pulse.map((item, index) => (
                        <Pulse repeat={index === 0}/>
                    ))}
                </View> */}
                    <View style={{flexDirection: 'row',  marginBottom: 250, marginTop: 50}}>
                        <FastImage
                            style={{width: 200, height: 200}}
                            source={require('../assets/qiuqian.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <FastImage
                            style={{width: 200, height: 200}}
                            source={require('../assets/shaoxiang.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Pressable
                        >
                            <FastImage
                                style={styles.innerCircle}
                                source={require('../assets/11.png')}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </Pressable>
                    </View>
                    <Pressable
                        onPress={() => {
                            // console.log('Hii')
                            // startAnimation();
                            // startFloating();
                            // withRepeat(withTiming(1, {
                            //     duration: 2000,
                            // }),
                            //     repeat ? -1 : 0,
                            //     false
                            // ))
                            // rotation.value = withRepeat(withTiming(10), 2, true)
                            rotation.value = withRepeat(withTiming(1, { duration: 400 }), -1, false)
                            // rotation.value = withSequence(
                            //     withTiming(-10, { duration: 50 }),
                            //     withRepeat(withTiming(1, { duration: 100 }), 6, true),
                            //     withTiming(0, { duration: 50 })
                            //   );
                        }}
                        style={styles.stick}
                    >
                        <Animated.View style={animatedStyle}>
                            <View>
                                <FastImage
                                    style={{
                                        position: "absolute" , width: 200, height: 200,
                                        transform: [
                                            { translateY: - Dimensions.get('window').width * 0.5 },
                                            { rotateZ: '30deg' },],
                                    }}
                                    source={require('../assets/22.png')}
                                    resizeMode={FastImage.resizeMode.contain}
                                />
                            </View>
                        </Animated.View>
                    </Pressable>
                    <View style={{flexDirection: 'row', marginTop: 120}}>
                        <FastImage
                            style={{width: 200, height: 200}}
                            source={require('../assets/toutai.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        <FastImage
                            style={{width: 200, height: 200}}
                            source={require('../assets/zidong.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </View>
                </View>
            </Pressable>
            </ImageBackground>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    test: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        justifyContent: 'center',
    },
    circle: {
        width: 300,
        borderRadius: 150,
        height: 300,
        position: 'absolute',
        borderWidth: 3,
        borderColor: '#e91e63',
        backgroundColor: '#ff6090'
    },
    innerCircle: {
        width: 200,
        height: 200,
        // position: "absolute",
        // zIndex: 100,
        // borderRadius: 100,
    },
    stick: {
        // position: "absolute",
        marginTop: width / 3
    },
    box: {
        width: 200,
        height: 200,
    }
});
