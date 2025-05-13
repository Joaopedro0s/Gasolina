import React, { Component } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import Calculo from './Calculo';

class Entrar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputAlcool: '',
      inputGasolina: '',
      mostrarModal: false,
      resultado: '',
      glowAnim: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.glowAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(this.state.glowAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  }

  gravaNome = () => {
    const { inputAlcool, inputGasolina } = this.state;
    const alcool = parseFloat(inputAlcool.replace(',', '.'));
    const gasolina = parseFloat(inputGasolina.replace(',', '.'));

    if (!isNaN(alcool) && !isNaN(gasolina) && gasolina > 0) {
      const resultado = alcool / gasolina < 0.7 ? 
        '✓ EFICIÊNCIA: MELHOR USAR ÁLCOOL' : 
        '✓ EFICIÊNCIA: MELHOR USAR GASOLINA';
      this.setState({ resultado, mostrarModal: true });
    } else {
      this.setState({ 
        resultado: '⚠ ERRO: INSIRA VALORES VÁLIDOS', 
        mostrarModal: true 
      });
    }
  };

  render() {
    const { glowAnim } = this.state;
    const glowInterpolation = glowAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(0, 240, 255, 0.1)', 'rgba(0, 240, 255, 0.3)']
    });

    return (
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.backgroundOverlay} />
        
        {/* Cabeçalho Holográfico */}
        <View style={styles.header}>
          <View style={styles.headerGlow} />
          <Text style={styles.headerTitle}>PAINEL DE ANÁLISE</Text>
          <Text style={styles.headerSubtitle}>SISTEMA DE OTIMIZAÇÃO DE COMBUSTÍVEL</Text>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={this.props.fechar}
            activeOpacity={0.7}
          >
            <Text style={styles.closeButtonText}>FECHAR SISTEMA</Text>
          </TouchableOpacity>
        </View>

        {/* Área de Inputs Tecnológica */}
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>PREÇO DO ÁLCOOL</Text>
            <Animated.View style={[styles.inputGlow, { backgroundColor: glowInterpolation }]} />
            <TextInput
              style={styles.input}
              placeholder="R$ 0.00"
              placeholderTextColor="rgba(200, 220, 255, 0.4)"
              keyboardType="decimal-pad"
              value={this.state.inputAlcool}
              onChangeText={(text) => this.setState({ inputAlcool: text })}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>PREÇO DA GASOLINA</Text>
            <Animated.View style={[styles.inputGlow, { backgroundColor: glowInterpolation }]} />
            <TextInput
              style={styles.input}
              placeholder="R$ 0.00"
              placeholderTextColor="rgba(200, 220, 255, 0.4)"
              keyboardType="decimal-pad"
              value={this.state.inputGasolina}
              onChangeText={(text) => this.setState({ inputGasolina: text })}
            />
          </View>
          
          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={this.gravaNome}
            activeOpacity={0.7}
          >
            <Text style={styles.calculateButtonText}>ANALISAR EFICIÊNCIA</Text>
            <View style={styles.calculateButtonGlow} />
          </TouchableOpacity>
        </View>

        {/* Modal de Resultados */}
        <Calculo
          resultado={this.state.resultado}
          mostrarModal={this.state.mostrarModal}
          fecharModal={() => this.setState({ mostrarModal: false })}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A12',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(10, 5, 30, 0.9)',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 240, 255, 0.2)',
    alignItems: 'center',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
  },
  headerTitle: {
    color: '#00F0FF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 240, 255, 0.4)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  headerSubtitle: {
    color: 'rgba(200, 220, 255, 0.7)',
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(255, 50, 100, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 50, 100, 0.5)',
  },
  closeButtonText: {
    color: '#FF3264',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  inputsContainer: {
    flex: 1,
    padding: 30,
    paddingTop: 40,
  },
  inputWrapper: {
    marginBottom: 30,
    position: 'relative',
  },
  inputGlow: {
    position: 'absolute',
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    borderRadius: 12,
    zIndex: 0,
  },
  inputLabel: {
    color: '#00F0FF',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(20, 25, 50, 0.7)',
    padding: 18,
    borderRadius: 10,
    color: '#FFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    fontSize: 16,
    position: 'relative',
    zIndex: 1,
  },
  calculateButton: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#00F0FF',
    marginTop: 20,
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  calculateButtonText: {
    color: '#00F0FF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    position: 'relative',
    zIndex: 2,
  },
  calculateButtonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    zIndex: 1,
  },
});

export default Entrar;