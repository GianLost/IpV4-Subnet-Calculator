import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import ItemDatabase from '../DataBase/ItemDatabase';
import CalcItem from '../Models/CalcItem';
import CalcList from './CalcList';

import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

class NetCalculator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ip: '',
            maskSubNet: '',
            maskSubNetPrefix: '',
            mixedOctet: '',
            netClass: '',
            netAdress: '',
            totalSubNet: '',
            totalNet: '',
            broadcastAdress: '',
            list: []
        }

        this.ListCalc();
    }

    Register = (ip, maskSubNet, maskSubNetPrefix, mixedOctet, netClass, netAdress, totalSubNet, broadcastAdress, totalNet) => {
        const newRegister = new CalcItem(ip, maskSubNet, maskSubNetPrefix, mixedOctet, netClass, netAdress, totalSubNet, broadcastAdress, totalNet);
        const dataBase = new ItemDatabase();
        dataBase.Inserir(newRegister);
        this.ListCalc();

    }

    ListCalc = () => {
        const dataBase = new ItemDatabase();
        dataBase.Listar().then(
            completeListTasks => {
                this.setState({ list: completeListTasks })
            }
        )
    }

    DelCalc = (id) => {
        const dataBase = new ItemDatabase();
        dataBase.Remover(id);
        this.ListCalc();
    }

    render() {

        return (

            <View>
                <View style={style.mainView}>

                    <View style={style.calcInputView}>

                        <TextInput maxLength={15} placeholderTextColor='#f2f2f' keyboardType='numeric' placeholder='Endereço da rede: (Ex: 192.168.0.10)' style={style.calcInputText} onChangeText={(typeValue) => { this.setState({ ip: typeValue }) }}></TextInput>

                        <TextInput maxLength={15} placeholderTextColor='#f2f2f' keyboardType='numeric' placeholder='Máscara de sub-rede: (Ex: 255.255.255.0)' style={style.calcInputText} onChangeText={(typeValue) => { this.setState({ maskSubNet: typeValue }) }}></TextInput>

                        <View style={style.cadButtonView}>

                            <TouchableOpacity

                                onPress={() => this.Register(this.state.ip, this.state.maskSubNet, this.state.maskSubNetPrefix, this.state.mixedOctet, this.state.netClass, this.state.netAdress, this.state.totalSubNet, this.state.broadcastAdress, this.state.totalNet )}
                                style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                                <Icon name='md-calculator' size={30} color='#fff'></Icon>

                            </TouchableOpacity>

                        </View>

                    </View>

                    <View style={style.calcListView}>

                        <Text style={style.calcListTitle}>Cálculo da sub-rede : </Text>

                        {
                            this.state.list.map(listCalcRegister => (
                                <CalcList
                                    id={listCalcRegister.id}
                                    item={listCalcRegister}
                                    ip={listCalcRegister.ip}
                                    maskSubNet={listCalcRegister.maskSubNet}
                                    maskSubNetPrefix={listCalcRegister.maskSubNetPrefix}
                                    mixedOctet={listCalcRegister.mixedOctet}
                                    netClass={listCalcRegister.netClass}
                                    netAdress={listCalcRegister.netAdress}
                                    totalSubNet={listCalcRegister.totalSubNet}
                                    broadcastAdress={listCalcRegister.broadcastAdress}
                                    totalNet={listCalcRegister.totalSubNet}
                                    delTask={this.DelCalc}
                                />
                            ))
                        }
                    </View>

                </View>
            </View>

        )
    }
}

const style = StyleSheet.create({

    mainView: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        marginTop: 170
    },
    calcInputView: {
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '95%',
        height: 300,
        backgroundColor: '#248f8d',
        padding: 10,
        borderRadius: 10
    },
    calcInputText: {
        width: '100%',
        height: 55,
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        borderRadius: 10,
        marginTop: 0,
        color: '#fff',
        fontSize: 17
    },
    cadButtonView: {
        marginTop: 10,
        marginLeft: 150,
        width: 55,
        height: 55,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#96c3a6',
    },
    cadButtonText: {
        color: '#248f8d',
        fontSize: 18,
        fontFamily: 'fantasy',
        fontWeight: 'bold',
    },
    calcListView: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    calcListTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginTop: 10
    }

})

export default NetCalculator;