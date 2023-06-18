import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Dimensions, Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import firestore from '@react-native-firebase/firestore';
import SPACING from "../config/SPACING";
import colors from "../config/Restaurant/colors";
import { Gallery } from "../model/image";
import { Collection } from "../model/collection";
import { RNLauncherKitHelper } from 'react-native-launcher-kit';
import TrackPlayer, {Capability, usePlaybackState, useProgress, State} from 'react-native-track-player';
import { Music } from "../model/music";

const {width} = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = ({navigation}) => {
    const [collection, setCollection] = useState<Collection[]>([]);
    const [gallery, setGallery] = useState<Gallery[]>([]);
    const [isEnableInput, setIsEnableInput] = useState(false);
    const [percentBattery, setPercentBattery] = useState(0);
    const [isCharging, setIsCharging] = useState(false);
    const playbackState = usePlaybackState();

    useEffect(() => {
        // reload();
        initData();
        // setupPlayer();
    }, [])
    const initData = async () => {
        const result = await RNLauncherKitHelper.getBatteryStatus();
        setPercentBattery(result?.level);
        setIsCharging(result?.isCharging);
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
                compactCapabilities: [Capability.Play, Capability.Pause],

                // Icons for the notification on Android (if you don't like the default ones)
            });
            await TrackPlayer.add([{url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"}]);
        } catch (e) {
        }
    }
    const togglePlayback = async playbackState => {
        console.log(playbackState);
        
        if (playbackState === State.Paused || playbackState === State.Ready) {
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }
    const reload = async () => {
        // const user = await firestore().collection('Image').doc('Anh1').get();
        // console.log(user)
        firestore()
            .collection('Image')
            .get()
            .then(querySnapshot => {
                // console.log('Total users: ', querySnapshot.size);
                querySnapshot.forEach(documentSnapshot => {
                    // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
                    const slideImage = Object.values(documentSnapshot.data()).slice(1);
                    const data: Collection = {
                        link: Object.values(documentSnapshot.data())[0],
                        image: slideImage,
                    }
                    setCollection(value => [...value, data])
                    console.log(data)
                });
            });
    }
    const [activeCategory, setActiveCategory] = useState(0);
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{padding: SPACING * 2}}>
                    <View
                        style={{flexDirection: "row", justifyContent: "space-between"}}
                    >
                        <TouchableOpacity
                            onPress={async () => {
                            //   await TrackPlayer.skip(1);
                            //   await TrackPlayer.play();
                                // togglePlayback(playbackState)
                                TrackPlayer.play();
                            }}
                        >
                            <Image
                                style={{
                                    width: SPACING * 4.5,
                                    height: SPACING * 4.5,
                                    borderRadius: SPACING * 3,
                                    marginRight: SPACING,
                                }}
                                source={require("../assets/restaurant/avatar.jpg")}
                            />
                        </TouchableOpacity>
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
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    color: colors.gray,
                                    marginVertical: SPACING / 2,
                                }}
                            >
                                Today discount
                            </Text>
                            <Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>
                                $ 10
                            </Text>
                            <Switch
                                value={isEnableInput}
                                onValueChange={(value) => setIsEnableInput(value)}
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
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    color: colors.gray,
                                    marginVertical: SPACING / 2,
                                }}
                            >
                                Today discount
                            </Text>
                            <Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>
                                $ 10
                            </Text>
                            <Switch
                                value={isEnableInput}
                                onValueChange={(value) => setIsEnableInput(value)}
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
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    color: colors.gray,
                                    marginVertical: SPACING / 2,
                                }}
                            >
                                Today discount
                            </Text>
                            <Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>
                                $ 10
                            </Text>
                            <Switch
                                value={isEnableInput}
                                onValueChange={(value) => setIsEnableInput(value)}
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
                            <Text
                                style={{
                                    fontSize: SPACING * 1.5,
                                    color: colors.gray,
                                    marginVertical: SPACING / 2,
                                }}
                            >
                                Today discount
                            </Text>
                            <Text style={{fontSize: SPACING * 2, fontWeight: "700"}}>
                                $ 10
                            </Text>
                            <Switch
                                value={isEnableInput}
                                onValueChange={(value) => setIsEnableInput(value)}
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
