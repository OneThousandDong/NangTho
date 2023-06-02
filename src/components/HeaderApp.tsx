import { Image, ScrollView, Text, View } from "react-native";

const HeaderApp = ({imageUri, title}) => {
    return (
        <View style={{height: 130, width: 130, borderWidth: 0.5, borderColor: '#dddddd'}}>
            <View style={{flex: 2}}>
                <Image source={imageUri}
                       style={{flex: 1, width: null, height: null}}
                />
            </View>
            <View style={{flex: 1}}>
                <Text>
                    {title}
                </Text>
            </View>
        </View>
    )
}

export default HeaderApp;