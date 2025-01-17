import CategoryScroll from "@/components/CategoryScroll";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/Form/InputField";
import { useFetch } from "@/lib/fetch";
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { MapPinned, Search, Settings2 } from "lib/icons";
import { useState, useEffect, } from "react";
import { FlatList, Text, TextInput, View, ActivityIndicator, Keyboard, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Location } from "@/types/location";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


const FavListings = () => {


	return(
		<SafeAreaView>
		</SafeAreaView>
		
	);
};


export default FavListings;

