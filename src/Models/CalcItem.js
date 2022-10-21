export default class CalcItem {

    constructor(ip, maskSubNet, maskSubNetPrefix, mixedOctet, netClass, netAdress, totalSubNet, broadcastAdress, totalNet) {

        this.ip = ip;
        this.maskSubNet = maskSubNet;
        this.maskSubNetPrefix = maskSubNetPrefix;
        this.mixedOctet = mixedOctet;
        this.netClass = netClass;
        this.netAdress = netAdress;
        this.totalSubNet = totalSubNet;
        this.broadcastAdress = broadcastAdress;
        this.totalNet = totalNet;

    }
}