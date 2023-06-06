import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import SPACING from "../config/SPACING";
const { height } = Dimensions.get("window");
// import { Ionicons } from "@expo/vector-icons";
import colors from "../config/Restaurant/colors";
import SettingSvg from "../assets/ic_setting.svg";
import BackSvg from "../assets/ic_back.svg";
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const RecipeDetailScreen = ({ route, navigation }) => {
  const {recipe} = route.params;
  return (
    <>
        {/*<View style={{flexDirection: 'row', width: '100%'}}>*/}
        {/*    <ScrollView*/}
        {/*        horizontal*/}
        {/*        showsHorizontalScrollIndicator={false}*/}
        {/*    >*/}
        {/*        <ImageBackground*/}
        {/*            style={{*/}
        {/*                padding: SPACING * 2,*/}
        {/*                height: height / 2.5,*/}
        {/*                // padding: SPACING * 2,*/}
        {/*                paddingTop: SPACING * 4,*/}
        {/*                flexDirection: "row",*/}
        {/*                justifyContent: "space-between",*/}
        {/*            }}*/}
        {/*            source={require('../assets/restaurant/brooke-lark-jUPOXXRNdcA-unsplash.jpeg')}*/}
        {/*        >*/}
        {/*            <TouchableOpacity*/}
        {/*                style={{*/}
        {/*                    height: SPACING * 4.5,*/}
        {/*                    width: SPACING * 4.5,*/}
        {/*                    justifyContent: "center",*/}
        {/*                    alignItems: "center",*/}
        {/*                }}*/}
        {/*                onPress={() => navigation.goBack()}*/}
        {/*            >*/}
        {/*                <BackSvg height={25} width={25} fill="blue"/>*/}
        {/*            </TouchableOpacity>*/}
        {/*        </ImageBackground>*/}
        {/*        <ImageBackground*/}
        {/*            style={{*/}
        {/*                padding: SPACING * 2,*/}
        {/*                height: height / 2.5,*/}
        {/*                // padding: SPACING * 2,*/}
        {/*                paddingTop: SPACING * 4,*/}
        {/*                flexDirection: "row",*/}
        {/*                justifyContent: "space-between",*/}
        {/*            }}*/}
        {/*            source={require('../assets/restaurant/anna-pelzer-IGfIGP5ONV0-unsplash.jpeg')}*/}
        {/*        >*/}
        {/*            <TouchableOpacity*/}
        {/*                style={{*/}
        {/*                    height: SPACING * 4.5,*/}
        {/*                    width: SPACING * 4.5,*/}
        {/*                    justifyContent: "center",*/}
        {/*                    alignItems: "center",*/}
        {/*                }}*/}
        {/*                onPress={() => navigation.goBack()}*/}
        {/*            >*/}
        {/*                <BackSvg height={25} width={25} fill="blue"/>*/}
        {/*            </TouchableOpacity>*/}
        {/*        </ImageBackground>*/}
        {/*    </ScrollView>*/}
        {/*</View>*/}
      <ScrollView>
        <View>
            <View style={styles.container}>
                <SwiperFlatList autoplay autoplayDelay={10} autoplayLoop index={2} showPagination>
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
            {/*<TouchableOpacity*/}
            {/*  style={{*/}
            {/*    height: SPACING * 4.5,*/}
            {/*    width: SPACING * 4.5,*/}
            {/*    // backgroundColor: colors.white,*/}
            {/*    justifyContent: "center",*/}
            {/*    alignItems: "center",*/}
            {/*    // borderRadius: SPACING * 2.5,*/}
            {/*  }}*/}
            {/*  onPress={() => navigation.goBack()}*/}
            {/*>*/}
            {/*<BackSvg height={25} width={25} fill="blue" />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity*/}
            {/*  style={{*/}
            {/*    height: SPACING * 4.5,*/}
            {/*    width: SPACING * 4.5,*/}
            {/*    backgroundColor: colors.white,*/}
            {/*    justifyContent: "center",*/}
            {/*    alignItems: "center",*/}
            {/*    borderRadius: SPACING * 2.5,*/}
            {/*  }}*/}
            {/*>*/}
            {/*  /!*<Ionicons name="share" size={SPACING * 2.5} color={colors.gray} />*!/*/}
            {/*</TouchableOpacity>*/}
          {/*</ImageBackground>*/}
          <View
            style={{
              padding: SPACING * 2,
              paddingTop: SPACING * 4,
              marginTop: -SPACING * 0.1,
              borderTopLeftRadius: SPACING * 3,
              borderTopRightRadius: SPACING * 3,
              backgroundColor: colors.white,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: SPACING * 3,
                alignItems: "center",
              }}
            >
              <View style={{ width: "70%" }}>
                <Text
                  style={{
                    fontSize: SPACING * 3,
                    color: colors.black,
                    fontWeight: "700",
                  }}
                >
                  {recipe?.name}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 3,
                  backgroundColor: colors.yellow,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/*<Ionicons*/}
                {/*  name="star"*/}
                {/*  color={colors.black}*/}
                {/*  size={SPACING * 1.7}*/}
                {/*/>*/}
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.black,
                  }}
                >
                  {recipe?.rating}
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/*<Ionicons*/}
                {/*  name="time"*/}
                {/*  color={colors.gray}*/}
                {/*  size={SPACING * 1.7}*/}
                {/*/>*/}
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.time}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/*<Ionicons*/}
                {/*  name="bicycle"*/}
                {/*  color={colors.gray}*/}
                {/*  size={SPACING * 1.7}*/}
                {/*/>*/}
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.del_time}
                </Text>
              </View>
              <View
                style={{
                  padding: SPACING,
                  paddingHorizontal: SPACING * 2,
                  backgroundColor: colors.light,
                  flexDirection: "row",
                  borderRadius: SPACING,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/*<Ionicons*/}
                {/*  name="restaurant"*/}
                {/*  color={colors.gray}*/}
                {/*  size={SPACING * 1.7}*/}
                {/*/>*/}
                <Text
                  style={{
                    fontSize: SPACING * 1.6,
                    fontWeight: "600",
                    marginLeft: SPACING / 2,
                    color: colors.gray,
                  }}
                >
                  {recipe?.cooking_time}
                </Text>
              </View>
            </View>
            <View style={{ marginVertical: SPACING * 3 }}>
              <Text
                style={{
                  fontSize: SPACING * 2,
                  fontWeight: "700",
                  color: colors.dark,
                }}
              >
                Ingredients
              </Text>
              {recipe?.ingredients.map((ingredient) => (
                <View
                  style={{
                    marginVertical: SPACING,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  key={ingredient.id}
                >
                  <View
                    style={{
                      width: SPACING,
                      height: SPACING,
                      backgroundColor: colors.light,
                      borderRadius: SPACING,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: SPACING * 1.7,
                      fontWeight: "600",
                      color: colors.gray,
                      marginLeft: SPACING,
                    }}
                  >
                    {ingredient.title}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                fontSize: SPACING * 2,
                fontWeight: "700",
                color: colors.dark,
                marginBottom: SPACING,
              }}
            >
              Description
            </Text>
            <Text
              style={{
                fontSize: SPACING * 1.7,
                fontWeight: "500",
                color: colors.gray,
              }}
            >
              {recipe?.description}
            </Text>
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

export default RecipeDetailScreen;
