import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { GameProvider } from '../context/GameContext';

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <GameProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Клікер' }} />
          <Stack.Screen name="tasks" options={{ title: 'Завдання' }} />
        </Stack>
      </GameProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});