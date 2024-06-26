import '../../sass/main.scss';
import { Link } from 'react-router-dom';
import DialogOrModal from './shared/DialogOrModal';
import { ICategory } from '../../redux/features/category/categorySlice.interface';

interface CategoriesModalProps {
    isModalOpen: boolean,
    closeModal: (event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void,
    categories: ICategory[],
}
  
const CategoriesModal: React.FC<CategoriesModalProps> = ({ isModalOpen, closeModal, categories }) => {

    const renderCategoryLink = categories.map(category => <li key={category.slug}>
        <Link to={`/tours?page=1&limit=10&category=${category.slug}`} className='search-list__link'>
            <img src={category.icon.differentSizes.thumbnail.filePath} className='search-list__icon'/>
            <h2 className='search-list__title'>{category.title}</h2>
        </Link>
    </li>)
    
    return (
        <DialogOrModal isModalOpen={isModalOpen} closeModal={closeModal} classNameDialog='dialog--categories' classNameModal='' contentLabel='Categories List'>
            <ul className='search-list'>
                {renderCategoryLink}
            </ul>
        </DialogOrModal>
    );
};
  
export default CategoriesModal;