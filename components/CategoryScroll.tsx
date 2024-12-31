import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { CarFront, CircleEllipsis, Dumbbell, Heater, House, MonitorSmartphone, NotebookText, Route, Shirt, Sofa } from 'lib/icons'; 
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
  className?: string;
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({ onCategorySelect, className }) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const { data: categories, loading, error } = useFetch<Category[]>('/(api)/categories');

	useEffect(() => {
		if (categories && categories.length > 0) {
		  // Set the default category to the first category
		  const defaultCategory = categories[0].category_name;
		  setSelectedCategory(defaultCategory);
		  onCategorySelect(defaultCategory); // Notify the parent component
		}
	}, [categories]); 

	if (loading) {
		return null; 
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
			className="flex flex-row overflow-visible"
			horizontal={true}
			decelerationRate={0.8}
			showsHorizontalScrollIndicator={false}
		>
			<View className="flex flex-row gap-1 justify-between">
				{categories.map((category) => {
					const Icon = iconMapping[category.category_name] || null;
					return (
							<TouchableOpacity
								key={category.category_id}
								className='flex flex-col items-center justify-center'
								onPress={() => {
								setSelectedCategory(category.category_name);
								onCategorySelect(category.category_name); // Lift the state up to Marketplace
								}}
							>
									<View className='flex items-center justify-center h-10 w-20'>
										{Icon && <Icon size={24} strokeWidth={1.5} className={selectedCategory === category.category_name ? 'text-primary-500' : 'text-neutral-400'} />}
									</View>
								
									<Text className={`font-PoppinsMedium text-sm ${selectedCategory === category.category_name ? 'text-primary-500' : 'text-neutral-400'}`}>{category.category_name}</Text>
							</TouchableOpacity>
					);
				})}
			</View>
		</ScrollView>
	);
}

export default CategoryScroll;
