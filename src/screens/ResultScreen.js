import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import ButtonMain from '../components/ButtonMain';
import { COLORS } from '../styles/colors';
import { translations } from '../contexts/translations';

const ResultScreen = ({ route, navigation }) => {
  const { name, score, totalQuestions, language } = route.params;

  const t = translations[language] || translations.en;
  
  const handlePlayAgain = () => {
    navigation.goBack();
  };

  const handleExit = () => {
    navigation.popToTop();
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>{t.gameOver || 'Game Over!'}</Text>
        <Text style={styles.nameText}>{t.congratulations || 'Congratulations,'} {name}!</Text>

        <View style={styles.scoreContainer}>
          <Text style={styles.scoreLabel}>{t.yourScore || 'Your score was:'}</Text>
          <Text style={styles.scoreText}>
            {score} / {totalQuestions}
          </Text>
        </View>

        <ButtonMain
          title={t.playAgain || 'PLAY AGAIN'}
          onPress={handlePlayAgain}
          color={COLORS.accent}
          textStyle={{ color: '#3b142a' }}
        />
        <TouchableOpacity onPress={handleExit}>
           <Text style={styles.text}>{t.exit || 'Exit'}</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Mogra-Regular',
    color: COLORS.secondary,
  },
  nameText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 40,
  },
  scoreContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 20,
    marginBottom: 10,
    color: COLORS.text,
    fontFamily: 'Poppins-Regular'
  },
  scoreText: {
    fontSize: 60,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    paddingTop: 30,
    marginBottom: 8,
  },
});

export default ResultScreen;