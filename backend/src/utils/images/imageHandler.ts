import { v2 as cloudinary } from 'cloudinary';

export default class ImageHandler {
    static async uploadImage(image: string, path: string) {
        const uploadedImage = await cloudinary.uploader.upload(image, {
            public_id: path,
        })
        return uploadedImage.secure_url;
    }
}