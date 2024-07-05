import app from './app';
import { v2 as cloudinary } from 'cloudinary';

// Setting up cloudinary image upload
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})

app.listen(process.env.PORT, () => console.log(`Application running on port ${process.env.PORT}`))