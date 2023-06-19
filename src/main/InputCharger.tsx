import {
    Button,
    Dimensions,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SPACING from "../config/SPACING";
// import { Ionicons } from "@expo/vector-icons";
import BackSvg from "../assets/ic_back.svg";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer, { Capability, State, usePlaybackState } from 'react-native-track-player';
import Sound from "../assets/ic_sound.svg";
import Play from "../assets/ic_play.svg";
import Pause from "../assets/ic_pause.svg";
import Tts from "react-native-tts";

const {height} = Dimensions.get("window");
// import { setupPlayer, addTracks } from '../config/trackPlayerServices';


const InputCharger = ({route, navigation}) => {
    // const {recipe} = route.params;
    const [text, setText] = useState('');

    const speak = async () => {
        Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
        Tts.setDefaultLanguage('vi-VN');
        await Tts.speak(text);
    };
    const playbackState = usePlaybackState();
    const [play, setIsPlay] = useState(0)
    const [fileResponse, setFileResponse] = useState([]);
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            console.log(response);
            setFileResponse(response);
            // setupPlayer(response[0].uri)
            await TrackPlayer.reset();
            console.log('Truoc queue')
            console.log(await TrackPlayer.getQueue())
            await TrackPlayer.add([{url: response[0].uri}]);
            console.log('Sau queue')
            console.log(await TrackPlayer.getQueue())
        } catch (error) {
            console.warn(error);
        }
    }, []);

    // const [isPlayerReady, setIsPlayerReady] = useState(false);

    // useEffect(() => {
    //     async function setup() {
    //     let isSetup = await setupPlayer();

    //     const queue = await TrackPlayer.getQueue();
    //     if(isSetup && queue.length <= 0) {
    //         await addTracks();
    //     }

    //     setIsPlayerReady(isSetup);
    //     }

    //     setup();
    // }, []);

    // const togglePlayback = async playbackStater => {
    //     console.log(playbackState);
    //
    //     if (playbackState === State.Paused || playbackState === State.Ready) {
    //         await TrackPlayer.play();
    //     } else {
    //         await TrackPlayer.pause();
    //     }
    // }

    useEffect(() => {
        setupPlayer();
    }, [])
    const setupPlayer = async () => {
        console.log(TrackPlayer.getQueue())
        try {
            // console.log('Hiii');

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

    // const setupPlayer = async () => {
    //     let isSetup = false;
    //     try {
    //       await TrackPlayer.getCurrentTrack();
    //       isSetup = true;
    //     }
    //     catch {
    //       await TrackPlayer.setupPlayer();
    //       await TrackPlayer.updateOptions({
    //         android: {
    //           appKilledPlaybackBehavior:
    //             AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
    //         },
    //         capabilities: [
    //           Capability.Play,
    //           Capability.Pause,
    //           Capability.SkipToNext,
    //           Capability.SkipToPrevious,
    //           Capability.SeekTo,
    //         ],
    //         compactCapabilities: [
    //           Capability.Play,
    //           Capability.Pause,
    //           Capability.SkipToNext,
    //         ],
    //         progressUpdateEventInterval: 2,
    //       });

    //       isSetup = true;
    //     }
    //     finally {
    //       return isSetup;
    //     }
    // }

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
                <Text style={styles.title}>Text-to-Speech in React Native</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setText}
                    value={text}
                    placeholder="Enter text to be spoken"
                />
                <Button title="Speak" onPress={speak} />
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
                            await TrackPlayer.play();
                        }}>
                            <Play height={35} width={35}/>
                        </TouchableOpacity>
                        )
                        : (
                            <TouchableOpacity onPress={async () => {
                                setIsPlay(0)
                                await TrackPlayer.pause();
                            }}>
                            <Pause height={35} width={35}/>
                        </TouchableOpacity>
                        )
                    }
                </>
            ))}
            <Button title="Play" onPress={async () => {
                await TrackPlayer.remove(0);
                await TrackPlayer.skip(0);
                // togglePlayback(playbackState)
                await TrackPlayer.play();
                // await TrackPlayer.reset();
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
