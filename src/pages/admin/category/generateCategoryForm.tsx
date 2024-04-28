import { useEffect, useState } from "react";
import useImageUpload from "../../../hooks/useImageUpload";
import useAppSelector from "../../../hooks/useAppSelector";
import { RootState } from "../../../redux/store";

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
    const { category, isLoading, isError, errorMessage, isSuccess } = useAppSelector((state: RootState) => state.category);
    const [title, setTitle] = useState('');
    const { selectedImages, resetAndUploadImages } = useImageUpload();
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
                    onChange={(e) => resetAndUploadImages(e.target.files)}
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