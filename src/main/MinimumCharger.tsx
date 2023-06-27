import {
    Dimensions, Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text, TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";

import SPACING from "../config/SPACING";

const {height} = Dimensions.get("window");
// import { Ionicons } from "@expo/vector-icons";
import colors from "../config/Restaurant/colors";
import SettingSvg from "../assets/ic_setting.svg";
import BackSvg from "../assets/ic_back.svg";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import ProgressCircle from "progress-circle-react-native";
import { LocalStorage } from "../components/LocalStorage";

const MinimumCharger = ({route, navigation}) => {
    // const {recipe} = route.params;
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        initData();
    }, [])
    const initData = async () => {
        const dataInput = await LocalStorage.getData("minimum");
        setPercent(Number(dataInput));
    }
    return (
        <>
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
                <ProgressCircle
                    percent={percent}
                    radius={50}
                    borderWidth={8}
                    color="#3399FF"
                    shadowColor="#999"
                    bgColor="#fff"
                >
                    <Text style={{fontSize: 18}}> {'>'} {percent} {'%'}</Text>
                </ProgressCircle>
                <TextInput
                    onChangeText={(value) => {
                        if (Number(value) && Number(value) > 100) {
                            setPercent(100)
                        } else if (Number(value) && Number(value) <= 100) {
                            setPercent(Number(value))
                        } else {
                            setPercent(0);
                        }
                    }}
                    onEndEditing={async (value) => {
                        await LocalStorage.storeData('minimum', value.nativeEvent.text);
                    }}
                    value={percent.toString()}
                    keyboardType={"numeric"}/>
            </ScrollView>
        </>
    );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {backgroundColor: 'white'},
    child: {width, justifyContent: 'center'},
    text: {fontSize: width * 0.5, textAlign: 'center'},
});

export default MinimumCharger;
