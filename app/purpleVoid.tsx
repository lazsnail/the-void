import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withEasing
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const SpinningSphere: React.FC = () => {
  // Rotation and scaling values
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Continuous spinning animation
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 3000,
        easing: withEasing.linear
      }),
      -1  // Infinite repeats
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { rotateX: `${rotation.value}deg` },
        { rotateY: `${rotation.value}deg` },
        { rotateZ: `${rotation.value}deg` },
        { scale: 1 + Math.sin(rotation.value * Math.PI / 180) * 0.1 } // Subtle pulsing effect
      ]
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.sphere, animatedStyle]}>
        {/* Create a 3D effect with multiple colored faces */}
        <View style={[styles.face, styles.front]} />
        <View style={[styles.face, styles.back]} />
        <View style={[styles.face, styles.right]} />
        <View style={[styles.face, styles.left]} />
        <View style={[styles.face, styles.top]} />
        <View style={[styles.face, styles.bottom]} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  sphere: {
    width: 200,
    height: 200,
    position: 'relative',
  },
  face: {
    position: 'absolute',
    width: 200,
    height: 200,
    opacity: 0.8,
  },
  front: {
    backgroundColor: 'rgba(255,107,107,0.7)',
    transform: [{ translateZ: 100 }],
  },
  back: {
    backgroundColor: 'rgba(78,205,196,0.7)',
    transform: [{ rotateY: '180deg' }, { translateZ: 100 }],
  },
  right: {
    backgroundColor: 'rgba(69,183,209,0.7)',
    width: 200,
    transform: [{ rotateY: '90deg' }, { translateZ: 100 }],
  },
  left: {
    backgroundColor: 'rgba(255,193,7,0.7)',
    width: 200,
    transform: [{ rotateY: '-90deg' }, { translateZ: 100 }],
  },
  top: {
    backgroundColor: 'rgba(103,58,183,0.7)',
    height: 200,
    transform: [{ rotateX: '90deg' }, { translateZ: 100 }],
  },
  bottom: {
    backgroundColor: 'rgba(33,150,243,0.7)',
    height: 200,
    transform: [{ rotateX: '-90deg' }, { translateZ: 100 }],
  },
});

export default SpinningSphere;
