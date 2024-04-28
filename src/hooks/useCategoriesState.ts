import { useEffect } from "react";
import { selectCategoryState } from "../redux/features/category/categorySlice";
import categoryThunks from "../redux/features/category/categoryThunks";
import useAppDispatch from "./useAppDispatch";
import useAppSelector from "./useAppSelector";


const useCategoriesState = () => {
    const dispatch = useAppDispatch();
    const { categories, fetched } = useAppSelector(selectCategoryState);

    useEffect(() => {
        if(fetched) return;

        dispatch(categoryThunks.getAllCategories());

    }, [dispatch, categories, fetched])

    return { categories };
};

export default useCategoriesState;