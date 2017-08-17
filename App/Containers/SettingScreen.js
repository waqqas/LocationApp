import React, {Component} from "react";
import {Image, Text, View} from "react-native";
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";

// Styles
import styles from "./Styles/SettingScreenStyle";

class SettingScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: 'Settings',
        tabBarLabel: 'Settings',
        tabBarIcon: ({focused, tintColor}) => (
            <Icon name="cogs" style={focused ? styles.tabBarIcon : styles.tabBarIconInactive}/>)
    });

    render() {
        return (
            <View style={styles.mainContainer}>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen)
