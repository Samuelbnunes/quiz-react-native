import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, SafeAreaView, StatusBar, TouchableOpacity, BackHandler } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { fetchCategories } from '../services/apiService';
import ButtonMain from '../components/ButtonMain';
import LanguageModal from '../components/LanguageModal';
import { translations } from '../contexts/translations';
import { COLORS } from '../styles/colors';

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [language, setLanguage] = useState('en');
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data.trivia_categories || []);
      } catch (error) {
        Alert.alert('Error', 'Could not load categories.');
      }
    };
    loadCategories();
  }, []);

  const t = translations[language] || translations.en;

  const handleLanguageChange = () => {
    setLanguageModalVisible(true);
  };

  const onSelectLanguage = (lang) => {
    setLanguage(lang);
    setLanguageModalVisible(false);
  };

  const handleStartQuiz = () => {
    if (!name.trim()) {
      Alert.alert(t.attention, t.enterNamePrompt);
      return;
    }

    let amount = 10;
    if (difficulty === 'medium') {
      amount = 15;
    } else if (difficulty === 'hard') {
      amount = 20;
    }

    navigation.navigate('Quiz', {
      name,
      category: selectedCategory,
      difficulty,
      amount,
      language,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LanguageModal
        visible={isLanguageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onSelectLanguage={onSelectLanguage}
        t={t}
      />
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.exitButton}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="logout" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLanguageChange}
          style={styles.languageButton}
          activeOpacity={0.7}
        >
          <Text style={styles.languageButtonText}>{language.toUpperCase()}</Text>
        </TouchableOpacity>

        <Text style={styles.title}>MULTI-QUIZ</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>{t.name}</Text>
          <TextInput
            style={styles.input}
            placeholder={t.enterName}
            value={name}
            onChangeText={setName}
            placeholderTextColor="#f3efda"
          />

          <Text style={styles.label}>{t.category}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              <Picker.Item label={t.anyCategory} value="" />
              {categories.map((cat) => (
                <Picker.Item
                  key={cat.id}
                  label={t.categories(cat.name)}
                  value={cat.id}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.label}>{t.difficulty}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={difficulty}
              onValueChange={(itemValue) => setDifficulty(itemValue)}
            >
              <Picker.Item label={t.easy} value="easy" />
              <Picker.Item label={t.medium} value="medium" />
              <Picker.Item label={t.hard} value="hard" />
            </Picker>
          </View>
        </View>
        <ButtonMain title={t.startQuiz} onPress={handleStartQuiz} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 60,
    fontFamily: 'Mogra-Regular',
    textAlign: 'center',
    color: COLORS.accent,
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.border,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: COLORS.text,
    fontFamily: 'Poppins-Regular',
  },
  pickerContainer: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: COLORS.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.border,
    zIndex: 10,
  },
  languageButton: {
    position: 'absolute',
    top: 50,
    right: 20,
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
  languageButtonText: {
    color: COLORS.text,
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
});

export default HomeScreen;