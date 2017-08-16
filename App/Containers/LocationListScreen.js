import React, {Component} from 'react'
import {Image, InteractionManager, ListView, RefreshControl, ScrollView, Text, View} from 'react-native'
import {connect} from "react-redux";
import {Header, List, ListItem} from 'react-native-elements'
// Styles
import styles from './Styles/LocationListScreenStyles'
import LocationActions from '../Redux/LocationRedux'

import {Colors} from '../Themes'

class LocationListScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const header = (
            <Header
                centerComponent={{text: 'Nearby', style: styles.navTitle}}
            />)

        return ({
            header
        })
    }


    constructor(props) {
        super(props)

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.onRefresh()
        })
    }

    onRefresh() {
        this.props.resetLocationList()
        this.props.getLocationList()
    }

    onPull() {
        this.props.resetLocationList()
        this.props.getLocationList()
    }

    onShowLocation(location) {
        this.props.selectLocation(location)
        this.props.navigation.navigate('LocationScreen')
    }

    getDistance(location){
        return (location.distance/1000).toFixed(1) + ' km'
    }

    getSubtitle(location){
        return (location.street + '\n' + location.tagline)
    }
    renderLocation(location, sectionId) {
        return (<ListItem style={styles.listItem}
                          avatar={{uri: location.thumbUrl}}
                          chevronColor={Colors.charcoal}
                          onPress={this.onShowLocation.bind(this, location)}
                          key={sectionId}
                          title={location.name}
                          subtitle={this.getSubtitle(location)}
                          subtitleNumberOfLines={2}
                          titleStyle={styles.listTitle}
                          rightTitle={this.getDistance(location)}
        />)
    }

    renderLocationList() {
        return (<List style={styles.listContainer}>
            <ListView
                renderRow={this.renderLocation.bind(this)}
                dataSource={this.ds.cloneWithRows(this.props.locations)}
                enableEmptySections
                onEndReached={this.props.getLocationList}
                refreshControl={
                    <RefreshControl
                        refreshing={this.props.fetching}
                        onRefresh={this.onPull.bind(this)}
                    />
                }
            />
        </List>)
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.container}>
                    {this.renderLocationList()}
                </View>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        locations: state.location.list,
        fetching: state.location.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetLocationList: () => dispatch(LocationActions.resetLocationList()),
        getLocationList: () => dispatch(LocationActions.getLocationList()),
        selectLocation: (location) => dispatch(LocationActions.selectLocation(location)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationListScreen)
