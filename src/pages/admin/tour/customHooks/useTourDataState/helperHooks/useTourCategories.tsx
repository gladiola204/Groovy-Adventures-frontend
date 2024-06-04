import { useEffect, useState } from "react";
import { selectTourState } from "../../../../../../redux/features/tour/tourSlice";
import useAppSelector from "../../../../../../hooks/useAppSelector";
import { selectCategoryState } from "../../../../../../redux/features/category/categorySlice";

const useSelectedCategory = () => {
    const { categories } = useAppSelector(selectCategoryState);
    const { tour } = useAppSelector(selectTourState);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        if(categories.length > 0 && !tour?.category) {
            setSelectedCategory(categories[0].slug);
        }
    }, [categories]);

    useEffect(() => {
        if(!tour?.category) return;
        
        setSelectedCategory(tour?.category.slug);
    }, [tour?.category]);

    const handleChangeSelectedCategory = (category: string) => setSelectedCategory(category);
    
    return { selectedCategory, handleChangeSelectedCategory };
};

export default useSelectedCategory;