import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Animated, Dimensions } from 'react-native';
import ButtonMain from '../components/ButtonMain';
import { COLORS } from '../styles/colors';

const { height, width } = Dimensions.get('window');

const AnimatedBubble = ({ size, initialX, initialY, duration, delay }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(opacity, { toValue: 0.6, duration: 1000, useNativeDriver: true }),
          Animated.timing(translateY, { toValue: -height, duration, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(translateY, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
        ]),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.bubble,
        {
          width: size,
          height: size,
          left: initialX,
          top: initialY,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    />
  );
};

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <AnimatedBubble size={60} initialX={width * 0.1} initialY={height} duration={15000} delay={0} />
      <AnimatedBubble size={40} initialX={width * 0.8} initialY={height} duration={12000} delay={3000} />
      <AnimatedBubble size={80} initialX={width * 0.5} initialY={height} duration={18000} delay={6000} />
      <AnimatedBubble size={30} initialX={width * 0.3} initialY={height} duration={10000} delay={9000} />

      <View style={styles.container}>
        <Text style={styles.title}>MULTI-QUIZ</Text>
        <Text style={styles.subtitle}>Are you ready to test your knowledge?</Text>
        <ButtonMain
          title="LET'S GO!"
          onPress={() => navigation.navigate('Home')}
          color={COLORS.primary}
          textStyle={{ color: '#f3efda' }}
        />
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
    alignItems: 'center',
    padding: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 60,
    fontFamily: 'Mogra-Regular',
    textAlign: 'center',
    color: COLORS.accent,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 60,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: COLORS.secondary,
    borderRadius: 100,
  },
});

export default StartScreen;