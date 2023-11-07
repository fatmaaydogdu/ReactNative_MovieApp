import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import {styles} from '../theme/index';
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';

export default function HomeScreen () {

    const  android = Platform.OS == 'android';

    const [trending, setTrending] = useState([1,2,3]);
    const [upcoming, setUpComing] = useState([1,2,3]);
    const [topRated, setTopRated] = useState([1,2,3]);

    return(
        <View className="flex-1 bg-neutral-800">
            {/*search bar and logo */}
            
            <SafeAreaView className={android? "-mb-2" : 'mb-3'}>
                <StatusBar style='light'/>
                <View className={"flex-row justify-between items-center mx-4"}>
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white"/>
                    <Text className={"text-white text-3xl font-bold"}> <Text style={styles.text}>M</Text>ovies</Text>

                    <TouchableOpacity>
                        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10}}>
                {/*trending movies carousel*/}
                <TrendingMovies data={trending} />

                {/* upcoming movies row */}
                <MovieList title="Upcoming" data={upcoming} />

                {/* top rated movies row */}
                <MovieList title="Top Rated" data={topRated} />

            </ScrollView>
        </View>
    )
}