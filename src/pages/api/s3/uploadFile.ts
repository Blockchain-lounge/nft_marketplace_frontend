import { NextApiRequest, NextApiResponse } from "next";
import S3 from "aws-sdk/clients/s3";

// const s3 = new S3({
//   region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION,
//   accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
//   signatureVersion: "v4",
// });

const s3 = new S3({
  endpoint: process.env.NEXT_PUBLIC_ENV_DO_URL,
  secretAccessKey: process.env.NEXT_PUBLIC_DO_SECRET_ACCESS_KEY,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  region: process.env.NEXT_PUBLIC_AWS_DEFAULT_REGION,
  // signatureVersion: "v4",
});

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    let { name, type } = req.body;

    const fileParams = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
      Key: name,
      Expires: 600,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise("putObject", fileParams);

    res.status(200).json({ url });
  } catch (err) {
    // console.log(err);
    res.status(400).json({ message: err });
  }
};

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const file = req.body;

//   // Upload the file to S3
//   const uploadResult = await s3
//     .upload({
//       Bucket: "cloudaxnftmarketplace",
//       Key: file.name,
//       Body: file.data,
//       ACL: "public-read",
//     })
//     .promise();

//   // Return the URL of the uploaded file
//   res.status(200).json({ url: uploadResult.Location });
// }

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb", // Set desired value here
    },
  },
};
