import { useEffect, useMemo, useState } from "react";
import useAppSelector from "../../../../../hooks/useAppSelector";
import { ImageState } from "../../../../../hooks/useImageState";
import { selectTourState } from "../../../../../redux/features/tour/tourSlice";
import useFormFieldErrors from "../../../../../hooks/useFormFieldErrors";
import { Image } from "../../../../../redux/features/tour/tourSlice.interface";

interface Props {
    selectedImagesState: ImageState[],
    updateState: (files: FileList | null) => void;
    unselectImage: (img: ImageState) => void,
    removeImage: (publicId: string) => void,
}

const ImagesSection: React.FC<Props> = ({ selectedImagesState, updateState, unselectImage, removeImage }) => {
    const { tour } = useAppSelector(selectTourState);
    const [fetchedImages, setFetchedImages] = useState<Image[]>();
    const { generateFormErrorMessage } = useFormFieldErrors();

    function imageThumbnailsList<T extends ImageState | string> (
        img: T,
        filePath: string, 
        removeImg: (data: T) => void,
    ) {
        return (
            <li key={filePath}>
                <img src={filePath} style={{ width: "100px" }}/>
                <button type='button' onClick={_=> removeImg(img)}>Remove image</button>
            </li>
        )
    }

    useEffect(() => {
        if(!tour?.images) return;

        setFetchedImages(tour.images);
    }, [tour]);

    const removeFetchedImg = (publicId: string) => {
        const filteredState = fetchedImages?.filter(img => img.originalFilePublicId !== publicId);
        setFetchedImages(filteredState);
        removeImage(publicId);
    };

    const showImagesThumbnail = () => selectedImagesState.map(img => imageThumbnailsList(img, img.preview, unselectImage))

    const showFetchedImages = useMemo(
        () => fetchedImages?.map(img => imageThumbnailsList(img.originalFilePublicId, img.differentSizes.thumbnail.filePath, removeFetchedImg)),
    [fetchedImages]);

    return(
        <>
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => updateState(e.target.files)}
            />
            <ul>
                {showImagesThumbnail()}

                {showFetchedImages}
            </ul>
            {generateFormErrorMessage('images')}
        </>
    )
};

export default ImagesSection;