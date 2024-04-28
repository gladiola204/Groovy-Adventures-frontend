import { useEffect, useState } from "react";
import useCategorySelector from "../../../../hooks/useCategoriesSelector";
import useAppSelector from "../../../../hooks/useAppSelector";
import { RootState } from "../../../../redux/store";

const useSelectedCategory = () => {
    const { categories } = useCategorySelector();
    const { tour } = useAppSelector((state: RootState) => state.tour);
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