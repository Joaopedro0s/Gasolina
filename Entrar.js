import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

class Entrar extends Component {
  render() {
    return (
      <View style={{ backgroundColor: '#292929', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#FFF', fontSize: 28, marginBottom: 20 }}></Text>
        <Button title='Sair' onPress={this.props.fechar} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Entrar;
