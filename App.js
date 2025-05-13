import React, { Component } from 'react';
import { StyleSheet, View, Button, Modal } from 'react-native';
import Entrar from './Entrar'; 

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      visibleModal: false
    };
    this.entrar = this.entrar.bind(this);
  }

  entrar(){
    this.setState({ visibleModal: true });
  }

  sair(visible){
    this.setState({ visibleModal: visible });
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Seja bem vindo!" onPress={this.entrar} />
        <Modal animationType='slide' visible={this.state.visibleModal}>
          <Entrar fechar={() => this.sair(false)} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});

export default App;
