import React, { useCallback, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import MoodPicker from '../components/MoodPicker';
import { MoodOptionType, MoodOptionWithTimestamp } from '../types';

const Home: React.FC = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((mood: MoodOptionType) => {
    setMoodList(prevMoodList => [
      ...prevMoodList,
      { mood, timestamp: Date.now() },
    ]);
  }, []);

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
      {moodList.map(item => (
        <Text key={item.timestamp}>
          {item.mood.emoji} {new Date(item.timestamp).toString()}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Home;
