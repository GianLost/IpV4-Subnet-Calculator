import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

class CalcList extends Component { // Componente CalcList onde ocorrem os cálculos de rede e conversões;

    styleInput = StyleSheet.create({

        // Estilo padrão para os campos que receberão os métodos

        Inputs: {
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            marginBottom: 10,
            borderTopWidth: 0.3,
            borderRightWidth: 0.3,
            borderLeftWidth: 0.3,
            borderBottomWidth: 2,
            backgroundColor: '#fefeeb',
            borderRadius: 5,
            padding: 2,
            color: '#89b399',
            fontSize: 16,
            fontWeight: 'bold',
            width: '100%'

        }
    })

    convertIpBin() { // -- Converte a propriedade ip em binário

        var ipSplit = this.props.ip.split('.'); // ipSplit converte o props "ip" em um array contendo 4 índices;

        /* Armazenando cada índice do array convertidos em binário, cada indíce em uma variável; */
        var ipDec1 = parseInt(ipSplit[0]).toString(2);
        var ipDec2 = parseInt(ipSplit[1]).toString(2);
        var ipDec3 = parseInt(ipSplit[2]).toString(2);
        var ipDec4 = parseInt(ipSplit[3]).toString(2);

        /* A função adicionar zero a esquerda faz o que diz, um Ip obrigatoriamente é formado de octetos(8bits), porém ao utilizar a conversão de decimal para binário com o toString() a função não considera o formato de oito bits, essa função então complementa o índice para sempre se manter em formato de 32 bits ou 4 octetos; */

        function addZeroes(num, len) {

            var numberWithZeroes = String(num);
            var counter = numberWithZeroes.length;

            while (counter < len) {

                numberWithZeroes = "0" + numberWithZeroes;
                counter++;

            }

            return numberWithZeroes;
        }

        // ipBin Agrupa os índices no formato de 4 octetos (00000000.00000000.00000000.00000000);     
        var ipBin = addZeroes(ipDec1, 8) + "." + addZeroes(ipDec2, 8) + "." + addZeroes(ipDec3, 8) + "." + addZeroes(ipDec4, 8);

        const regExp = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])$/

        if (this.props.ip != regExp) { // Valido se a propriedade ip foi preenchida, caso seja verdadeiro passo um novo valor para a propriedade;
               
            
            this.props.ip = ipBin // Atríbuindo o valor da conversão binária para a propriedade ip;

            return this.styleInput.Inputs;

        }else {
            alert('Ip inválido')
            return false;
        }

    }

    convertMaskSubNetBin() { // Converte a máscara de rede em binário seguindo os mesmos padrões da conversão do Ip;

        var maskSubNetSplit = this.props.maskSubNet.split('.');

        var maskSubNetDec1 = parseInt(maskSubNetSplit[0]).toString(2);
        var maskSubNetDec2 = parseInt(maskSubNetSplit[1]).toString(2);
        var maskSubNetDec3 = parseInt(maskSubNetSplit[2]).toString(2);
        var maskSubNetDec4 = parseInt(maskSubNetSplit[3]).toString(2);

        function addZeroes(num, len) {

            var numberWithZeroes = String(num);
            var counter = numberWithZeroes.length;

            while (counter < len) {

                numberWithZeroes = "0" + numberWithZeroes;

                counter++;

            }

            return numberWithZeroes;
        }

        var maskSubNetBin = addZeroes(maskSubNetDec1, 8) + "." + addZeroes(maskSubNetDec2, 8) + "." + addZeroes(maskSubNetDec3, 8) + "." + addZeroes(maskSubNetDec4, 8);

        const regExp = /^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][1-9]|2[0-5][0-5])$/

        if (this.props.maskSubNet = regExp) { 
                 
            this.props.maskSubNet = maskSubNetBin 

            return this.styleInput.Inputs;

        }else {

            return false;
            
        }
    }


    searchPrefix() {

        /* Calcula o CIDR da rede com base ná fórmula padrão de 2^n onde n= Bits 1 utilizados para a sub-rede; */

        var mask = this.props.maskSubNet;

        try {
            var prefixCidr = (mask.match(/1/g)).length;
        } catch (error) {
            console.log(error);
        }

        if (this.props.maskSubNetPrefix == '') {

            this.props.maskSubNetPrefix = "/" + prefixCidr; /* Atribuindo o valor de prefixo da rede(CIDR) ao props maskSubNetPrefix; */

            return this.styleInput.Inputs;
        }

    }

    mixedOctet() { // Retorna o octeto misto da máscara de sub-rede;

        var maskSubNetSplit = this.props.maskSubNet.split('.'); // maskSubNetSplit converte o props "maskSubNet" em um array contendo 4 índices;
        var foundOctet = maskSubNetSplit.find(element => element != '11111111'); // Busca os os octetos diferentes ao formato "00000000" e "11111111";

        function toDecimal(bin)  // Função que irá converter os índices do array de binário para decimal;
        {
            let dec = 0;

            try {

                for (let c = bin.length - 1, i = 0; c >= 0; c--, i++) {

                    dec += bin[c] * Math.pow(2, i);
    
                }
    
                return dec;
            } catch (error) {
                console.log(error);
            }

        }

        if (foundOctet != '00000000' || foundOctet != '11111111') {

            /* Se mixedOctet possuir valores diferentes de "00000000" e "11111111" atribuo um novo valor ao props; */
            this.props.mixedOctet = toDecimal(foundOctet); // Atribuíndo novo valor caso a condição seja satisfeita;

            return this.styleInput.Inputs;
        }

    }

    classIp() {

        var splitIp = this.props.ip.split('.');

        if (splitIp[0].slice(0, 1) === "0") {

            this.props.netClass = "Classe A";

            return this.styleInput.Inputs;

        } else if (splitIp[0].slice(0, 2) === "10") {

            this.props.netClass = "Classe B";

            return this.styleInput.Inputs;

        } else if (splitIp[0].slice(0, 3) === "110") {

            this.props.netClass = "Classe C";

            return this.styleInput.Inputs;

        } else if (splitIp[0].slice(0, 4) === "1110") {

            this.props.netClass = "Classe D";

            return this.styleInput.Inputs;

        } else if (splitIp[0].slice(0, 4) === "1111") {

            this.props.netClass = "Classe E";

            return this.styleInput.Inputs;
        }
    }

    netQuantity() {

        var cidr = this.props.maskSubNetPrefix.split('/');

        var cidrDecA = parseInt(cidr[1]) - 8;
        var cidrDecB = parseInt(cidr[1]) - 16;
        var cidrDecC = parseInt(cidr[1]) - 24;
        var cidrDecD = 0;
        var cidrDecE = 0;

        if (this.props.netClass == 'Classe A') {
            this.props.totalNet = Math.pow(2, cidrDecA);

            return this.styleInput.Inputs;

        } else if (this.props.netClass == 'Classe B') {
            this.props.totalNet = Math.pow(2, cidrDecB);

            return this.styleInput.Inputs;

        } else if (this.props.netClass == 'Classe C') {
            this.props.totalNet = Math.pow(2, cidrDecC) ;

            return this.styleInput.Inputs;

        } else if (this.props.netClass == 'Classe D') {
            this.props.totalNet = cidrDecD;

            return this.styleInput.Inputs;

        } else if (this.props.netClass == 'Classe E') {
            this.props.totalNet = cidrDecE;

            return this.styleInput.Inputs;

        }



    }

    hostsQuantity() {

        var octet = this.props.maskSubNetPrefix.split('/');
        var count = 32 - octet[1];
        var pow = Math.pow(2, count);

        if (this.props.netClass == 'Classe A' || this.props.netClass == 'Classe B' || this.props.netClass == 'Classe C') {

            this.props.totalSubNet = pow - 2;

            return this.styleInput.Inputs;
        } else if(this.props.netClass == 'Classe D' || this.props.netClass == 'Classe E') {
            
            this.props.totalSubNet = 0;

            return this.styleInput.Inputs;
        }
    }

    netAdress() {

        var ipSplit = this.props.ip.split('.');
        var maskSplit = this.props.maskSubNet.split('.');

        try {

            var ipDec1 = ipSplit[0].toString(2);
            var ipDec2 = ipSplit[1].toString(2);
            var ipDec3 = ipSplit[2].toString(2);
            var ipDec4 = ipSplit[3].toString(2);

            var maskDec1 = maskSplit[0].toString(2);
            var maskDec2 = maskSplit[1].toString(2);
            var maskDec3 = maskSplit[2].toString(2);
            var maskDec4 = maskSplit[3].toString(2);
            
        } catch (error) {
            console.log(error)
        }

        function toDecimal(bin) {

            let dec = 0;

            for (let c = bin.length - 1, i = 0; c >= 0; c--, i++) {

                dec += bin[c] * Math.pow(2, i);

            }

            return dec;
        }

        function addZeroes(num, len) {

            var numberWithZeroes = String(num);
            var counter = numberWithZeroes.length;

            while (counter < len) {

                numberWithZeroes = "0" + numberWithZeroes;
                counter++;
            }

            return numberWithZeroes;

        }


        function netVerify(ip, mask) {

            ip = addZeroes(ipDec1, 8) + '.' + addZeroes(ipDec2, 8) + '.' + addZeroes(ipDec3, 8) + '.' + addZeroes(ipDec4, 8);
            mask = addZeroes(maskDec1, 8) + '.' + addZeroes(maskDec2, 8) + '.' + addZeroes(maskDec3, 8) + '.' + addZeroes(maskDec4, 8);

            let net = "";

            for (let i = 0; i < ip.length; i++) {

                let ipBin = ip.charAt(i);
                let maskBin = mask.charAt(i);

                if (ipBin === "." || maskBin === ".") {

                    net += ipBin || maskBin;

                } else {

                    net += ipBin & maskBin;

                }
            }

            return net;
        }

        var searchedNet = netVerify(ipSplit, maskSplit).split('.');

        var searchedNetDec = toDecimal(searchedNet[0]) + '.' + toDecimal(searchedNet[1]) + '.' + toDecimal(searchedNet[2]) + '.' + toDecimal(searchedNet[3]);

        if (this.props.netAdress == '') {

            this.props.netAdress = searchedNetDec;

            return this.styleInput.Inputs;

        }
    }

    broadcastAdress() {

        var ipSplit = this.props.ip.split('.');
        var maskSplit = this.props.maskSubNet.split('.');

        try {
            var ipDec1 = ipSplit[0].toString(2);
            var ipDec2 = ipSplit[1].toString(2);
            var ipDec3 = ipSplit[2].toString(2);
            var ipDec4 = ipSplit[3].toString(2);

            var maskDec1 = maskSplit[0].toString(2);
            var maskDec2 = maskSplit[1].toString(2);
            var maskDec3 = maskSplit[2].toString(2);
            var maskDec4 = maskSplit[3].toString(2);
        } catch (error) {
            console.log(error);
        }


        function toDecimal(bin) {

            let dec = 0;

            for (let c = bin.length - 1, i = 0; c >= 0; c--, i++) {

                dec += bin[c] * Math.pow(2, i);

            }

            return dec;

        }

        function addZeroes(num, len) {

            var numberWithZeroes = String(num);
            var counter = numberWithZeroes.length;

            while (counter < len) {

                numberWithZeroes = "0" + numberWithZeroes;
                counter++;

            }

            return numberWithZeroes;

        }

        function binaryNegation(value) {

            return value === "1" ? "0" : "1";

        }

        function binaryNegationOctet(value) {

            let negationValue = "";

            for (let i = 0; i < value.length; i++) {

                let valueBin = value.charAt(i);

                if (valueBin === ".") {

                    negationValue += valueBin;

                } else {

                    negationValue += binaryNegation(valueBin);

                }

            }

            return negationValue;
        }


        function broadcastVerify(ip, mask) {

            ip = addZeroes(ipDec1, 8) + '.' + addZeroes(ipDec2, 8) + '.' + addZeroes(ipDec3, 8) + '.' + addZeroes(ipDec4, 8);

            mask = binaryNegationOctet(addZeroes(maskDec1, 8) + '.' + addZeroes(maskDec2, 8) + '.' + addZeroes(maskDec3, 8) + '.' + addZeroes(maskDec4, 8));

            let broadcast = "";

            for (let i = 0; i < ip.length; i++) {

                let ipBin = ip.charAt(i);

                let maskBin = mask.charAt(i);

                if (ipBin === "." || maskBin === ".") {

                    broadcast += ".";

                } else {

                    broadcast += ipBin | maskBin;

                }

            }

            return broadcast;
        }

        var foundBroad = broadcastVerify(ipSplit, maskSplit).split('.');

        var foundBroad2 = toDecimal(foundBroad[0]) + '.' + toDecimal(foundBroad[1]) + '.' + toDecimal(foundBroad[2]) + '.' + toDecimal(foundBroad[3]);

        if (this.props.broadcastAdress == '') {

            this.props.broadcastAdress = foundBroad2;

            return this.styleInput.Inputs;
        }
    }

    render() {

        return (

            <View style={{ width: '100%', maxHeight: '100%', alignItems: 'center', margin: 10, display: 'flex' }}>

                <View style={style.calcListView}>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Ip : </Text>
                        <Text style={this.styleInput.Inputs}>{this.props.ip}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Ip em binário : </Text>
                        <Text style={this.convertIpBin()}>{this.props.ip}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Classe do endereço Ip : </Text>
                        <Text style={this.classIp()}>{this.props.netClass}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Máscara de sub-rede : </Text>
                        <Text style={this.styleInput.Inputs}>{this.props.maskSubNet}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Máscara de sub-rede em binário : </Text>
                        <Text style={this.convertMaskSubNetBin()}>{this.props.maskSubNet}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Octeto Misto : </Text>
                        <Text style={this.mixedOctet()}>{this.props.mixedOctet}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>CIDR : </Text>
                        <Text style={this.searchPrefix()}>{this.props.maskSubNetPrefix}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Endereço da rede : </Text>
                        <Text style={this.netAdress()}>{this.props.netAdress}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Endereço de Broadcast : </Text>
                        <Text style={this.broadcastAdress()}>{this.props.broadcastAdress}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Total de  Sub-redes : </Text>
                        <Text style={this.netQuantity()}>{this.props.totalNet}</Text>

                    </View>

                    <View style={{ flexDirection: 'column' }}>

                        <Text style={style.calcListText}>Hosts disponíveis por Sub-rede: </Text>
                        <Text style={this.hostsQuantity()}>{this.props.totalSubNet}</Text>

                    </View>

                    <View style={style.cadButtonView}>

                        <TouchableOpacity

                            onPress={() => this.props.delTask(this.props.id)}
                            style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>

                            <Icon name="trash-sharp" size={25} color="#fff"></Icon>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        )

    }

}

const style = StyleSheet.create({

    calcListView: {

        alignContent: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#248f8d',
        borderRadius: 10,
        marginTop: 30,
        width: '90%',
        maxHeight: '100%',
        minHeight: '50%',
        marginTop: 10,
        padding: 18,
        height: 900,
    },

    calcListText: {

        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5

    },

    cadButtonView: {

        marginTop: 10,
        marginLeft: 145,
        width: 45,
        height: 45,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: '#96c3a6',

    }

})

export default CalcList;