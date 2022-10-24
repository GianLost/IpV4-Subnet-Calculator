import React, { Component } from 'react';
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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

        try {
            
            const newRegister = new CalcItem(ip, maskSubNet, maskSubNetPrefix, mixedOctet, netClass, netAdress, totalSubNet, broadcastAdress, totalNet);
            const dataBase = new ItemDatabase();
        
            dataBase.Inserir(newRegister);
            this.ListCalc();

            Validar(newRegister);
            
    
        } catch (error) {
            console.log('An error')
        }
        
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

                        <View>

                            <Icon name='access-point-network' size={50} color='#fff'></Icon>

                        </View>

                        <TextInput id= 'ip' maxLength={15} placeholderTextColor='#f2f2f' keyboardType='numeric' placeholder='Endereço da rede: (Ex: 192.168.0.10)' style={style.calcInputText} onChangeText={(typeValue) => { this.setState({ ip: typeValue }) }}></TextInput>

                        <TextInput id= 'mask' maxLength={15} placeholderTextColor='#f2f2f' keyboardType='numeric' placeholder='Máscara de sub-rede: (Ex: 255.255.255.0)' style={style.calcInputText} onChangeText={(typeValue) => { this.setState({ maskSubNet: typeValue }) }}></TextInput>
                        
                        <View style={style.cadButtonView}>

                            <TouchableOpacity

                                onPressIn={() => this.Register(this.state.ip, this.state.maskSubNet, this.state.maskSubNetPrefix, this.state.mixedOctet, this.state.netClass, this.state.netAdress, this.state.totalSubNet, this.state.broadcastAdress, this.state.totalNet)}>

                                <Text style={style.cadButtonText} > Calcular <Icon name='ip-network' size={20} color='#89b399'> </Icon> </Text>

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
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',

    },

    calcInputText: {

        width: '95%',
        height: 55,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderBottomWidth: 3,
        backgroundColor: '#89b399',
        textAlign: 'center',
        padding: 15,
        borderRadius: 10,
        color: '#fff',
        fontSize: 17

    },

    cadButtonView: {

        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
        padding: 10,
        width: 130,
        height: 45,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#89b399',
        backgroundColor: '#fefeeb'

    },

    cadButtonText: {

        textShadowColor: '#fff',
        textAlign: 'center',
        color: '#89b399',
        fontSize: 15,
        fontFamily: 'fantasy',
        fontWeight: 'bold'

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