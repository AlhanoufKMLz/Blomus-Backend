import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import 'dotenv/config'
import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import ApiError from '../errors/ApiError'

const upload = multer()

const handleUpload = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method == 'PUT' && !req.file) {
    next()
    return
  }
  if (!req.file) {
    next(ApiError.badRequest('Image is required!'))
    return
  }
  const region = 'eu-north-1'
  const bucketName = 'sda-ecommerce'
  const fileName = Date.now() + '-' + req.file.originalname
  const file = req.file.buffer

  const s3 = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID as string,
      secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
    },
  })

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: 'image/jpeg',
  }

  try {
    const upload = await s3.send(new PutObjectCommand(params))
    const statusCode = upload.$metadata.httpStatusCode

    if (statusCode === 200) {
      const imageLocation = `${bucketName}.s3.${region}.amazonaws.com/${fileName}`
      req.fileLocation = imageLocation
      next()
      return
    }
  } catch (error) {
    next(ApiError.badRequest('Something went wrong'))
  }
}

export default [upload.single('image'), handleUpload]
