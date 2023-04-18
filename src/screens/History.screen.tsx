import React from 'react';
import { ScrollView } from 'react-native';

import { useAppContext } from '../App.provider';
import MoodItemRow from '../components/MoodItemRow';

const History: React.FC = () => {
  const appContext = useAppContext();

  return (
    <ScrollView>
      {appContext.moodList
        .slice()
        .reverse()
        .map(mood => (
          <MoodItemRow item={mood} key={mood.timestamp} />
        ))}
    </ScrollView>
  );
};

export default History;
