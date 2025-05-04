import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ClickableObject from '../../components/ClickableObject';
import { useGameContext } from '../../context/GameContext';

export default function HomeScreen() {
  const router = useRouter();
  const { score } = useGameContext();

  return (
    <View style={styles.container}>
      <Text style={styles.scoreText}>Очки: {score}</Text>

      <View style={styles.objectContainer}>
        <ClickableObject />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/tasks')}
      >
        <Text style={styles.buttonText}>Завдання</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingBottom: 40,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  objectContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});