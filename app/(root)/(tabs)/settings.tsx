// Settings Component
import { useFetch } from '@/lib/fetch';
import { useUser } from '@clerk/clerk-expo';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const Settings = () => {
	const { user } = useUser();
    const clerkID = user?.id;
	
};

export default Settings;
