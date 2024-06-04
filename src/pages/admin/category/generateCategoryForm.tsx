import { useEffect, useState } from "react";
import useImageUpload from "../../../hooks/useImageState";
import useAppSelector from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";
import { selectCategoryState } from "../../../redux/features/category/categorySlice";

interface Props {
    handleSubmit: (formData: CategoryFormData) => Promise<void>,
    goal: 'Update' | 'Create',
    handleRemoveCategory?: () => Promise<void>
}

export interface CategoryFormData {
    title?: string,
    icon?: File | null,
}

const GenerateCategoryForm: React.FC<Props> = ({ handleSubmit, goal, handleRemoveCategory }) => {
    const { category, isError, isSuccess } = useAppSelector(selectCategoryState);
    const [title, setTitle] = useState('');
    const { selectedImages, resetAndAddImg } = useImageUpload();
    const showImagesThumbnail = () => selectedImages.map(img => <img src={img.preview} style={{ width: "100px" }}/>);

    useEffect(() => {
        if(!category) return;
        setTitle(category.title);
    }, [category]);

    const fetchedIcon = category?.icon && !selectedImages[0] &&
        <img src={category.icon.differentSizes.thumbnail.filePath} style={{ width: "100px" }}/>

    const prepareDataAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSubmit({title, icon: selectedImages[0]?.data})
    }

    return(
        <form onSubmit={e => prepareDataAndSubmit(e)}>
            {isSuccess}
            <label>
                Title of the category
                <input type='text' value={title} onChange={e => setTitle(e.target.value)}/>
            </label>

            <label>
                Upload the icon
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => resetAndAddImg(e.target.files)}
                />

                {showImagesThumbnail()}
                {fetchedIcon}
            </label>

            <button type='submit'>{goal}</button>
            {goal === 'Update' && 
                <button type='button' onClick={handleRemoveCategory}>Remove the category</button>
            }
        </form>
    )
}

export default GenerateCategoryForm;