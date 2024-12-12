import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoostCoins, selectBoostCoins } from '@/redux/slices/boostCoinsSlice';
import { useUser } from '@clerk/clerk-react';



const FavListings = () => {
    

    return (
        <SafeAreaView>
          <Text>Boost Coins: {/*boostCoins*/}</Text>
        </SafeAreaView>
    );
};

export default FavListings;