import React, {Component} from "react";
import {Image, View} from "react-native";
import {Images} from "../Themes";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation"
// Styles
import styles from "./Styles/SplashScreenStyle";

class SplashScreen extends Component {

  static navigationOptions = ({navigation}) => {
    return ({
      header: null
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success === true) {

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({routeName: 'LocationListScreen'})
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch'/>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    success: state.startup.success,
  }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen)
