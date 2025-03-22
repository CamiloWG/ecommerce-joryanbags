import { validationResult } from "express-validator";
import fs from "node:fs";

export const handleErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file) {
            fs.unlink(req.file.path);
        }

        res.status(400).json({ errors: errors.array() });
        return;
    }

    next();
};
