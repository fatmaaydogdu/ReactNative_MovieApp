import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { styles } from '../theme/index';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';

export default function HomeScreen() {

    const android = Platform.OS == 'android';

    const [trending, setTrending] = useState([]);
    const [upcoming, setUpComing] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();


    useEffect(() => {
        getTrendingMovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingMovies = async () => {
        const data = await fetchTrendingMovies();
        // console.log('got trending', data);
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    }

    const getUpcomingMovies = async () => {
        const data = await fetchUpcomingMovies();
       // console.log('got upcoming', data);
        if (data && data.results) setUpComing(data.results);
    }

    const getTopRatedMovies = async () => {
        const data = await fetchTopRatedMovies();
        // console.log('got topRated', data);
        if (data && data.results) setTopRated(data.results);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/*search bar and logo */}

            <SafeAreaView className={android ? "-mb-2" : 'mb-3'}>
                <StatusBar style='light' />
                <View className={"flex-row justify-between items-center mx-4"}>
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
                    <Text className={"text-white text-3xl font-bold"}> <Text style={styles.text}>M</Text>ovies</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                loading ? (<Loading />) : (

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
                        {/*trending movies carousel*/}

                       { trending.length>0 && <TrendingMovies data={trending} />}

                        {/* upcoming movies row */}
                        <MovieList title="Upcoming" data={upcoming} />

                        {/* top rated movies row */}
                        <MovieList title="Top Rated" data={topRated} />

                    </ScrollView>
                )
            }


        </View>
    )
}