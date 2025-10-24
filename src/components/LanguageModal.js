import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ButtonMain from './ButtonMain';
import { COLORS } from '../styles/colors';

const LanguageModal = ({ visible, onClose, onSelectLanguage, t }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{t.selectLanguage}</Text>

          <ButtonMain
            title="English"
            onPress={() => onSelectLanguage('en')}
            style={styles.button}
            color={COLORS.secondary}
          />
          <ButtonMain
            title="Português"
            onPress={() => onSelectLanguage('pt')}
            style={styles.button}
            color={COLORS.secondary}
          />
          <ButtonMain
            title="Español"
            onPress={() => onSelectLanguage('es')}
            style={styles.button}
            color={COLORS.secondary}
          />

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>{t.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.background,
    padding: 35,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
    width: '85%',
  },
  modalTitle: {
    fontSize: 28,
    fontFamily: 'Mogra-Regular',
    color: COLORS.text,
    marginBottom: 25,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    marginBottom: 15,
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelText: {
    color: COLORS.text,
    fontFamily: 'Poppins-Regular',
    textDecorationLine: 'underline',
  },
});

export default LanguageModal;