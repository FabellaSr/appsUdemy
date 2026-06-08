/**
 * Image storage adapter.
 * Supports Cloudinary or AWS S3, selected via STORAGE_PROVIDER env var.
 * Photos are immutable: there is no delete() function exposed.
 */
import { v2 as cloudinary } from "cloudinary";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuid } from "uuid";

const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export interface UploadInput { buffer: Buffer; mimeType: string; }
export interface UploadResult { url: string; provider: "cloudinary" | "s3"; key: string; }

function validate({ mimeType }: UploadInput) {
  if (!ALLOWED.includes(mimeType)) throw new Error(`Unsupported image type: ${mimeType}`);
}

async function uploadCloudinary(i: UploadInput): Promise<UploadResult> {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ folder: "providers", resource_type: "image" }, (err, res) => {
      if (err || !res) return reject(err);
      resolve({ url: res.secure_url, provider: "cloudinary", key: res.public_id });
    }).end(i.buffer);
  });
}

async function uploadS3(i: UploadInput): Promise<UploadResult> {
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID!, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY! },
  });
  const key = `providers/${uuid()}.${i.mimeType.split("/")[1]}`;
  await client.send(new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET!, Key: key, Body: i.buffer, ContentType: i.mimeType, ACL: "public-read",
  }));
  return { url: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`, provider: "s3", key };
}

export async function uploadImage(i: UploadInput): Promise<UploadResult> {
  validate(i);
  const provider = (process.env.STORAGE_PROVIDER || "cloudinary").toLowerCase();
  if (provider === "s3") return uploadS3(i);
  return uploadCloudinary(i);
}

// Intentional: no delete(). Photos cannot be deleted by design.
