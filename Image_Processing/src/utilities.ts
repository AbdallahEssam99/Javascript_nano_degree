import express, { Request, Response } from 'express';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

//Directories
const imageDir: string = path.join(__dirname, '../images');
const cacheDir: string = path.join(__dirname, '../cachedImages');

if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir);
}

const Resize = async (req: Request, res: Response) => {
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);

  //Image directory handling
  const imageName: string = req.query.image as string;
  // Validate width and height
  // Check if width and height are valid numbers
  if (isNaN(width) || isNaN(height)) {
    return res.status(400).send('Invalid width or height');
  }
  // Validate image name
  if (!imageName || typeof imageName !== 'string') {
    return res
      .status(400)
      .send('Image filename is required and must be a string');
  }

  const imagePath: string = path.join(imageDir, imageName);
  const cacheKey: string = `${width}_${height}_${imageName}`;
  const cachedImagePath: string = path.join(cacheDir, cacheKey);

  //if image found in the cache, will be served directly
  if (fs.existsSync(cachedImagePath)) {
    console.log('Image found in cache, and now being sent');
    const cachedImageBuffer: Buffer = await sharp(cachedImagePath).toBuffer();
    res.send(cachedImageBuffer);
  } else {
    console.log('Image not cached, will be generated and sent right away');
    imageProcessing(imagePath, imageName, width, height, res, cachedImagePath);
  }
};

const placeholder = async (req: Request, res: Response) => {
  const width: number = parseInt(req.query.width as string);
  const height: number = parseInt(req.query.height as string);
  const imageName: string = req.query.image as string;
  const imagePath: string = path.join(imageDir, imageName);

  if (isNaN(width) || isNaN(height)) {
    return res.status(400).send('Invalid width or height');
  }
  // Validate image name
  if (!imageName || typeof imageName !== 'string') {
    return res
      .status(400)
      .send('Image filename is required and must be a string');
  }
  imagePlaceholder(imagePath, imageName, width, height, res);
};

export const imagePlaceholder = async (
  imagePath: string,
  imageName: string,
  width: number,
  height: number,
  res: Response,
) => {
  try {
    const resizedImage = await sharp(imagePath)
      .resize(width, height) // Resize to widthxheight pixels
      .toBuffer(); // Get the resized image as a buffer
    res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
    res.send(resizedImage); // Send the resized image buffer
  } catch (err) {
    console.error(err);
    res.status(500).send('Error resizing image');
  }
};
export const imageProcessing = async (
  imagePath: string,
  imageName: string,
  width: number,
  height: number,
  res: Response,
  cachedImagePath: string,
) => {
  try {
    //resizing image
    const newImage: Buffer = await sharp(imagePath)
      .resize(width, height)
      .jpeg()
      .toBuffer();
    //caching image
    fs.writeFileSync(cachedImagePath, newImage);
    //sending image
    res.set('Content-type', 'image/jpg');
    res.send(newImage);
  } catch (error) {
    console.error('Error while generating the image', error);
    res.status(500).send('Error while generating the image');
  }
};
const imageProcessRoutes = (app: express.Application) => {
  app.get('/resize', Resize);
  app.get('/placeholder', placeholder);
};

export default imageProcessRoutes;
