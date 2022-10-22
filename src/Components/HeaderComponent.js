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
                <Icon style={{ marginRight: 80 }} name='cloud' size={40} color='#89b399'></Icon>
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
        height: 65,
        backgroundColor: '#fff'
    },
    textHeader: {
        color: '#89b399',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'fantasy',
        marginRight: 10
    },
})

export default HeaderComponent;