
import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, Switch, Button, Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import SPACING from "../config/SPACING";
import colors from "../config/Restaurant/colors";
import { RNLauncherKitHelper } from 'react-native-launcher-kit';
import BackgroundService from 'react-native-background-actions';
import { LocalStorage } from "../components/LocalStorage";
import InputCharge from "../assets/ic_input.svg";
import OutputCharge from "../assets/ic_output.svg";
import MinCharge from "../assets/ic_input.svg";
import MaxCharge from "../assets/ic_input.svg";
import ProgressCircle from 'progress-circle-react-native'
import TrackPlayer, { Capability, State, usePlaybackState } from "react-native-track-player";
import AsyncStorage from "@react-native-async-storage/async-storage";


const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = ({ navigation }) => {
    const playbackState = usePlaybackState();
    const [isEnableInput, setIsEnableInput] = useState(false);
    const [isEnableOutput, setIsEnableOutput] = useState(false);
    const [isEnableMin, setIsEnableMin] = useState(false);
    const [isEnableMax, setIsEnableMax] = useState(false);
    const [percentBattery, setPercentBattery] = useState(0);
    const [isCharging, setIsCharging] = useState(false);
    const [mp3Uri, setMp3Uri] = useState("");
    useEffect(() => {
        initData();
    }, [])
    const initData = async () => {
        const result = await RNLauncherKitHelper.getBatteryStatus();
        setPercentBattery(result?.level);
        // setIsCharging(result?.isCharging);
        const dataInput = await LocalStorage.getData("inputEnable");
        if (dataInput == "1") {
            setIsEnableInput(true);
        } else {
            setIsEnableInput(false);
        }
        await setupPlayer();
        const mp3Uri = await AsyncStorage.getItem('mp3UriInput');
        if (mp3Uri !== null) {
            setMp3Uri(mp3Uri);
        }
    }
    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Stop,
                ],

                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToNext, Capability.SkipToPrevious, Capability.Stop],

                // Icons for the notification on Android (if you don't like the default ones)
            });
        } catch (e) {
        }
    }
    const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve(), time));
    const veryIntensiveTask = async (taskDataArguments: any) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            // Alert.alert(playbackState.toString(), 'My Alert Msg', [
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            // ]);
            let checkPlay = false;
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log('Hi Mars');
                console.log(playbackState)

                const dataInput = await LocalStorage.getData("inputEnable");
                const charging = await RNLauncherKitHelper.getBatteryStatus();
                if (checkPlay) {
                    continue;
                }
                if (!charging) {
                    await TrackPlayer.pause();
                    await TrackPlayer.reset();
                    continue;
                }
                if (dataInput == "1") {
                    if (charging) {
                        // if (playbackState === State.Paused) {
                        await TrackPlayer.reset();
                        await TrackPlayer.add([{ url: "file://" + mp3Uri }]);
                        await TrackPlayer.remove(0)
                        await TrackPlayer.skip(0)
                        await TrackPlayer.play();
                        checkPlay = true;
                        // }
                    } else {
                        // await TrackPlayer.pause();
                        // await TrackPlayer.reset();
                    }
                } else {
                    // await TrackPlayer.pause();
                }
                // await BackgroundService.updateNotification({
                // taskDesc: 'New ExampleTask description' + i
                // })
                await sleep(delay);
            }
        });
    };

    const options = {
        taskName: 'Example',
        taskTitle: 'ExampleTask title',
        taskDesc: 'ExampleTask description',
        taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 1000,
        },
    };

    const startBackgroundService = async () => {
        await BackgroundService.start(veryIntensiveTask, options);
        await BackgroundService.updateNotification({ taskDesc: 'New ExampleTask description' });
    }
    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ padding: SPACING * 2 }}>
                    <View
                        style={{ flexDirection: "row", justifyContent: "space-between" }}
                    >
                        <Button title={"Start Background"} onPress={startBackgroundService} />
                        <Button title={"Stop Background"} onPress={stopBackgroundService} />
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image
                                style={{
                                    width: SPACING * 4.5,
                                    height: SPACING * 4.5,
                                    borderRadius: SPACING * 3,
                                    marginRight: SPACING,
                                }}
                                source={require("../assets/restaurant/avatar.jpg")}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 1.7,
                                    fontWeight: "800",
                                    color: colors.dark,
                                }}
                            >
                                Erikaasav
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text
                                style={{
                                    fontSize: SPACING * 1.7,
                                    fontWeight: "800",
                                    color: colors.dark,
                                    // right: -200
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                Setting
                            </Text>
                        </View>
                    </View>
                    <View style={{ width: "100%", marginTop: SPACING * 2, backgroundColor: '#CE8D8D' }}>
                        <Text style={{ fontSize: SPACING * 3, fontWeight: "700" }}>
                            Phan tram hien tai {percentBattery} %
                            Thoi Tiet Nhiet do
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginVertical: SPACING * 2.5,
                        }}
                    >
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('InputCharger')}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <InputCharge height={40} width={40} />
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnableInput ? '#f5dd4b' : '#f4f3f4'}
                                    value={isEnableInput}
                                    onValueChange={async (value) => {
                                        console.log('Value Change')
                                        setIsEnableInput(value);
                                        await LocalStorage.storeData('inputEnable', value ? "1" : "0");
                                    }}
                                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], marginLeft: 50 }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                Input Charger
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('OutputCharger')}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <OutputCharge height={40} width={40} />
                                </View>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnableOutput ? '#f5dd4b' : '#f4f3f4'}
                                    value={isEnableOutput}
                                    onValueChange={async (value) => {
                                        setIsEnableOutput(value);
                                        await LocalStorage.storeData('outputEnable', value ? "1" : "0");
                                    }}
                                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], marginLeft: 50 }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                Output Charger
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('MinCharger')}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <OutputCharge height={40} width={40} />
                                </View>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnableMin ? '#f5dd4b' : '#f4f3f4'}
                                    value={isEnableMin}
                                    onValueChange={async (value) => {
                                        setIsEnableMin(value);
                                        await LocalStorage.storeData('minEnable', value ? "1" : "0");
                                    }}
                                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], marginLeft: 50 }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                Min Charger
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.itemContainer}
                            onPress={() => navigation.navigate('MaxCharger')}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <OutputCharge height={40} width={40} />
                                </View>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnableMax ? '#f5dd4b' : '#f4f3f4'}
                                    value={isEnableMax}
                                    onValueChange={async (value) => {
                                        setIsEnableMax(value);
                                        await LocalStorage.storeData('maxEnable', value ? "1" : "0");
                                    }}
                                    style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }], marginLeft: 50 }}
                                />
                            </View>
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                MaxCharger
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH, marginBottom: SPACING * 2, backgroundColor: "#33ccff",
        borderRadius: SPACING * 2, padding: SPACING * 2
    }
});

export default HomeScreen;
