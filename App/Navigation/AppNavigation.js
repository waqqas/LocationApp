import {StackNavigator} from 'react-navigation'

import styles from './Styles/NavigationStyles'
import SplashScreen from "../Containers/SplashScreen";
import LocationListScreen from "../Containers/LocationListScreen";
import LocationScreen from "../Containers/LocationScreen";

// Manifest of possible screens
const PrimaryNav = StackNavigator({
    LocationListScreen: {screen: LocationListScreen},
    LocationScreen: {screen: LocationScreen},
    SplashScreen: {screen: SplashScreen}
}, {
    // Default config for all screens
    headerMode: 'float',
    initialRouteName: 'SplashScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})

export default PrimaryNav
