import {StyleSheet} from 'react-native'
import {ApplicationStyles, Metrics} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    ...ApplicationStyles.navBar,
    ...ApplicationStyles.list,
    container: {
        flex: 1,
        marginTop: Metrics.navBarHeight,
        paddingBottom: Metrics.baseMargin
    },
    logo: {
        marginTop: Metrics.doubleSection,
        height: Metrics.images.logo,
        width: Metrics.images.logo,
        resizeMode: 'contain'
    },
    centered: {
        alignItems: 'center'
    }
})
