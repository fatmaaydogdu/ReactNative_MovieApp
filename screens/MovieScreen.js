import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from '../theme';
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';


var { width, height } = Dimensions.get("window");

const android = Platform.OS == 'android';
const topMargin = android ? '' : 'mt-3'

export default function MovieScreen() {

    let movieName = "Five Nights at Freddy's"
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [cast, setCast] = useState([1,2,3,4,5]);
    const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
    const [loading, setLoading] = useState(false);


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

                {
                    loading? (<Loading />) : (
                        <View>
                    <Image source={require('../assets/images/moviePoster2.jpg')}
                        style={{ width, height: height * 0.50 }} />

                    <LinearGradient
                        colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                        style={{ width, height: height * 0.40 }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    />
                </View>
                    )
                }

            </View>

            {/* movie details */}

            <View style={{ marginTop: -(height * 0.09) }} className="space-y-3">
                {/*title */}
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {movieName}
                </Text>

                {/* status, relese, runtime*/}

                <Text className="text-neutral-400 font-semibold text-base text-center">
                    Released * 2023 * 110 min
                </Text>

                {/* genres */}

                <View className="flex-row justify-center mx-4 space-x-2 ">
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Horror  *
                    </Text>
                    <Text className="text-neutral-400 font-semibold text-base text-center">
                        Mystory
                    </Text>
                </View>

                {/* description */}

                <Text className="text-neutral-400 mx-4 tracking-wide">
                Recently fired and desperate for work, a troubled young man named Mike agrees to take a position as a night security guard at an abandoned theme restaurant: Freddy Fazbear's Pizzeria. But he soon discovers that nothing at Freddy's is what it seems.
                </Text>
            </View>
            {/* cast */}

            <Cast navigation={navigation}cast={cast} />

            {/* similar movies */}

            {/* <MovieList title="Similar Movies" hideSeeAll={true}data={similarMovies} /> */}
        </ScrollView>
    )
}