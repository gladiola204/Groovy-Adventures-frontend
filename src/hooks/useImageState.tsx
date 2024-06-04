import { useState } from 'react';

export type ImageState = {
  preview: string,
  data: File,
}

function useImageState() {
  const [selectedImages, setSelectedImages] = useState<ImageState[]>([]);

  const handleImageChange = (files: FileList | null) => {
    if(files === null) {
      return resetImages();
    }
  
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length <= 0) alert('Please select at least one image file.');

    const newImages = [...selectedImages];

    imageFiles.forEach(file => newImages.push({
      preview: URL.createObjectURL(file),
      data: file,
    }));

    setSelectedImages(newImages);
  };

  const resetImages = () => {
    setSelectedImages([]);
  };

  const unselectImage = (img: ImageState) => {
    const filteredImagesArray = selectedImages.filter((imgState) => imgState !== img);

    setSelectedImages(filteredImagesArray);
  }

  const resetAndAddImg = (files: FileList | null) => {
    if(files === null) {
      return resetImages();
    }
    
    resetImages();
    
    handleImageChange(files);
  }

  

  return { selectedImages, handleImageChange, resetImages, resetAndAddImg, unselectImage };
}

export default useImageState;