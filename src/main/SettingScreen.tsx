import React, { useState } from "react";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Switch
} from "react-native";

import SPACING from "../config/SPACING";
import BackSvg from "../assets/ic_back.svg";
import Lotus from "../assets/ic_lotus.svg";
import InputSpinner from "react-native-input-spinner";
import { LocalStorage } from "./LocalStorage";
import SwitchCustom from "./config/SwitchCustom";

const SettingScreen = ({route, navigation}) => {
    let repeat = route?.params?.repeat;
    const numRepeat = route?.params?.numberRepeat;
    const soundMood = route?.params?.sound;
    const [mood, setMood] = useState(null);
    const [numberRepeat, setNumberRepeat] = useState(0);
    const [isEnableInput, setIsEnableInput] = useState(null);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                    }}
                    onPress={() => navigation.navigate('Home', {
                        repeat: isEnableInput != null ? isEnableInput : repeat,
                        repeatN: numberRepeat,
                        soundMood: mood
                    })}
                >
                    <BackSvg height={20} width={20}/>
                </TouchableOpacity>
                <Lotus height={45} width={45}/>
                <View style={styles.title}></View>
            </View>
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 16, padding: 8}}>
                        Tự động gõ
                    </Text>
                    {/*<Switch*/}
                    {/*    value={isEnableInput != null ? isEnableInput : repeat}*/}
                    {/*    onValueChange={async (value) => {*/}
                    {/*        setIsEnableInput(value);*/}
                    {/*        await LocalStorage.storeData('inputEnable', value ? "1" : "0");*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <SwitchCustom
                        value={isEnableInput != null ? isEnableInput : repeat}
                        onValueChange={async (value) => {
                            setIsEnableInput(value);
                            await LocalStorage.storeData('inputEnable', value ? "1" : "0");
                        }}
                        activeColor={'#79ff4d'}
                        inActiveColor={'#F2F5F7'}/>
                </View>
                <View>
                    <InputSpinner
                        max={5}
                        min={1}
                        step={1}
                        value={numRepeat}
                        onChange={async (num) => {
                            setNumberRepeat(num);
                            await LocalStorage.storeData('numberRepeat', num?.toString());
                        }}
                        append={<Text style={{fontWeight: 'bold',}}>lần / giây</Text>}
                        width={200}
                        colorLeft={'none'}
                        colorPress="none"
                        color={'none'}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    {
                        ['Âm thanh 1', 'Âm thanh 2'].map((sound, index) => {
                            return (
                                <TouchableOpacity
                                    key={sound}
                                    onPress={async () => {
                                        setMood(sound);
                                        await LocalStorage.storeData('mood', sound);
                                    }}
                                    style={styles.box}
                                >
                                    {
                                        (mood == null && !soundMood) ? (index == 0 ? (
                                                    <Text style={[styles.boxText, styles.boxTextMood]}>{sound}</Text>) :
                                                <Text style={styles.boxText}>{sound}</Text>) :
                                            (mood ? mood === sound : soundMood == sound) ? (
                                                <Text style={[styles.boxText, styles.boxTextMood]}>{sound}</Text>
                                            ) : (
                                                <Text style={styles.boxText}>{sound}</Text>)
                                    }

                                    {/*{(mood ? mood === sound : soundMood == sound) ? (*/}
                                    {/*    <Text style={[styles.boxText, styles.boxTextMood]}>{sound}</Text>*/}
                                    {/*) : (*/}
                                    {/*    <Text style={styles.boxText}>{sound}</Text>*/}
                                    {/*)}*/}

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING * 6,
    },
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    box: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        height: 50,

    },
    boxText: {
        borderColor: '#ccccb3',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10
    },
    boxTextMood: {
        backgroundColor: '#c3c3a2',
    }
});

export default SettingScreen;
