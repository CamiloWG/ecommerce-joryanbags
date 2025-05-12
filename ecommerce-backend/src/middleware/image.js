import fs from "node:fs";
import path from "path";
import sharp from 'sharp';

export const renameImage = async (file, newNameNoExt) => {
    const folderPath = path.resolve("public");
    const webpFileName = `${newNameNoExt}.webp`;
    const webpPath = path.join(folderPath, webpFileName);

    try {
        await sharp(file.path)
            .webp({ quality: 80 })
            .toFile(webpPath);

        return webpPath;
    } catch (error) {
        console.error('Error convirtiendo imagen a .webp:', error);
        throw error;
    }
};