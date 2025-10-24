import React from 'react';
import { View, StyleSheet } from 'react-native';

const NeoView = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#000',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
});

export default NeoView;
