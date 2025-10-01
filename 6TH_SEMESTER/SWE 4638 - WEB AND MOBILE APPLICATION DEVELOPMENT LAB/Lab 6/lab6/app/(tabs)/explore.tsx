// 210042112
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { insertRecipe } from "../../services/database";

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];
const difficulties = ["Easy", "Medium", "Hard"];

export default function AddRecipeScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | null>(categories[0]);
  const [difficulty, setDifficulty] = useState<string | null>(difficulties[0]);
  const [prepTime, setPrepTime] = useState("");
  const [cookTime, setCookTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!title.trim())
      return Alert.alert("Error", "Please enter a recipe title");
    if (!category) return Alert.alert("Error", "Please select a category");
    if (!difficulty)
      return Alert.alert("Error", "Please select difficulty level");
    if (!prepTime || !cookTime || !servings)
      return Alert.alert(
        "Error",
        "Please enter prep time, cook time, and servings"
      );
    if (!ingredients.trim())
      return Alert.alert("Error", "Please enter ingredients");
    if (!instructions.trim())
      return Alert.alert("Error", "Please enter cooking instructions");
    return true;
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(categories[0]);
    setDifficulty(difficulties[0]);
    setPrepTime("");
    setCookTime("");
    setServings("");
    setIngredients("");
    setInstructions("");
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const recipeData = {
        title: title.trim(),
        description: description.trim(),
        category: category!,
        difficulty: difficulty!,
        prep_time: parseInt(prepTime) || 0,
        cook_time: parseInt(cookTime) || 0,
        servings: parseInt(servings) || 0,
        ingredients: ingredients.trim(),
        instructions: instructions.trim(),
        image_url: "",
        is_favorite: 0,
      };

      await insertRecipe(recipeData);

      Alert.alert("Success", "Recipe added successfully!", [
        {
          text: "OK",
          onPress: () => {
            resetForm();
            router.push("/(tabs)");
          },
        },
      ]);
    } catch (error) {
      console.error("Error adding recipe:", error);
      Alert.alert("Error", "Failed to add recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={20}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Add Recipe</Text>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 80 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>RECIPE TITLE</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter recipe name"
              placeholderTextColor="#9CA3AF"
              value={title}
              onChangeText={setTitle}
            />
            <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
              DESCRIPTION
            </Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Brief description..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>CATEGORY</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={category}
                  onValueChange={(val) => setCategory(String(val))}
                  style={styles.picker}
                  dropdownIconColor="#374151"
                >
                  {categories.map((c) => (
                    <Picker.Item key={c} label={c} value={c} />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>DIFFICULTY</Text>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={difficulty}
                  onValueChange={(val) => setDifficulty(String(val))}
                  style={styles.picker}
                  dropdownIconColor="#374151"
                >
                  {difficulties.map((d) => (
                    <Picker.Item key={d} label={d} value={d} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.fieldHalf}>
              <Text style={styles.label}>PREP TIME</Text>
              <TextInput
                style={styles.input}
                placeholder="Minutes"
                keyboardType="numeric"
                value={prepTime}
                onChangeText={setPrepTime}
              />
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>COOK TIME</Text>
              <TextInput
                style={styles.input}
                placeholder="Minutes"
                keyboardType="numeric"
                value={cookTime}
                onChangeText={setCookTime}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>SERVINGS</Text>
            <TextInput
              style={styles.input}
              placeholder="Number of servings"
              keyboardType="numeric"
              value={servings}
              onChangeText={setServings}
            />
          </View>

          {/* Ingredients and cooking instructions added to match the recipe tabs recipe cards; add in the database*/}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>INGREDIENTS</Text>
            <Text style={styles.hint}>
              Enter ingredients, one per line or separated by commas
            </Text>
            <TextInput
              style={[styles.input, styles.largeTextArea]}
              placeholder={"e.g., Oil\n3 eggs\n..."}
              placeholderTextColor="#9CA3AF"
              value={ingredients}
              onChangeText={setIngredients}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>COOKING INSTRUCTIONS</Text>
            <Text style={styles.hint}>
              Enter step-by-step cooking instructions
            </Text>
            <TextInput
              style={[styles.input, styles.largeTextArea]}
              placeholder={"1. Do this\n2. Then that..."}
              placeholderTextColor="#9CA3AF"
              value={instructions}
              onChangeText={setInstructions}
              multiline
            />
          </View>

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitting && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={isSubmitting}
            activeOpacity={0.85}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f3f4f6" },
  header: {
    backgroundColor: "#3acdc1",
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e6f0ee",
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
  },
  textArea: {
    minHeight: 70,
    textAlignVertical: "top",
  },
  largeTextArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  fieldHalf: {
    width: "48%",
  },
  pickerWrapper: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  picker: {
    height: 48,
    width: "100%",
  },
  hint: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 8,
    fontStyle: "italic",
  },
  submitButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 40,
  },
  submitButtonDisabled: {
    backgroundColor: "#FCA5A5",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
});
// -_- N4M154 -_-
