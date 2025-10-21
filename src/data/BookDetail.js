import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

import { getBookBy } from "../services/bookService";
import GradientBackground from "../components/GradientBackground";


export default function BookDetail({ route }) {
  const { url } = route.params.book;
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBook();
  }, []);

  async function getBook() {
    setLoading(true);
    const response = await getBookBy(url);
    setBook(response);
    setLoading(false);
  }

  if (loading && !book) {
    return (
      <GradientBackground>
        <View style={[styles.container, { justifyContent: "center" }]}>
          <ActivityIndicator size={"large"} color={"#1599E4"} />
        </View>
      </GradientBackground>
    );
  } else if (book) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Image
            source={{ uri: book?.image }}
            style={styles.image}
          />
          <Text style={styles.name}>{book?.title}</Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Autor:</Text>
            <Text style={styles.value}>{book?.author}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Páginas:</Text>
            <Text style={styles.value}>{book?.pages}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>ISBN:</Text>
            <Text style={styles.value}>{book?.isbn}</Text>
          </View>
        </View>
      </GradientBackground>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: 'transparent',
  },
  image: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  value: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
    textAlign: 'right',
  },
});