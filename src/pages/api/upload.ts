import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

import {
  PutObjectCommand,
  S3Client,
  ListBucketsCommand,
} from "@aws-sdk/client-s3";

import { v4 as uuid } from "uuid";

import APPCONFIG from "../../constants/Config";

const { SPACES_ENDPOINT, SPACES_API_KEY, SPACES_API_SECRET } = APPCONFIG;

const { hostname } = new URL(SPACES_ENDPOINT as string);
const REGION = hostname.split(".")[0];

const s3Client = new S3Client({
  endpoint: SPACES_ENDPOINT,
  forcePathStyle: false,
  region: REGION,
  credentials: {
    accessKeyId: SPACES_API_KEY as string,
    secretAccessKey: SPACES_API_SECRET as string,
  },
});

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { fileName, data } = req.body;

    // Convert the base64-encoded file to a Buffer object
    const fileBuffer = Buffer.from(data, "base64");

    const { Buckets } = await s3Client.send(new ListBucketsCommand({}));

    if (!Buckets?.length) {
      throw new Error("No buckets created");
    }

    const [selected] = Buckets;

    const params = {
      Bucket: selected.Name,
      Key: fileName,
      Body: fileBuffer,
      ACL: "public-read",
      Metadata: {
        "x-amz-meta-my-key": `demo-upload-${uuid()}`,
      },
    };

    await s3Client.send(new PutObjectCommand(params));

    const imgUrl = `https://${selected.Name}.${hostname}/${encodeURIComponent(
      params.Key
    )}`;

    res.status(200).json({ imgUrl });
  } catch (err) {
    res.status(400).json({ message: err });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};
