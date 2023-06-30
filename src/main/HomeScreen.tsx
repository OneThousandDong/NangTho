import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions, ImageBackground, Easing, Button, Pressable, TouchableWithoutFeedback,
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
    withSequence, withSpring, useDerivedValue
} from "react-native-reanimated";
import AnimatedView from "react-native-reanimated/lib/types/reanimated2/component/View";

const {width} = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const Pulse = ({delay = 0, repeat}) => {
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
            transform: [{scale: animation.value * 1.1}]
        }
    })
    return <Animated.View style={[styles.circle, animatedStyles]}/>
}

const Stick = () => {
    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${rotation.value}deg`}],
        };
    });
    return (
        <>
            <Animated.View style={[styles.box, animatedStyle]}/>
            <Button
                title="wobble"
                onPress={() => {
                    // will be filled in later
                    rotation.value = withRepeat(withTiming(10), 6, true)
                }}
            />
        </>
    );
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
        // rotation.value = withTiming(width / 2, {duration: 1000})
        rotation.value = withSequence(
            withTiming(0, {duration: 100}),
            // withTiming(-(width / 2), {duration: 600}),
            withTiming(10, {duration: 100})
        )
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
    // const spin = useDerivedValue(() => {
    //     return interpolate(rotation.value,
    //         [0, 10],
    //        [0, 20]
    //     )
    // })

    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         transform: [{ rotateZ: `${(rotation.value)}deg` }],
    //         marginLeft: 150,
    //         marginTop: 100
    //     };
    // });
    const isOpen = useSharedValue(false);
    const onPress = React.useCallback(() => {
        isOpen.value = !isOpen.value;
    }, [isOpen]);
    const animatedStyle = useAnimatedStyle(() => {
        // const toValue = isOpen.value ? 100 : 0;
        // const timing = withTiming(toValue, {duration: 1000, easing: Easing.linear});
        // console.log()
        return {
            transform: [
                {
                    // rotate: `${toValue}deg`, // deg required for android
                    //rotate: timing, // this works for iOS not Android
                    // translateX: rotation.value
                    rotateZ: `${(rotation.value)}deg`
                },
            ],
        };
    });

    useEffect(() => {
        // rotation.value = withRepeat(withTiming(10, { duration: 400 }), 6, true);
        // const interval = setInterval(() => {
        //     rotation.value = withRepeat(withTiming(10, { duration: 400 }), 6, true);
        // }, 6000);
        // return () => clearInterval(interval);
        // rotation.value = withRepeat(withTiming(10, {
        //         duration: 1500,
        //     }),
        //         -1,
        //         false
        //     )
        // rotation.value = withRepeat(withTiming(10), 2, true)
        // rotation.value = withRepeat(withTiming(1, { duration: 400 }), -1, false)
        console.log(rotation.value)
    }, [])

    return (
        // <SafeAreaView style={{ flex: 1 }}>
        //     <ImageBackground source={require('../assets/back.jpg')} resizeMode={'cover'}
        //            style={styles.backgroundImage}>
        //     <Pressable style={styles.backgroundImage} onPress={() => rotation.value = withRepeat(withTiming(0, { duration: 400 }), -1, false)}>
        //         <View style={{ flex: 1 }}>
        //             <Stick />
        //             {/* <View style={{alignItems: 'center', justifyContent: 'center'}}>
        //             <Pressable
        //                 style={styles.innerCircle}
        //                 onPress={() => setPulse((prev) => [...prev, Math.random()])}
        //             >
        //                 <FastImage
        //                     style={styles.innerCircle}
        //                     // source={require('../assets/11.png')}
        //                     source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/640px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg"}}
        //                     // resizeMode={FastImage.resizeMode.contain}
        //                 />
        //             </Pressable>
        //             {pulse.map((item, index) => (
        //                 <Pulse repeat={index === 0}/>
        //             ))}
        //         </View> */}
        //             {/*<View style={{flexDirection: 'row',  marginBottom: 250, marginTop: 50}}>*/}
        //             {/*    <FastImage*/}
        //             {/*        style={{width: 200, height: 200}}*/}
        //             {/*        source={require('../assets/qiuqian.png')}*/}
        //             {/*        resizeMode={FastImage.resizeMode.contain}*/}
        //             {/*    />*/}
        //             {/*    <FastImage*/}
        //             {/*        style={{width: 200, height: 200}}*/}
        //             {/*        source={require('../assets/shaoxiang.png')}*/}
        //             {/*        resizeMode={FastImage.resizeMode.contain}*/}
        //             {/*    />*/}
        //             {/*</View>*/}
        //             {/*<View style={{ alignItems: 'center', justifyContent: 'center' }}>*/}
        //             {/*    <Pressable*/}
        //             {/*    >*/}
        //             {/*        <FastImage*/}
        //             {/*            style={styles.innerCircle}*/}
        //             {/*            source={require('../assets/11.png')}*/}
        //             {/*            resizeMode={FastImage.resizeMode.contain}*/}
        //             {/*        />*/}
        //             {/*    </Pressable>*/}
        //             {/*</View>*/}
        //             <Pressable
        //                 onPress={() => {
        //                     // console.log('Hii')
        //                     // startAnimation();
        //                     // startFloating();
        //                     // withRepeat(withTiming(1, {
        //                     //     duration: 2000,
        //                     // }),
        //                     //     repeat ? -1 : 0,
        //                     //     false
        //                     // ))
        //                     // rotation.value = withRepeat(withTiming(10), 2, true)
        //                     // rotation.value = withRepeat(withTiming(1, { duration: 400 }), -1, false)
        //                     // rotation.value = withSpring(Math.random());
        //                     // console.log(rotation.value)
        //                     // rotation.value = withSequence(
        //                     //     withTiming(-10, { duration: 50 }),
        //                     //     withRepeat(withTiming(1, { duration: 100 }), 6, true),
        //                     //     withTiming(0, { duration: 50 })
        //                     //   );
        //                     rotation.value = withTiming(20, {duration: 200})
        //                     onPress()
        //                 }}
        //                 style={styles.stick}
        //             >
        //                 <Animated.View style={animatedStyle}>
        //                     <View>
        //                         <FastImage
        //                             style={{
        //                                 position: "absolute" , width: 200, height: 200,
        //                                 transform: [
        //                                     { translateY: - Dimensions.get('window').width * 0.5 },
        //                                     { rotateZ: '30deg' },],
        //                             }}
        //                             source={require('../assets/22.png')}
        //                             resizeMode={FastImage.resizeMode.contain}
        //                         />
        //                     </View>
        //                 </Animated.View>
        //             </Pressable>
        //             {/*<View style={{flexDirection: 'row', marginTop: 120}}>*/}
        //             {/*    <FastImage*/}
        //             {/*        style={{width: 200, height: 200}}*/}
        //             {/*        source={require('../assets/toutai.png')}*/}
        //             {/*        resizeMode={FastImage.resizeMode.contain}*/}
        //             {/*    />*/}
        //             {/*    <FastImage*/}
        //             {/*        style={{width: 200, height: 200}}*/}
        //             {/*        source={require('../assets/zidong.png')}*/}
        //             {/*        resizeMode={FastImage.resizeMode.contain}*/}
        //             {/*    />*/}
        //             {/*</View>*/}
        //         </View>
        //     </Pressable>
        //     </ImageBackground>
        // </SafeAreaView>
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => startAnimation()}>
                {/*<Animated.View style={[styles.box, animatedStyle]}/>*/}
                <Animated.View style={animatedStyle}>
                        <FastImage
                            style={{
                                position: "absolute", width: 200, height: 200,
                                transform: [
                                    {translateY: -Dimensions.get('window').width * 0.5},
                                    {rotateZ: '30deg'},],
                            }}
                            source={require('../assets/22.png')}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
);
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
            justifyContent
    :
        'center',
            alignItems
    :
        'center'
    }
,
    box: {
        width: 150,
            height
    :
        150,
            backgroundColor
    :
        '#631d94',
    }
,
    test: {
        position: 'absolute',
            top
    :
        0,
            bottom
    :
        0,
            left
    :
        0,
            right
    :
        0
    }
,
    backgroundImage: {
        flex: 1,
            resizeMode
    :
        'cover', // or 'stretch',
            justifyContent
    :
        'center',
    }
,
    circle: {
        width: 300,
            borderRadius
    :
        150,
            height
    :
        300,
            position
    :
        'absolute',
            borderWidth
    :
        3,
            borderColor
    :
        '#e91e63',
            backgroundColor
    :
        '#ff6090'
    }
,
    innerCircle: {
        width: 200,
            height
    :
        200,
        // position: "absolute",
        // zIndex: 100,
        // borderRadius: 100,
    }
,
    stick: {
        // position: "absolute",
        marginTop: width / 3
    }
});
