import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
        <Link href="/" >
          <Text>Go to the home screen</Text>
        </Link>
    </>
  );
}

