import { v2 as cloudinary } from 'cloudinary';

export default class ImageHandler {
    static async uploadImage(image: string, path: string) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
            public_id: path,
        })
        return uploadedImage.secure_url;
    }
    static async deleteFolder(path: string) {
        await cloudinary.api.delete_resources_by_prefix(path);
    }
}