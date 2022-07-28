import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cloudRef from "cloudinary";
const { v2: cloudinary } = cloudRef;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, `../../.env`);
dotenv.config({ path: filePath });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export default cloudinary;
