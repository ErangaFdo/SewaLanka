import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = userCredential.user.uid;

      
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        Alert.alert("Error", "User data not found");
        return;
      }

      const { role } = userDocSnap.data();

      
      if (role === "user") {
        router.replace("/(userdashboard)/home");
      } else if (role === "serviceProvider") {
        router.replace("/(serviceproviderdashboard)/home");
      } else {
        Alert.alert("Error", "Invalid user role");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      
      {/* Title */}
      <Text className="text-3xl font-bold text-center text-blue-600 mb-2">
        Welcome Back
      </Text>
      <Text className="text-center text-gray-500 mb-8">
        Login to your SewaLanka account
      </Text>

      {/* Email */}
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
      />

      {/* Password */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border border-gray-300 rounded-xl px-4 py-3 mb-2"
      />

      {/* Forgot Password */}
      <Text className="text-right text-blue-600 mb-6">
        Forgot Password?
      </Text>

      {/* Login Button */}
      <TouchableOpacity
        className={`py-4 rounded-xl ${
          loading ? "bg-gray-400" : "bg-blue-600"
        }`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white text-center font-semibold text-lg">
          {loading ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text className="text-center text-gray-500 mt-6">
        Don’t have an account?{" "}
        <Text
          className="text-blue-900 font-black text-base"
          onPress={() => router.push("/register")}
        >
          Create Account
        </Text>
      </Text>

    </View>
  );
}