import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fetchQuestions, translateText } from '../services/apiService';
import { shuffleArray, decodeText } from '../utils/helpers';
import ButtonMain from '../components/ButtonMain';
import { COLORS } from '../styles/colors';
import { translations } from '../contexts/translations';
import ExitQuizModal from '../components/ExitQuizModal';

const QuizScreen = ({ route, navigation }) => {
  const { name, category, difficulty, amount, language } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isExitModalVisible, setExitModalVisible] = useState(false);

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions(amount, category, difficulty);
        let formattedQuestions = response.data.results.map((q) => ({
          ...q,
          answers: shuffleArray([...q.incorrect_answers, q.correct_answer]),
        }));

        if (language !== 'en') {
          setIsTranslating(true);
          const translatedQuestions = [];
          for (const q of formattedQuestions) {
            const translatedQuestion = await translateText(q.question, language);
            
            const translatedAnswers = [];
            for (const answer of q.answers) {
              const translatedAnswer = await translateText(answer, language);
              translatedAnswers.push(translatedAnswer);
            }

            const originalCorrectAnswerIndex = q.answers.indexOf(q.correct_answer);
            const translatedCorrectAnswer = translatedAnswers[originalCorrectAnswerIndex];

            translatedQuestions.push({
              ...q,
              question: translatedQuestion,
              answers: translatedAnswers,
              correct_answer: translatedCorrectAnswer,
            });
          }
          formattedQuestions = translatedQuestions;
        }

        setQuestions(formattedQuestions);
      } catch (error) {
        navigation.goBack();
      } finally {
        setLoading(false);
        setIsTranslating(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);

    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(prevScore => prevScore + 1);
    }

    setTimeout(() => {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (nextQuestionIndex < questions.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        navigation.replace('Result', {
          name,
          score,
          totalQuestions: questions.length,
          language,
        });
      }
    }, 1500);
  };

  const handleGoBack = () => {
    setExitModalVisible(true);
  };

  if (loading || isTranslating) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (questions.length === 0) {
    return <View />;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const getButtonColor = (answer) => {
    if (!isAnswered) return COLORS.primary;
    if (answer === currentQuestion.correct_answer) return COLORS.correct;
    if (answer === selectedAnswer) return COLORS.incorrect;
    return COLORS.primary;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExitQuizModal
        visible={isExitModalVisible}
        onClose={() => setExitModalVisible(false)}
        onConfirm={() => navigation.goBack()}
        t={t}
      />
      <Text style={styles.progressText}>
        {t.question || 'Question'} {currentQuestionIndex + 1} of {questions.length}
      </Text>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.quizContent}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{decodeText(currentQuestion.question)}</Text>
          </View>
          <View>
            {currentQuestion.answers.map((answer, index) => (
              <ButtonMain
                key={index}
                title={decodeText(answer)}
                onPress={() => handleAnswer(answer)}
                style={styles.optionButton}
                color={getButtonColor(answer)}
                disabled={isAnswered}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleGoBack}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="logout" size={24} color={COLORS.text} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  progressText: {
    fontSize: 40,
    fontFamily: 'Mogra-Regular',
    color: COLORS.secondary,
    textAlign: 'center',
    paddingTop: 130,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContentContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  quizContent: {
    marginTop: 10,
  },
  questionContainer: {
    backgroundColor: 'transparent',
    padding: 20,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 30,
    minHeight: 150,
    justifyContent: 'center',
  },
  questionText: {
    color: COLORS.text,
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  optionButton: {
    marginBottom: 15,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: COLORS.secondary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    zIndex: 10,
  },
});

export default QuizScreen;