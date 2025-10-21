import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import GradientBackground from '../components/GradientBackground';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ReviewCard from '../components/ReviewCard';

export default function Community() {
  const [comment, setComment] = useState('');

  // Dados de exemplo para as avaliações
  const reviews = [
    {
      id: '1',
      user: { name: 'Ana' },
      book: { title: 'React Native in Action', image: 'https://picsum.photos/seed/101/200/300' },
      rating: 5,
      text: 'Este livro é incrível! Me ajudou a entender conceitos complexos de forma muito clara. Recomendo a todos que estão começando.',
    },
    {
      id: '2',
      user: { name: 'Bruno' },
      book: { title: 'JavaScript: The Good Parts', image: 'https://picsum.photos/seed/102/200/300' },
      rating: 4,
      text: 'Um clássico indispensável. Embora um pouco antigo, os fundamentos que ele ensina são atemporais e essenciais.',
    },
    {
      id: '3',
      user: { name: 'Carla' },
      book: { title: 'Clean Code', image: 'https://picsum.photos/seed/103/200/300' },
      rating: 5,
      text: 'Mudou a forma como eu escrevo código. Leitura obrigatória para qualquer desenvolvedor que se preze. Simplesmente fantástico!',
    },
  ];

  return (
    <GradientBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.commentContainer}>
            <MaterialIcons name="chat-bubble-outline" size={24} color="white" style={styles.commentIcon} />
            <TextInput
              style={styles.commentInput}
              placeholder="Adicionar um comentário..."
              placeholderTextColor="#ccc"
              value={comment}
              onChangeText={setComment}
            />
          </View>

          <ScrollView>
            {reviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 32,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 20,
  },
  commentIcon: {
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    height: '100%',
    color: "#fff",
    fontSize: 16,
  },
});