import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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
    const playbackStater = usePlaybackState();
    // const {recipe} = route.params;
    const [text, setText] = useState('');

    const speak = async () => {
        // console.log('Hii')
        // Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
        Tts.setDefaultLanguage('vi-VN');
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
            await TrackPlayer.reset();
            await TrackPlayer.add([{url: response[0].uri}]);
        } catch (error) {
            console.warn(error);
        }
    }, []);

    const storeData = async (key: string, value: string) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {}
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
            // console.log(event.state)
            setIsPlay(0);
        }
    })

    const togglePlayback = async playbackStater => {
        await TrackPlayer.add([{url: "file://" + RNFetchBlob.fs.dirs.DocumentDir + "/msf%3A1000000018/file_example_MP3_700KB.mp3"}]);
        console.log(playbackState);

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
    // useEffect(() => {
    //     console.log('hi')
    //     if (playbackState === State.Stopped) {
    //         setIsPlay(1)
    //     }
    // }, [playbackStater])
    const getData = useCallback(async () => {
        try {
            const value = await AsyncStorage.getItem('inputSpeak');
            if (value !== null) {
                setText(value);
            }
        } catch (e) {
            // error reading value
        }
    }, []);

    // async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('inputSpeak');
    //         if (value !== null) {
    //             setText(value);
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // };

    const getDataObject = useCallback(async () => {
        try {
            // await setupPlayer();
            const jsonValue = await AsyncStorage.getItem('inputMusic');
            if (jsonValue != null) {
                const value = JSON.parse(jsonValue);
                setFileResponse([value])
                await TrackPlayer.reset();
                console.log(value)
                await TrackPlayer.add([{url: "file:///" + RNFetchBlob.fs.dirs.DocumentDir + "/audio/file_example_MP3_700KB.mp3"}]);
                // await TrackPlayer.add([{url: value.uri}]);
            }
        } catch (e) {
            // error reading value
        }
    }, []);

    //     = async () => {
    //     try {
    //         const jsonValue = await AsyncStorage.getItem('inputMusic');
    //         if (jsonValue != null) {
    //             const value = JSON.parse(jsonValue);
    //             console.log(value)
    //             setFileResponse([value])
    //             await TrackPlayer.add([{url: value.uri}]);
    //         }
    //     } catch (e) {
    //         // error reading value
    //     }
    // };
    const test = () => {
        RNFetchBlob.fetch('GET', 'http://ip.jsontest.com/', )
            .then((res) => {
                console.log(res)
            })
            // Something went wrong:
            .catch((e) => {
            })
    }

    useEffect(() => {
        RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.SDCardDir).then(files => {
            console.log('---files---')
            console.log(files);
        }).catch(error => console.log(error))
        // console.log("--RNFetchBlob.fs.dirs?.DocumentDir--")
        // console.log(RNFetchBlob.fs.dirs?.DocumentDir)
        // test();
        setupPlayer();
        getData();
        getDataObject();
    }, [])
    const setupPlayer = async () => {
        try {
            // console.log('setupPlayer');

            // console.log(fileResponse);
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

    const playbackService = async () => {

    }
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    style={{
                        height: SPACING * 4.5,
                        width: SPACING * 4.5,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <BackSvg height={25} width={25} fill="blue"/>
                </TouchableOpacity>
                <Text style={styles.title}>Input Charger</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Enter text to be spoken"
                />
                <Button title="Speak" onPress={async () => {
                    await speak();
                    await storeData("inputSpeak", text)
                }} />
            </View>
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
            {/*<Button title="Play" onPress={async () => {*/}
            {/*    await TrackPlayer.remove(0);*/}
            {/*    await TrackPlayer.skip(0);*/}
            {/*    // togglePlayback(playbackState)*/}
            {/*    await TrackPlayer.play();*/}
            {/*    // await TrackPlayer.reset();*/}
            {/*}}*/}
            {/*/>*/}
            <Button title="Save" onPress={async () => {
                if (fileResponse?.length > 0) {
                    const value = {
                        name: fileResponse[0].name,
                        uri: fileResponse[0].uri,
                        size: fileResponse[0].size,
                    }
                    await storeDataObject("inputMusic", value);
                }
            }}
            />
        </>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {backgroundColor: 'white'},
    child: {width, justifyContent: 'center'},
    text: {fontSize: width * 0.5, textAlign: 'center'},
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
