import React, { useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import {
    TapGestureHandler,
    LongPressGestureHandler,
    PanGestureHandler,
    FlingGestureHandler,
    PinchGestureHandler,
    State,
    Directions,
} from 'react-native-gesture-handler';
import { GestureEvent } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon';
import { useGameContext } from '../context/GameContext';

export default function ClickableObject() {
    const { addScore, completeTask } = useGameContext();

    // Refs для жестів
    const doubleTapRef = useRef<TapGestureHandler>(null);
    const panRef = useRef<PanGestureHandler>(null);
    const longPressRef = useRef<LongPressGestureHandler>(null);

    // Значення для анімацій
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // Анімований стиль
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    // Обробники жестів
    const onSingleTap = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            scale.value = withSpring(1.2, {}, () => {
                scale.value = withSpring(1);
            });
            addScore(1);
            completeTask('tap');
        }
    };

    const onDoubleTap = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            scale.value = withSpring(1.5, {}, () => {
                scale.value = withSpring(1);
            });
            addScore(2);
            completeTask('doubleTap');
        }
    };

    const onLongPress = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            scale.value = withSpring(1.3, {}, () => {
                scale.value = withSpring(1);
            });
            addScore(5);
            completeTask('longPress');
        }
    };

    const onPan = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            translateX.value = event.nativeEvent.translationX as number;
            translateY.value = event.nativeEvent.translationY as number;
            completeTask('pan');
        }

        if (event.nativeEvent.state === State.END) {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
        }
    };

    const onFlingRight = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.END) {
            const randomPoints = Math.floor(Math.random() * 10) + 1;
            addScore(randomPoints);
            translateX.value = withSpring(100, {}, () => {
                translateX.value = withSpring(0);
            });
            completeTask('flingRight');
        }
    };

    const onFlingLeft = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.END) {
            const randomPoints = Math.floor(Math.random() * 10) + 1;
            addScore(randomPoints);
            translateX.value = withSpring(-100, {}, () => {
                translateX.value = withSpring(0);
            });
            completeTask('flingLeft');
        }
    };

    const onPinch = (event: GestureEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            scale.value = event.nativeEvent.scale as number;
            completeTask('pinch');
        }

        if (event.nativeEvent.state === State.END) {
            scale.value = withSpring(1);
            addScore(3);
        }
    };

    return (
        <PinchGestureHandler onGestureEvent={onPinch} onHandlerStateChange={onPinch}>
            <Animated.View>
                <FlingGestureHandler
                    direction={Directions.RIGHT}
                    onHandlerStateChange={onFlingRight}
                >
                    <Animated.View>
                        <FlingGestureHandler
                            direction={Directions.LEFT}
                            onHandlerStateChange={onFlingLeft}
                        >
                            <Animated.View>
                                <PanGestureHandler
                                    ref={panRef}
                                    onGestureEvent={onPan}
                                    onHandlerStateChange={onPan}
                                >
                                    <Animated.View>
                                        <LongPressGestureHandler
                                            ref={longPressRef}
                                            minDurationMs={3000}
                                            onHandlerStateChange={onLongPress}
                                        >
                                            <Animated.View>
                                                <TapGestureHandler
                                                    waitFor={doubleTapRef}
                                                    onHandlerStateChange={onSingleTap}
                                                >
                                                    <Animated.View>
                                                        <TapGestureHandler
                                                            ref={doubleTapRef}
                                                            numberOfTaps={2}
                                                            onHandlerStateChange={onDoubleTap}
                                                        >
                                                            <Animated.View style={[styles.clickable, animatedStyle]}>
                                                                <Text style={styles.text}>TAP ME!</Text>
                                                            </Animated.View>
                                                        </TapGestureHandler>
                                                    </Animated.View>
                                                </TapGestureHandler>
                                            </Animated.View>
                                        </LongPressGestureHandler>
                                    </Animated.View>
                                </PanGestureHandler>
                            </Animated.View>
                        </FlingGestureHandler>
                    </Animated.View>
                </FlingGestureHandler>
            </Animated.View>
        </PinchGestureHandler>
    );
}

const styles = StyleSheet.create({
    clickable: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#ff6b6b',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
