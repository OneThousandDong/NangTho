import {
    SafeAreaView,
    StyleSheet,
    View, ImageBackground,
    TouchableOpacity,
    Text,
    Switch
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import FastImage from "react-native-fast-image";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    withSequence, Extrapolation
} from "react-native-reanimated";
import Sound from 'react-native-sound';
import Lotus from "../assets/ic_lotus.svg";
import Lottie from 'lottie-react-native';
import { LocalStorage } from "./LocalStorage";
import SwitchCustom from "./config/SwitchCustom";

const HomeScreen = ({route, navigation}) => {
    const repeat = route?.params?.repeat;
    const repeatNumP = route?.params?.repeatN;
    const mood = route?.params?.soundMood;
    const [count, setCount] = useState(0);
    const [repeatNum, setRepeatNum] = useState(0);
    const [isEnableInput, setIsEnableInput] = useState(false);
    const [repeatLocal, setRepeatLocal] = useState(false);
    const [soundMood, setSoundMood] = useState("");
    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const getRepeat = await LocalStorage.getData('inputEnable');
        if (getRepeat) {
            setRepeatLocal(getRepeat == "1");
        }
        const getRepeatNum = await LocalStorage.getData('numberRepeat');
        if (getRepeatNum) {
            setRepeatNum(Number(getRepeatNum));
        }
        const getSoundMood = await LocalStorage.getData('mood');
        if (getSoundMood) {
            setSoundMood(getSoundMood);
        }
        const getCount = await LocalStorage.getData('count');
        if (getCount) {
            setCount(Number(getCount));
        }
    }
    const interval = useRef(null)
    const startRepeat = (num: number) => interval.current = setInterval(() => {
        startAnimation();
    }, (1000 / num))

    const stopRepeat = () => clearInterval(interval.current)

    const soundPlay = (sound: any) => {
        Sound.setCategory('Playback');
        const soundVar = new Sound(sound, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('====================================');
                console.log('Error Sound');
                console.log('====================================');
            } else {
                soundVar.play(() => {
                    soundVar.release()
                })
            }
        })
        setTimeout(() => {
            soundVar.play((success) => {
                if (success) {
                    soundVar.release();
                    console.log('successfully');
                } else {
                    console.log('failed');
                }
            });
        }, 100)
    }
    const startAnimation = () => {
        rotation.value = withSequence(
            withTiming(0, {duration: 100}),
            // withTiming(-(width / 2), {duration: 600}),
            withTiming(10, {duration: 100})
        );
        if (mood) {
            if (mood === 'Âm thanh 1') {
                soundPlay(require('../assets/1.mp3'));
            } else {
                soundPlay(require('../assets/2.mp3'));
            }
        } else {
            if (soundMood === 'Âm thanh 1') {
                soundPlay(require('../assets/1.mp3'));
            } else {
                soundPlay(require('../assets/2.mp3'));
            }
        }
        setCount(count => count + 1);
        scale.value = 1.1;
        scaleW.value = 1.1;
        LocalStorage.storeData("count", (count + 1).toString());
    }

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(rotation.value,
            [-10, -25], [6, 0],
            {extrapolateRight: Extrapolation.IDENTITY});

        return {
            transform: [
                {rotateZ: `${(scale)}deg`},
                {translateY: -scale * 3.6},
            ],
            marginLeft: 150,
        };
    });
    const scale = useSharedValue(0)
    const animatedStyleText = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(scale.value,
                        {duration: 100},
                        () => scale.value = 1)
                },
            ],
        };
    });
    const scaleW = useSharedValue(0)
    const animatedStyleW = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: withTiming(scaleW.value, {duration: 100},
                        () => scaleW.value = 1)
                },
            ],
        };
    });

    return (
        <SafeAreaView style={{flex: 1}}>
            {/*<ImageBackground source={require('../assets/back.jpg')} resizeMode={'cover'}*/}
            {/*                 style={styles.backgroundImage}>*/}
                <View style={styles.lotus}>
                    <TouchableOpacity
                        onPress={async () => {
                            const repeatN = await LocalStorage.getData('numberRepeat');
                            const repeat = await LocalStorage.getData('inputEnable');
                            const soundMood = await LocalStorage.getData('mood');
                            navigation.navigate('Setting',
                                {numberRepeat: repeatN, repeat: repeat == "1", sound: soundMood})
                        }}>
                        <Lotus height={45} width={45}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={() => startAnimation()}>
                    {/*<Lottie source={require('../assets/lotus-flower.json')} autoPlay loop />*/}
                    <View style={{flex: 1, flexDirection: 'row', marginTop: 50}}>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.View style={[styles.lotus, animatedStyleW]}>
                            {/*<FastImage*/}
                            {/*    style={styles.innerCircle}*/}
                            {/*    source={require('../assets/11.png')}*/}
                            {/*    resizeMode={FastImage.resizeMode.contain}*/}
                            {/*/>*/}
                        </Animated.View>
                    </View>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Animated.View style={[animatedStyle]}>
                            {/*<FastImage*/}
                            {/*    style={{*/}
                            {/*        width: 200, height: 200,*/}
                            {/*        transform: [*/}
                            {/*            { rotateZ: '32deg' }*/}
                            {/*        ],*/}
                            {/*    }}*/}
                            {/*    source={require('../assets/22.png')}*/}
                            {/*    resizeMode={FastImage.resizeMode.contain}*/}
                            {/*/>*/}
                        </Animated.View>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Animated.View style={[styles.lotus, animatedStyleText]}>
                            <Text
                                style={{
                                    transform: [{scale: 1.1}],
                                    color: '#F9F7F6',
                                    fontWeight: 'bold',
                                    fontSize: 20,
                                    fontFamily: 'Cochin',
                                    paddingBottom: 10
                                }}>
                                {count}
                            </Text>
                        </Animated.View>
                        {repeat || repeatLocal ? (
                            // <Switch
                            //     value={isEnableInput}
                            //     onValueChange={async (value) => {
                            //         // const getRepeatNum = await LocalStorage.getData('numberRepeat');
                            //         setIsEnableInput(value);
                            //         if (value) {
                            //             startRepeat(repeatNumP ? repeatNumP : repeatNum);
                            //         } else {
                            //             stopRepeat();
                            //         }
                            //     }}
                            // />
                            <SwitchCustom
                                value={false}
                                onValueChange={(value) => {
                                    // if (value) {
                                    //     startRepeat(repeatNumP ? repeatNumP : repeatNum);
                                    // } else {
                                    //     stopRepeat();
                                    // }
                                }}
                                activeColor={'#79ff4d'}
                                inActiveColor={'#F2F5F7'}/>
                        ) : null}
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', paddingTop: 20}}>
                    </View>
                </TouchableOpacity>
            {/*</ImageBackground>*/}
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lotus: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        justifyContent: 'center',
    },
    innerCircle: {
        // paddingTop: 15,
        width: 200,
        height: 200,
        position: "absolute",
        top: 0,
        bottom: 0,
        // left: 0,
        // right: 0
    }
});
