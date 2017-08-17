import React, {Component} from 'react'
import {StackNavigator, TabNavigator} from 'react-navigation'
import Icon from "react-native-vector-icons/FontAwesome";

import styles from './Styles/NavigationStyles'
import SplashScreen from "../Containers/SplashScreen";
import LocationListScreen from "../Containers/LocationListScreen";
import LocationScreen from "../Containers/LocationScreen";
import SettingScreen from "../Containers/SettingScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    LocationListScreen: {screen: LocationListScreen},
    LocationScreen: {screen: LocationScreen},
    SplashScreen: {screen: SplashScreen},
}, {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})

const TabNav = TabNavigator({
    NearbyScreen: {
        screen: PrimaryNav,
        navigationOptions: {
            tabBarLabel: 'Nearby',
            tabBarIcon: ({focused, tintColor}) => (
                <Icon name="map-marker" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)

        }
    },
    SettingScreen: {
        screen: SettingScreen
    },
}, {
    headerMode: 'none',
    tabBarPosition: 'bottom',
    initialRouteName: 'NearbyScreen',
    navigationOptions: {
        headerStyle: styles.navBar
    },
    lazy: true
})


export default TabNav
