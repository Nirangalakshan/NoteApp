import { View, Text, Button,StyleSheet, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

import Animated, { FadeInDown, withSpring} from 'react-native-reanimated';

const WelcomeScreen = () => {

    const router = useRouter();
    const [isPressed, setIsPressed] = React.useState(false);
    return (
        <View style={{ flex: 1 }}>
            <StatusBar style='light' />
            <Image
                source={require('../assets/images/bg.png')}
                style={{
                    width: '99.9%',
                    height: '100%',
                    resizeMode: 'cover',
                    position: 'absolute',

                }}
            />
            <Animated.View  entering={FadeInDown.duration(1000).springify()}  >
                <Pressable
                   
                    onPress={() => router.push('/home')}
                    onPressIn={() => setIsPressed(true)}
                    onPressOut={() => setIsPressed(false)}

                    style={[styles.Pressable, { opacity: isPressed ? 0.5 : 1 }]}

                >
                    <Text>Get Started</Text>
                </Pressable>
            </Animated.View>


        </View>
    )
};

const styles = StyleSheet.create({
    Pressable: {
        backgroundColor: '#ffaf40',
        padding: 15,
        paddingHorizontal: 90,
        borderRadius: 50,
        marginTop: 600,
        alignSelf: 'center',
        borderCurve: 'continuous'
    }
})

export default WelcomeScreen