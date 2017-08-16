import React, {Component} from 'react'
import {Image, ScrollView, View} from 'react-native'
import {Images} from '../Themes'
import {connect} from "react-redux";
// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {

    render() {
        return (
            <View style={styles.mainContainer}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
                <ScrollView style={styles.container}>
                </ScrollView>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
