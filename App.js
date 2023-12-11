import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MemoryGame from './MemoryGame'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <MemoryGame />
    </View>
  );
}
