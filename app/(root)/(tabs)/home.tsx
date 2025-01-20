import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600 font-JakartaBold text-lg font-bold">Hello, NativeWind!</Text>
      </View>
    </SafeAreaView>
  );
}
