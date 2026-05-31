import { View, Text, StyleSheet } from 'react-native';

export default function FamilyScreen() {
  return (
    <View style={styles.container}>
      <Text>가족</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
