import React, {Component} from 'react'
import {Image, InteractionManager, ListView, RefreshControl, ScrollView, Text, View} from 'react-native'
import {connect} from "react-redux";
import {Button, Card, Header} from 'react-native-elements'
// Styles
import styles from './Styles/LocationScreenStyles'
import NavItem from "../Components/NavItem";
import LocationActions from '../Redux/LocationRedux'

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
                outerContainerStyles={styles.navBarContainer}
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

    verifyLocation() {
        this.props.verifyLocation(this.props.location)
    }

    render() {
        const {location} = this.props

        return (
            <View style={styles.mainContainer}>
                <ScrollView style={styles.container}>
                    <Card title={location.name}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'}}>
                            <Image style={{height: 45, width: 45}} source={{uri: location.thumbUrl}}/>
                            <View style={{paddingLeft: 10}}>
                                <Text>{location.phonenumber}</Text>
                                <Text>{location.street}</Text>
                            </View>
                        </View>
                    </Card>
                    <Card title={'About Us'}>
                        <Text>{location.about}</Text>
                    </Card>
                    <Button style={{marginTop: 10}} backgroundColor='green' color='white'
                            onPress={this.verifyLocation.bind(this)} title={'Verify'}/>
                </ScrollView>
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
    return {
        verifyLocation: (location) => dispatch(LocationActions.verifyLocation(location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationScreen)
