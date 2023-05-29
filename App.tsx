import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {AnimatedScrollView} from "@kanelloc/react-native-animated-header-scroll-view";
import HeaderNavBar from "./src/navigation/HeaderNavBar";
import TopNavBar from "./src/navigation/TopNavBar";
import Card from "./src/components/Card";

export type Props = {
  name: string;
  baseEnthusiasmLevel?: number;
};

const App = () => {
    const data = Array.from(Array(50).keys());
    return (
        <AnimatedScrollView
            HeaderNavbarComponent={<HeaderNavBar />}
            TopNavBarComponent={<TopNavBar />}
            headerImage={require('./src/assets/img.png')}
        >
            {data.map((e) => {
                return <Card item={e} key={e} />;
            })}
        </AnimatedScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default App;