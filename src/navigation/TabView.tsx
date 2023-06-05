import * as React from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ScrollableTabView from '@itenl/react-native-scrollable-tabview';
import { useEffect, useState } from "react";


const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export default function TabViewExample() {
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <ScrollableTabView
            badges={[
                null,
                [
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 100,
                            top: 10,
                            right: 0,
                        }}
                    >
                        <Text>new</Text>
                    </View>,
                    <View
                        style={{
                            position: 'absolute',
                            width: 150,
                            height: 50,
                            zIndex: 100,
                            marginTop: 35,
                            right: 0,
                            opacity: 0.6,
                            backgroundColor: 'pink',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Text>Three Tips</Text>
                    </View>,
                ],
            ]}
            stacks={[
                {
                    screen: FirstRoute,
                    sticky: FirstRoute,
                    tabLabel: 'OneTab',
                    // tabLabelRender: tabLabel => {
                    //     return `--- ${tabLabel} ---`;
                    // },
                    badge: [<Text>one</Text>, <Text>two</Text>],
                    toProps: {
                        xx: 123,
                    },
                }, {
                    screen: ({
                                 FirstRoute,
                             }) => {
                        // The code is required
                        // initScreen();
                        const [datetime, setDatetime] = useState(Date.now());
                        useEffect(() => {
                            setInterval(() => {
                                setDatetime(Date.now());
                            }, 1000);
                        }, []);
                        // onRefresh((toggled) => {
                        //     toggled(true);
                        //     alert("onRefresh start");
                        //     setTimeout(() => {
                        //         toggled(false);
                        //         alert("onRefresh stop");
                        //     }, 3000);
                        // });
                        // onEndReached(() => {
                        //     alert("onEndReached");
                        // });
                        return (
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#151723",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "#ffffff" }}>
                                    Test function component {datetime}
                                </Text>
                            </View>
                        );
                    },
                    tabLabel: "TestFunctionComponent",
                }
            ]}
            tabsStyle={{}}
            tabWrapStyle={{}}
            tabInnerStyle={{}}
            tabActiveOpacity={0.6}
            tabStyle={{}}
            textStyle={{}}
            textActiveStyle={{}}
            tabUnderlineStyle={{}}
            firstIndex={0}
            syncToSticky={true}
            onEndReachedThreshold={0.1}
            // onBeforeRefresh={(next, toggled) => {
            //     toggled();
            //     next();
            // }}
            // onBeforeEndReached={next => {
            //     next();
            // }}
            // onTabviewChanged={(index, tabLabel, isFirst) => {
            //     alert(index);
            // }}
            // header={() => {
            //     return <View style={{ backgroundColor: 'pink', height: 120 }}></View>;
            // }}
            oneTabHidden={true}
            enableCachePage={true}
            carouselProps={{}}
            sectionListProps={{}}
            toHeaderOnTab={true}
            toTabsOnTab={true}
            tabsShown={false}
            fixedTabs={false}
            fixedHeader={false}
            useScroll={false}
            fillScreen={true}
        ></ScrollableTabView>
    );
}