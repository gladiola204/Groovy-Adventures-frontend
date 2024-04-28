const validFileExtensions = ['jpg', 'png', 'jpeg', 'svg'];

function isValidFileType(fileName: string | undefined) {
    if (!fileName) return false;
    const extension = fileName.split('.').pop()?.toLowerCase();
    if(!extension) return false;
    return validFileExtensions.includes(extension);
}

export default isValidFileType;