import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

const ButtonMain = ({ title, onPress, style, textStyle, color = COLORS.primary }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});

export default ButtonMain;