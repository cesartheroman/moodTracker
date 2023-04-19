import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryPie } from 'victory-native';
import { groupBy } from 'lodash';

import { useAppContext } from '../App.provider';
import Theme from '../theme';

const Analytics: React.FC = () => {
  const appContext = useAppContext();

  const data = Object.entries(groupBy(appContext.moodList, 'mood.emoji')).map(
    ([key, value]) => ({
      x: key,
      y: value.length,
    }),
  );

  return (
    <View style={styles.container}>
      <VictoryPie
        labelRadius={80}
        radius={150}
        innerRadius={50}
        colorScale={[
          Theme.colorPurple,
          Theme.colorLavender,
          Theme.colorBlue,
          Theme.colorGrey,
          Theme.colorWhite,
        ]}
        style={{ labels: { fontSize: 30 } }}
        data={data}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Analytics;
