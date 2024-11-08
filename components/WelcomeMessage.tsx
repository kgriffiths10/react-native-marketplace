import { View, Text } from 'react-native';
import { useEffect } from 'react';
import { useFetch } from '@/lib/fetch';

interface WelcomeMessageProps {
    clerkID: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ clerkID }) => {
    // Use `clerkID` in the API endpoint
    const { data, loading, error, refetch } = useFetch<any>(`/(api)/welcomeUser?clerkID=${clerkID}`);

    useEffect(() => {
        if (data) {
            console.log('Fetched user:', data);
        }
    }, [data]);  // Logs data when it changes

    if (loading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (data && data.first_name && data.last_name) {
        return (
            <Text className=' mb-2 text-neutral-100 font-PoppinsRegular text-lg'>Welcome back, {data.first_name}</Text>
        );
    }
};

export default WelcomeMessage;
