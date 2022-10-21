import React, { Component } from "react";
import HeaderComponent from "./src/Components/HeaderComponent";
import NetCalculator from "./src/Components/NetCalculator";

import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';


class App extends Component {

  render() {
    return (
      <View style={style.mainView}>
        <View>
          <HeaderComponent />
        </View>
        <View>
          <ScrollView>
            <View>
              <NetCalculator />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const style = StyleSheet.create({
  mainView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#96c3a6',
  }
})
export default App;