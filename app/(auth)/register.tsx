import { router } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Register() {
  return (
    <View className="flex-1 bg-white px-6 justify-center">
      
      {/* Title */}
      <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
        Create Account
      </Text>
      <Text className="text-center text-gray-500 mb-8">
        Join SewaLanka today
      </Text>

      {/* Name */}
      <TextInput
        placeholder="Full Name"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />

      {/* Email */}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
      />

      {/* Register Button */}
      <TouchableOpacity className="bg-blue-600 py-4 rounded-xl">
        <Text className="text-white text-center font-semibold text-lg">
          Register
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-center text-gray-500 mt-6">
        Already have an account?{" "}
        <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-blue-900 font-black text-base">
                  Login
                </Text>
              </TouchableOpacity>
      </Text>

    </View>
  );
}
