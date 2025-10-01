// 210042112
import { Feather } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getRecipeById, Recipe } from '../services/database';

export default function CookingModeScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [timeLeft, setTimeLeft] = useState(300); 
  const [isPaused, setIsPaused] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [totalSteps, setTotalSteps] = useState(1);

  useEffect(() => {
    if (id) {
      loadRecipe(parseInt(id as string));
    }
  }, [id]);

  const loadRecipe = async (recipeId: number) => {
    try {
      const recipeData = await getRecipeById(recipeId);
      if (recipeData) {
        setRecipe(recipeData);
        
        let parsedInstructions: string[] = [];
        try {
          parsedInstructions = JSON.parse(recipeData.instructions);
        } catch {
          parsedInstructions = recipeData.instructions
            .split(/\n|,/)
            .filter(item => item.trim() !== '')
            .map((item) => item.trim().replace(/^\d+\.\s*/, ''));
        }
        
        setInstructions(parsedInstructions);
        setTotalSteps(parsedInstructions.length);
        
        setTimeLeft(recipeData.cook_time * 60);
      }
    } catch (error) {
      console.error('Error loading recipe:', error);
    }
  };

  useEffect(() => {
    let interval: any;
    
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime: number) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setIsRunning(false);
    router.back();
  };

  const handleClose = () => {
    router.back();
  };

  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const navigateToTab = (tabName: string) => {
    if (tabName === 'index') {
      router.push('/(tabs)');
    } else {
      router.push(`/(tabs)/${tabName}` as any);
    }
  };

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading recipe...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentInstruction = instructions[currentStep - 1] || 'No instructions available';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
          <Feather name="x" size={32} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Cooking Mode</Text>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text style={styles.stepIndicator}>Step {currentStep} of {totalSteps}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.stepBadge}>
          <Text style={styles.stepNumber}>{currentStep}</Text>
        </View>

        <Text style={styles.instructions}>
          {currentInstruction}
        </Text>

        <View style={styles.stepNavigation}>
          <TouchableOpacity 
            style={[styles.stepButton, currentStep === 1 && styles.stepButtonDisabled]} 
            onPress={handlePreviousStep}
            disabled={currentStep === 1}
          >
            <Feather 
              name="chevron-left" 
              size={20} 
              color={currentStep === 1 ? "#ccc" : "#20B2AA"} 
            />
            <Text style={[styles.stepButtonText, currentStep === 1 && styles.stepButtonTextDisabled]}>
              Previous
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.stepButton, currentStep === totalSteps && styles.stepButtonDisabled]} 
            onPress={handleNextStep}
            disabled={currentStep === totalSteps}
          >
            <Text style={[styles.stepButtonText, currentStep === totalSteps && styles.stepButtonTextDisabled]}>
              Next
            </Text>
            <Feather 
              name="chevron-right" 
              size={20} 
              color={currentStep === totalSteps ? "#ccc" : "#20B2AA"} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
        </View>

        <View style={styles.controlButtons}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.pauseButton]} 
            onPress={handlePause}
          >
            <Feather 
              name={isPaused ? "play" : "pause"} 
              size={24} 
              color="white" 
            />
            <Text style={styles.buttonText}>
              {isPaused ? "Resume" : "Pause"}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.stopButton]} 
            onPress={handleStop}
          >
            <Feather 
              name="square" 
              size={24} 
              color="white" 
            />
            <Text style={styles.buttonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('index')}>
          <Text style={{ fontSize: 24, color: "#8B5CF6" }}>🍳</Text>
          <Text style={styles.tabLabel}>Recipes</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('explore')}>
          <Text style={{ fontSize: 28, color: "#8B5CF6" }}>➕</Text>
          <Text style={styles.tabLabel}>Add</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('Favorite')}>
          <Text style={{ fontSize: 24, color: "#EC4899" }}>❤️</Text>
          <Text style={styles.tabLabel}>Favorites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.tabItem} onPress={() => navigateToTab('profile')}>
          <Text style={{ fontSize: 24, color: "#8B5CF6" }}>👤</Text>
          <Text style={styles.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#20B2AA', 
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  headerContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  recipeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  stepIndicator: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  stepBadge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  stepNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#20B2AA',
  },
  instructions: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  timerContainer: {
    marginBottom: 40,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#20B2AA',
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 8,
  },
  pauseButton: {
    backgroundColor: '#20B2AA',
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  stepNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  stepButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#E0F2F1',
  },
  stepButtonDisabled: {
    opacity: 0.5,
  },
  stepButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#20B2AA',
    marginLeft: 8,
  },
  stepButtonTextDisabled: {
    color: '#ccc',
  },
});
// -_- N4M154 -_-