import { Request, Response } from "express";

import { presignedUrlSchema } from "../schemas/listing";
import { UploadService } from "../services/uploadService";
import { BadRequestError } from "../utils/errors";

const uploadService = new UploadService();

export const getPresignedUrl = async (req: Request, res: Response) => {
    const result = presignedUrlSchema.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.issues[0].message);
    }

    const { fileName, fileType, listingId } = result.data;
    const uploadData = await uploadService.generatePresignedUrl(fileName, fileType, listingId);

    res.json(uploadData);
};
