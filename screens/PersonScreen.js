import { View, Text, Dimensions, Platform, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import MovieList from '../components/movieList';

var { width, height } = Dimensions.get("window");
const android = Platform.OS == 'android';
const verticalMargin = android ? '' : 'my-3';

export default function PersonScreen() {

  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1,2,3]);

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {/* back button */}

      <SafeAreaView className={"w-full flex-row justify-between items-center px-4" + verticalMargin}>
        <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
          <HeartIcon size="35" color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}

      <View>
        <View className="flex-row justify-center"
          style={{ shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 }}>
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500">
            <Image source={require('../assets/images/castImage1.jpg')}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>

        </View>

        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            Josh Hutcherson
          </Text>
          <Text className="text-3xl text-neutral-500 text-center">
            Union, Kentucky, ABD
          </Text>
        </View>

        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm ">Male</Text>
          </View>

          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm ">1992-10-12</Text>
          </View>

          <View className="border-r-2 border-r-neutral-400 px-2 items-center ">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm ">Acting</Text>
          </View>

          <View className=" px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm ">70</Text>
          </View>
        </View>

        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Joshua Ryan "Josh" Hutcherson (born October 12, 1992) is an American film and television actor. He began working in the early 2000s, appearing in several minor film and television roles. He gained wider exposure with major roles in the 2005 films Little Manhattan and Zathura, the 2006 comedy RV, the 2007 family adventure film Firehouse Dog, and the film adaptations of Bridge to Terabithia, Journey to the Center of the Earth and Cirque du Freak: The Vampire's Assistant. On March 30, 2008, Hutcherson won a Young Artist Award (for Leading Young Actor). Hutcherson was also featured on a Celebrity Teens edition of the hit show MTV Cribs, and is set to play Robert in the Red Dawn remake.
          </Text>
        </View>

        {/* movies */}

        <MovieList title="Movies" hiddenSeeAll={true} data={personMovies} />
      </View>



    </ScrollView>
  )
}