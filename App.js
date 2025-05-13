import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing, TouchableOpacity, Text } from 'react-native';
import Entrar from './Entrar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModal: false,
      pulseAnim: new Animated.Value(1)
    };
    
    this.entrar = this.entrar.bind(this);
  }

  componentDidMount() {
    this.startPulseAnimation();
  }

  startPulseAnimation() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(this.state.pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }

  entrar() {
    this.setState({ visibleModal: true });
  }

  sair(visible) {
    this.setState({ visibleModal: visible });
  }

  render() {
    const { pulseAnim } = this.state;
    
    return (
      <View style={styles.container}>
        <View style={styles.backgroundGlow} />
        
        <Animated.View style={[styles.content, { transform: [{ scale: pulseAnim }] }]}>
          <Text style={styles.title}>FUEL OPTIMIZER</Text>
          <Text style={styles.subtitle}>Sistema de Análise de Combustível</Text>
          
          <TouchableOpacity 
            style={styles.enterButton}
            onPress={this.entrar}
            activeOpacity={0.7}
          >
            <Text style={styles.enterButtonText}>INICIAR SISTEMA</Text>
            <View style={styles.buttonGlow} />
          </TouchableOpacity>
        </Animated.View>
        
        <Modal 
          animationType='slide'
          visible={this.state.visibleModal}
          transparent={true}
        >
          <Entrar fechar={() => this.sair(false)} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A12',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundGlow: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    backgroundColor: 'rgba(10, 5, 30, 0.8)',
    transform: [{ rotate: '45deg' }],
  },
  content: {
    alignItems: 'center',
    padding: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(20, 15, 40, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(100, 65, 165, 0.3)',
    shadowColor: '#641EA5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    color: '#00F0FF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 240, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  subtitle: {
    color: 'rgba(200, 220, 255, 0.8)',
    fontSize: 14,
    marginBottom: 40,
    letterSpacing: 1,
  },
  enterButton: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00F0FF',
    overflow: 'hidden',
  },
  enterButtonText: {
    color: '#00F0FF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    position: 'relative',
    zIndex: 2,
  },
  buttonGlow: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    borderRadius: 15,
  },
});

export default App;