import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions, Switch, Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import SPACING from "../config/SPACING";
import colors from "../config/Restaurant/colors";
import { RNLauncherKitHelper } from 'react-native-launcher-kit';
import BackgroundService from 'react-native-background-actions';
import { LocalStorage } from "../components/LocalStorage";

const {width} = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = ({navigation}) => {
    const [isEnableInput, setIsEnableInput] = useState(false);
    const [isEnableOutput, setIsEnableOutput] = useState(false);
    const [isEnableMin, setIsEnableMin] = useState(false);
    const [isEnableMax, setIsEnableMax] = useState(false);
    const [percentBattery, setPercentBattery] = useState(0);
    const [isCharging, setIsCharging] = useState(false);

    useEffect(() => {
        initData();
    }, [])
    const initData = async () => {
        const result = await RNLauncherKitHelper.getBatteryStatus();
        setPercentBattery(result?.level);
        setIsCharging(result?.isCharging);
        const dataInput = await LocalStorage.getData("inputEnable");
        if (dataInput == "1") {
            setIsEnableInput(true);
        } else {
            setIsEnableInput(false);
        }
    }

    const sleep = (time: any) => new Promise((resolve) => setTimeout(() => resolve(), time));
    const veryIntensiveTask = async (taskDataArguments: any) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise( async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                console.log(i);
                // call api ???
                if (percentBattery >= 50) {
                    console.log('Hi Word')
                }
                await BackgroundService.updateNotification({
                taskDesc: 'New ExampleTask description' + i
                })
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
        await BackgroundService.updateNotification({taskDesc: 'New ExampleTask description'});
    }
    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{padding: SPACING * 2}}>
                    <View
                        style={{flexDirection: "row", justifyContent: "space-between"}}
                    >
                        {/*<Button title={"Start Background"} onPress={startBackgroundService}/>*/}
                        {/*<Button title={"Stop Background"} onPress={stopBackgroundService}/>*/}
                        <View style={{flexDirection: "row", alignItems: "center"}}>
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
                        <View style={{flexDirection: "row", alignItems: "center"}}>
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
                    <View style={{width: "100%", marginTop: SPACING * 2, backgroundColor: '#CE8D8D'}}>
                        <Text style={{fontSize: SPACING * 3, fontWeight: "700"}}>
                            Phan tram hien tai {percentBattery} %
                            Thoi Tiet Nhiet do
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            marginVertical: SPACING * 2,
                        }}
                    >
                        <TouchableOpacity
                            style={{width: ITEM_WIDTH, marginBottom: SPACING * 2}}
                            onPress={() => navigation.navigate('InputCharger')}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: ITEM_WIDTH + SPACING * 3,
                                    borderRadius: SPACING * 2,
                                }}
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 2,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                {/*{item.name}*/}
                                Input Charger
                            </Text>
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        fontSize: SPACING * 1.5,*/}
                            {/*        color: colors.gray,*/}
                            {/*        marginVertical: SPACING / 2,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Today discount*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>*/}
                            {/*    $ 10*/}
                            {/*</Text>*/}
                            <Switch
                                value={isEnableInput}
                                onValueChange={async (value) => {
                                    setIsEnableInput(value);
                                    await LocalStorage.storeData('inputEnable', value ? "1" : "0");
                                }}
                                style={{transform: [{scaleX: .8}, {scaleY: .8}] }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: ITEM_WIDTH, marginBottom: SPACING * 2}}
                            onPress={() => navigation.navigate('OutputCharger')}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: ITEM_WIDTH + SPACING * 3,
                                    borderRadius: SPACING * 2,
                                }}
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 2,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                {/*{item.name}*/}
                                Output Charger
                            </Text>
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        fontSize: SPACING * 1.5,*/}
                            {/*        color: colors.gray,*/}
                            {/*        marginVertical: SPACING / 2,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Today discount*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>*/}
                            {/*    $ 10*/}
                            {/*</Text>*/}
                            <Switch
                                value={isEnableOutput}
                                onValueChange={async (value) => {
                                    setIsEnableOutput(value);
                                    await LocalStorage.storeData('outputEnable', value ? "1" : "0");
                                }}
                                style={{transform: [{scaleX: .8}, {scaleY: .8}] }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: ITEM_WIDTH, marginBottom: SPACING * 2}}
                            onPress={() => navigation.navigate('MinCharger')}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: ITEM_WIDTH + SPACING * 3,
                                    borderRadius: SPACING * 2,
                                }}
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 2,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                {/*{item.name}*/}
                                Min Charger
                            </Text>
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        fontSize: SPACING * 1.5,*/}
                            {/*        color: colors.gray,*/}
                            {/*        marginVertical: SPACING / 2,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Today discount*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>*/}
                            {/*    $ 10*/}
                            {/*</Text>*/}
                            <Switch
                                value={isEnableMin}
                                onValueChange={async (value) => {
                                    setIsEnableMin(value);
                                    await LocalStorage.storeData('minEnable', value ? "1" : "0");
                                }}
                                style={{transform: [{scaleX: .8}, {scaleY: .8}] }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{width: ITEM_WIDTH, marginBottom: SPACING * 2}}
                            onPress={() => navigation.navigate('MaxCharger')}
                        >
                            <Image
                                style={{
                                    width: "100%",
                                    height: ITEM_WIDTH + SPACING * 3,
                                    borderRadius: SPACING * 2,
                                }}
                                source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                            />
                            <Text
                                style={{
                                    fontSize: SPACING * 2,
                                    fontWeight: "700",
                                    marginTop: SPACING,
                                }}
                            >
                                {/*{item.name}*/}
                                MaxCharger
                            </Text>
                            {/*<Text*/}
                            {/*    style={{*/}
                            {/*        fontSize: SPACING * 1.5,*/}
                            {/*        color: colors.gray,*/}
                            {/*        marginVertical: SPACING / 2,*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Today discount*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>*/}
                            {/*    $ 10*/}
                            {/*</Text>*/}
                            <Switch
                                value={isEnableMax}
                                onValueChange={async (value) => {
                                    setIsEnableMax(value);
                                    await LocalStorage.storeData('maxEnable', value ? "1" : "0");
                                }}
                                style={{transform: [{scaleX: .8}, {scaleY: .8}] }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
