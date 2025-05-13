import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  Animated,
  Easing,
  Platform
} from 'react-native';

class Calculo extends Component {
  state = {
    scaleAnim: new Animated.Value(0.8),
    fadeAnim: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }

  render() {
    const { resultado, mostrarModal, fecharModal } = this.props;
    const { scaleAnim, fadeAnim } = this.state;

    const isError = resultado.includes('ERRO');
    const icon = isError ? '⚠' : '✓';
    const mainColor = isError ? '#FF3264' : '#00F0FF';

    return (
      <Modal
        transparent={true}
        visible={mostrarModal}
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={styles.modalBackdrop}>
          <Animated.View 
            style={[
              styles.modalContainer,
              { opacity: fadeAnim }
            ]}
          >
            <Animated.View 
              style={[
                styles.modalContent,
                { 
                  transform: [{ scale: scaleAnim }],
                  borderColor: mainColor,
                }
              ]}
            >
              <View style={styles.resultContainer}>
                <Text style={[styles.resultIcon, { color: mainColor }]}>{icon}</Text>
                <Text style={[styles.resultado, { color: mainColor }]}>{resultado}</Text>
              </View>
              
              <View style={styles.separator} />
              
              <TouchableOpacity 
                onPress={fecharModal} 
                style={[styles.closeButton, { borderColor: mainColor }]}
                activeOpacity={0.7}
              >
                <Text style={[styles.closeButtonText, { color: mainColor }]}>CONFIRMAR</Text>
                <View style={[styles.buttonGlow, { backgroundColor: `${mainColor}20` }]} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalContainer: {
    width: '80%',
    ...Platform.select({
      web: {
        boxShadow: '0 0 20px rgba(0, 240, 255, 0.5)',
      },
      default: {
        shadowColor: '#00F0FF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
      }
    }),
    elevation: 20,
  },
  modalContent: {
    backgroundColor: 'rgba(20, 25, 50, 0.95)',
    borderRadius: 15,
    borderWidth: 1,
    overflow: 'hidden',
  },
  resultContainer: {
    padding: 30,
    alignItems: 'center',
  },
  resultIcon: {
    fontSize: 40,
    marginBottom: 15,
  },
  resultado: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0, 240, 255, 0.2)',
    marginHorizontal: 20,
  },
  closeButton: {
    padding: 18,
    alignItems: 'center',
    borderTopWidth: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    position: 'relative',
    zIndex: 2,
  },
  buttonGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Calculo;