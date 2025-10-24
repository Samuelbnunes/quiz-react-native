import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import ButtonMain from './ButtonMain';
import { COLORS } from '../styles/colors';

const ExitQuizModal = ({ visible, onClose, onConfirm, t }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{t.exitQuizTitle}</Text>
          <Text style={styles.modalMessage}>{t.exitQuizMessage}</Text>

          <View style={styles.buttonContainer}>
            <ButtonMain
              title={t.cancel}
              onPress={onClose}
              style={styles.button}
              color={COLORS.secondary}
              textStyle={{ fontSize: 11 }}
            />
            <ButtonMain
              title={t.exit}
              onPress={onConfirm}
              style={styles.button}
              color={COLORS.primary}
              textStyle={{ fontSize: 11 }}
            />
          </View>
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
    marginBottom: 15,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 30,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: '45%',
  },
});

export default ExitQuizModal;