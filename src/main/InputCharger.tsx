import {
    Dimensions, Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button
} from "react-native";
import React,  { useCallback, useEffect, useState } from "react";
import SPACING from "../config/SPACING";
const { height } = Dimensions.get("window");
// import { Ionicons } from "@expo/vector-icons";
import colors from "../config/Restaurant/colors";
import SettingSvg from "../assets/ic_setting.svg";
import BackSvg from "../assets/ic_back.svg";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer, {Capability, usePlaybackState, useProgress, State} from 'react-native-track-player';
import { Music } from "../model/music";


const InputCharger = ({ route, navigation }) => {
    // const {recipe} = route.params;
    const [fileResponse, setFileResponse] = useState([]);
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
            });
            console.log(response);
            
            setFileResponse(response);
        } catch (error) {
            console.warn(error);
        }
    }, []);

    useEffect(() => {
        setupPlayer();
    }, [])
    useEffect(() => {
        setupPlayer();
    }, [fileResponse])
    const setupPlayer = async () => {
        try {
            console.log('Hiii');
            
            console.log(fileResponse);
            await TrackPlayer.setupPlayer();
            await TrackPlayer.updateOptions({
                // Media controls capabilities
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                ],

                // Capabilities that will show up when the notification is in the compact form on Android
                compactCapabilities: [Capability.Play, Capability.Pause],

                // Icons for the notification on Android (if you don't like the default ones)
            });
            // if (fileResponse?.length > 0) {
            //     await TrackPlayer.add([require(fileResponse[0]?.uri)]);
            // }
            if (fileResponse?.length > 0) {
                await TrackPlayer.add(Music);
            }
        } catch (e) {
        }
    }

    return (
        <>
        {fileResponse.map((file, index) => (
        <Text
          key={index.toString()}
          numberOfLines={1}
          ellipsizeMode={'middle'}>
          {file?.uri}
        </Text>
      ))}
      <Button title="Select 📑" onPress={handleDocumentSelection} />
            <ScrollView>
                <View>
                    <View style={styles.container}>
                        <SwiperFlatList autoplay autoplayDelay={10} autoplayLoop index={0} showPagination>
                            <View style={[styles.child, {backgroundColor: 'tomato'}]}>
                                <ImageBackground
                                    style={{
                                        padding: SPACING * 2,
                                        height: height / 2.5,
                                        // padding: SPACING * 2,
                                        paddingTop: SPACING * 4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                    // source={recipe.image}
                                    source={{uri: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'}}
                                >
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
                                </ImageBackground>
                            </View>
                            <View style={[styles.child, {backgroundColor: 'thistle'}]}>
                                <ImageBackground
                                    style={{
                                        padding: SPACING * 2,
                                        height: height / 2.5,
                                        // padding: SPACING * 2,
                                        paddingTop: SPACING * 4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                    source={require('../assets/restaurant/brooke-lark-jUPOXXRNdcA-unsplash.jpeg')}
                                >
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
                                </ImageBackground>
                            </View>
                            <View style={[styles.child, {backgroundColor: 'skyblue'}]}>
                                <ImageBackground
                                    style={{
                                        padding: SPACING * 2,
                                        height: height / 2.5,
                                        // padding: SPACING * 2,
                                        paddingTop: SPACING * 4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                    source={require('../assets/restaurant/brooke-lark-jUPOXXRNdcA-unsplash.jpeg')}
                                >
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
                                </ImageBackground>
                            </View>
                            <View style={[styles.child, {backgroundColor: 'teal'}]}>
                                <ImageBackground
                                    style={{
                                        padding: SPACING * 2,
                                        height: height / 2.5,
                                        // padding: SPACING * 2,
                                        paddingTop: SPACING * 4,
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                    source={require('../assets/restaurant/brooke-lark-jUPOXXRNdcA-unsplash.jpeg')}
                                >
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
                                </ImageBackground>
                            </View>
                        </SwiperFlatList>
                    </View>
                </View>
            </ScrollView>

        </>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {backgroundColor: 'white' },
    child: { width, justifyContent: 'center' },
    text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default InputCharger;
