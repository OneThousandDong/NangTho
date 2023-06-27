import {
    Alert,
    Button,
    Dimensions, PermissionsAndroid, Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer, {
    Capability,
    Event,
    State,
    usePlaybackState,
    useTrackPlayerEvents
} from 'react-native-track-player';
import Sound from "../assets/ic_sound.svg";
import Play from "../assets/ic_play.svg";
import Pause from "../assets/ic_pause.svg";
import Tts from "react-native-tts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SPACING from "../config/SPACING";
import BackSvg from "../assets/ic_back.svg";
import RNFetchBlob from "rn-fetch-blob";

const {height} = Dimensions.get("window");


const InputCharger = ({route, navigation}) => {
    const [text, setText] = useState("");

    const speak = async () => {
        // Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
        // Tts.setDefaultLanguage('vi-VN');
        Tts.speak(text);
    };
    const playbackState = usePlaybackState();
    const [play, setIsPlay] = useState(0)
    const [fileResponse, setFileResponse] = useState([]);
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            setFileResponse(response);
            RNFetchBlob.fs.stat(response[0].uri)
                .then((stats) => {
                    storeData("mp3UriInput", stats.path);
                })
                .catch((err) => {
                })
            // const destPath = `${RNFS.TemporaryDirectoryPath}/${response[0].name}`;
            // await RNFS.copyFile(response[0].uri, destPath);
            Alert.alert(response[0].uri, 'My Alert Msg', [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            await TrackPlayer.reset();
            await TrackPlayer.add([{url: response[0].uri}]);
        } catch (error) {
            console.warn(error);
        }
    }, []);

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
        }
    };

    const storeDataObject = async (key: string, value: any) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
        }
    };

    useTrackPlayerEvents([Event.PlaybackState], (event) => {
        if (event.state == 'stopped') {
            setIsPlay(0);
        }
    })

    const togglePlayback = async playbackStater => {
        // const res = "file:///storage/emulated/0/Download/file_example_MP3_700KB.mp3"
        // await TrackPlayer.add([{url: res}]);
        console.log(playbackState)
        if (playbackState === State.Paused || playbackState === State.Ready
            || playbackState === State.Stopped || playbackState === State.Connecting
        ) {
            await TrackPlayer.remove(0)
            await TrackPlayer.skip(0)
            await TrackPlayer.play();
        } else {
            await TrackPlayer.pause();
        }
    }

    const getData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('inputSpeak');
            if (value !== null) {
                setText(value);
            }
            const mp3Uri = await AsyncStorage.getItem("mp3UriInput");
            if (mp3Uri !== null) {
                await TrackPlayer.reset();
                await TrackPlayer.add([{url: "file://" + mp3Uri}]);
            }
        } catch (e) {
        }
    }, []);


    const getDataObject = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('inputMusic');
            if (jsonValue != null) {
                const value = JSON.parse(jsonValue);
                setFileResponse([value])
                // await TrackPlayer.reset();
            }
        } catch (e) {
        }
    }, []);

    useEffect(() => {
        init();
    }, [])

    const init = async () => {
        // await setupPlayer();
        await getData();
        await getDataObject();
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

    // const addTracks = async () => {[
    //     {
    //       id: '1',
    //       url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    //       title: 'Fluidity',
    //       artist: 'tobylane',
    //       duration: 60,
    //     }
    //   ]
    // }

    const requestStoragePermission = async () => {

        if (Platform.OS !== "android") return true

        const pm1 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        const pm2 = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (pm1 && pm2) return true

        const userResponse = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);

        if (userResponse['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
            userResponse['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted') {
            return true
        } else {
            return false
        }
    }
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        justifyContent: 'flex-start',
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <BackSvg height={20} width={20} fill="blue"/>
                </TouchableOpacity>
                <Text>Input Charger</Text>
                <View style={styles.title}></View>
            </View>
            <TextInput
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder="Enter text to be spoken"
            />
            <Button title="Speak" onPress={async () => {
                await speak();
                await storeData("inputSpeak", text)
            }}/>
            <Button title="Select 📑" onPress={handleDocumentSelection}/>
            {fileResponse.map((file, index) => (
                <>
                    <Sound height={35} width={35}/>
                    <Text
                        key={index.toString()}
                        numberOfLines={1}
                        ellipsizeMode={'middle'}>
                        {/*{file?.uri}*/}
                        {file?.name.substring(0, file.name.indexOf('.mp3'))}
                    </Text>
                    <Text>
                        {file?.size / 1024 > 1000 ? (file?.size / 1024).toFixed(1) + "MB" : Math.round(file?.size / 1024) + "KB"}
                    </Text>
                    {play == 0 ? (
                            <TouchableOpacity onPress={async () => {
                                setIsPlay(1);
                                // await TrackPlayer.play();
                                togglePlayback(playbackState)
                            }}>
                                <Play height={35} width={35}/>
                            </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity onPress={async () => {
                                setIsPlay(0)
                                // await TrackPlayer.pause();
                                togglePlayback(playbackState)
                            }}>
                                <Pause height={35} width={35}/>
                            </TouchableOpacity>
                        )
                    }
                </>
            ))}
            <Button title="Save" onPress={async () => {
                if (fileResponse?.length > 0) {
                    const value = {
                        name: fileResponse[0].name,
                        uri: fileResponse[0].uri,
                        size: fileResponse[0].size,
                    }
                    await requestStoragePermission();
                    await storeDataObject("inputMusic", value);
                }
            }}
            />
        </SafeAreaView>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SPACING
    },
    child: {width, justifyContent: 'center'},
    text: {fontSize: width * 0.5, textAlign: 'center'},
    title: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default InputCharger;
