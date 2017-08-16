import React, {Component} from 'react'
import {Image, InteractionManager, ListView, RefreshControl, ScrollView, Text, View} from 'react-native'
import {connect} from "react-redux";
import {Header} from 'react-native-elements'
// Styles
import styles from './Styles/LocationScreenStyles'
import NavItem from "../Components/NavItem";

class LocationScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let title = ''
        let onLeftButtonPress = null

        if (navigation.state.params) {
            const {params} = navigation.state
            title = params.location.name
            onLeftButtonPress = params.onLeftButtonPress
        }


        const header = (
            <Header
                leftComponent={<NavItem onPress={onLeftButtonPress} iconName='chevron-left' text='Back'/>}
                centerComponent={{text: title, style: styles.navTitle}}
            />)

        return ({
            header
        })
    }

    onLeftButtonPress() {
        this.props.navigation.goBack()
    }

    componentDidMount() {
        const {location} = this.props
        this.props.navigation.setParams({
            location,
            onLeftButtonPress: this.onLeftButtonPress.bind(this),
        })

    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        location: state.location.selected
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)
