import React, { Component } from "react";
import Icon from 'react-native-vector-icons/Ionicons'

import {
    Text,
    StyleSheet,
    View,
} from 'react-native';


class HeaderComponent extends Component {

    render() {
        return (
            <View style={style.headerView}>
                <Icon style={{ marginRight: 100 }} name='cloud' size={45} color='#fff'></Icon>
                <Text style={style.textHeader}>SubNet Calculator</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        height: 55,
        backgroundColor: '#248f8d'
    },
    textHeader: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'fantasy',
        marginRight: 5
    },
})

export default HeaderComponent;