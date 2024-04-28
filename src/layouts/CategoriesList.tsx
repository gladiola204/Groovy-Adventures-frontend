import useAppSelector from '../hooks/useAppSelector';
import { selectCategoryState } from '../redux/features/category/categorySlice';
import { useEffect, useMemo } from 'react';
import useAppDispatch from '../hooks/useAppDispatch';
import categoryThunks from '../redux/features/category/categoryThunks';
import '../sass/main.scss';

const CategoriesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, fetched } = useAppSelector(selectCategoryState);

    useEffect(() => {
        if(fetched) return;

        dispatch(categoryThunks.getAllCategories());

    }, [dispatch, categories, fetched])

    const category = useMemo(() => categories?.map((category, index) => (
        <li className='categories-bar__category' key={index}>
            <img src={category.icon.differentSizes.thumbnail.filePath} className='categories-bar__icon'/>
            <h5 className='categories-bar__header'>{category.title}</h5>
        </li>
    )), [categories]);

    return(
        <nav className="categories-bar">
            <ul className='categories-bar__list'>
                {category}
            </ul>
        </nav>
    )
};

export default CategoriesList;