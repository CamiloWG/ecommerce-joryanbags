import fs from "node:fs";
import path from "path";

export const renameImage = (file, newName) => {
    const folderPath = path.resolve("public");
    const filePath = path.join(folderPath, newName);

    fs.renameSync(file.path, filePath);
    return filePath;
};
