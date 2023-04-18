import React, { useMemo, PropsWithChildren } from 'react';
import { Text, TextProps } from 'react-native';
import Theme from '../theme';

type AppTextType = TextProps & {
  fontFamily: 'bold' | 'regular' | 'italic';
  size: 8 | 10 | 12;
};

const AppText: React.FC<AppTextType & PropsWithChildren> = ({
  children,
  fontFamily,
  style,
  ...props
}) => {
  const fontStyle = useMemo(() => {
    if (fontFamily === 'bold') {
      return { fontFamily: Theme.fontFamilyBold };
    }
  }, [fontFamily]);

  return (
    <Text {...props} style={[style, fontStyle]}>
      {children}
    </Text>
  );
};

export default AppText;
