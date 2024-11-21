import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CarFront, CircleEllipsis, Dumbbell, Heater, House, Icon, MonitorSmartphone, NotebookText, Route, Shirt, Sofa } from 'lucide-react-native'; 
import { useFetch } from '@/lib/fetch';

const iconMapping: { [key: string]: React.ComponentType<any> } = {
  Vehicles: CarFront,
  Sports: Dumbbell,
  Appliances: Heater,
  Housing: House,
  Electronics: MonitorSmartphone,
  Textbooks: NotebookText,
  Rides: Route,
  Clothing: Shirt,
  Furniture: Sofa,
  Other: CircleEllipsis,
}

interface Category {
  category_id: number;
  category_name: string;
}

// Accept onCategorySelect as a prop
interface CategoryScrollProps {
  onCategorySelect: (category: string | null) => void;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ onCategorySelect }) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const { data: categories, loading, error } = useFetch<Category[]>('/(api)/categories');

	if (loading) {
		return;
	}
	if (error) {
		return <Text>Error fetching categories</Text>;
	}

	// Type guard to ensure categories is an array
	if (!Array.isArray(categories)) {
		return <Text>Error: Data is not in expected format</Text>;
	}

	return (
		<ScrollView
		className="flex flex-row overflow-visible gap-3 mb-4 "
		horizontal={true}
		decelerationRate={0.8}
		showsHorizontalScrollIndicator={false}
		>
			{categories.map((category) => {
				const Icon = iconMapping[category.category_name] || null;
				return (
				<TouchableOpacity
					key={category.category_id}
					onPress={() => {
					setSelectedCategory(category.category_name);
					onCategorySelect(category.category_name); // Lift the state up to Marketplace
					}}
					className='flex flex-col items-center justify-center gap-2'
				>
					<View className={`flex items-center justify-center h-14 w-14 rounded-full ${selectedCategory === category.category_name ? 'bg-primary-400' : 'bg-neutral-200'}`}>
					{Icon && <Icon size={24} strokeWidth={1.5} className={selectedCategory === category.category_name ? 'text-neutral-100' : 'text-neutral-500'} />}
					</View>
					<Text className={`font-PoppinsRegular text-xs ${selectedCategory === category.category_name ? 'text-primary-400' : 'text-neutral-500'}`}>{category.category_name}</Text>
				</TouchableOpacity>
				);
			})}
		</ScrollView>
	);
}

export default CategoryScroll;
