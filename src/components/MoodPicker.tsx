import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { MoodOptionType } from '../types';
import Theme from '../theme';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  handleSelectMood: (mood: MoodOptionType) => void;
};

const MoodPicker: React.FC<MoodPickerProps> = ({ handleSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();

  const handleSelect = useCallback(() => {
    if (selectedMood) {
      handleSelectMood(selectedMood);
      setSelectedMood(undefined);
    }
  }, [handleSelectMood, selectedMood]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How are you right now?</Text>
      <View style={styles.moodList}>
        {moodOptions.map((option, idx) => (
          <View key={idx}>
            <Pressable
              onPress={() => setSelectedMood(option)}
              style={[
                styles.moodItem,
                selectedMood?.emoji === option.emoji && styles.selectedMoodItem,
              ]}>
              <Text key={option.emoji} style={styles.moodText}>
                {option.emoji}
              </Text>
            </Pressable>

            <Text style={styles.descriptionText}>
              {option.emoji === selectedMood?.emoji && option.description}
            </Text>
          </View>
        ))}
      </View>
      <Pressable style={styles.button} onPress={handleSelect}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    margin: 10,
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 20,
  },
  moodList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodText: {
    fontSize: 24,
  },
  moodItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
  selectedMoodItem: {
    borderWidth: 2,
    backgroundColor: Theme.colorPurple,
    borderColor: '#fff',
  },
  descriptionText: {
    color: Theme.colorPurple,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 10,
  },
  button: {
    backgroundColor: Theme.colorPurple,
    width: 150,
    borderRadius: 20,
    marginTop: 20,
    alignSelf: 'center',
    padding: 10,
  },
  buttonText: {
    color: Theme.colorWhite,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default MoodPicker;
