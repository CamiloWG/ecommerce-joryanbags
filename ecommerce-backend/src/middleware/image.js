import fs from "node:fs";
import path from "path";
import sharp from 'sharp';
import { ProductServices } from "../services/productServices.js";

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

export const transformImage = async () => {
    const folderPath = path.resolve("public");
    const files = fs.readdirSync(folderPath);

    const pngFiles = files.filter(file => file.endsWith(".png") && file.startsWith("product_"));

    for (const file of pngFiles) {
        const fullPath = path.join(folderPath, file);
        const productIdMatch = file.match(/product_(\d+)\.png/);

        if (!productIdMatch) continue;

        const productId = parseInt(productIdMatch[1]);
        const newFileName = `product_${productId}.webp`;
        const newFilePath = path.join(folderPath, newFileName);

        await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(newFilePath);

        await ProductServices.updateImage(productId);
    }
}