import { useState } from 'react';

export type ImageState = {
  preview: string,
  data: File,
}

function useImageUpload() {
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

  const resetAndUploadImages = (files: FileList | null) => {
    if(files === null) {
      return resetImages();
    }
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length <= 0) alert('Please select at least one image file.');
    const newImages: ImageState[] = [];
    imageFiles.forEach(file => newImages.push({
      preview: URL.createObjectURL(file),
      data: file,
    }));

    setSelectedImages(newImages);
  }

  

  return { selectedImages, handleImageChange, resetImages, resetAndUploadImages };
}

export default useImageUpload;