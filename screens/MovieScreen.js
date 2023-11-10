import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'

var { width, height } = Dimensions.get("window");

const android = Platform.OS == 'android';
const topMargin = android ? '' : 'mt-3'

export default function MovieScreen() {

    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

    useEffect(() => {
        //call the movies details api
    }, [item])

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">

            {/*back button and movie poster */}

            <View className="w-full">
                <SafeAreaView className={"w-full flex-row justify-between items-center px-4" + topMargin}>
                    <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : "white"} />
                    </TouchableOpacity>
                </SafeAreaView>

                <View>
                    <Image source={require('../assets/images/moviePoster1.jpg')}
                        style={{ width, height: height * 0.55 }} />

                    <LinearGradient
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                        style={{ width, height: height * 0.30 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
                </View>

            </View>

        </ScrollView>
    )
}