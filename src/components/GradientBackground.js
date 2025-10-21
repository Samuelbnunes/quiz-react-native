import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      // Cores do gradiente: de cima (#313131) para baixo (#0D2633)
      colors={['#313131', '#122e3fff']}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});