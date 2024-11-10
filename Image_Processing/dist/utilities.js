'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.imageProcessing = exports.imagePlaceholder = void 0;
const sharp_1 = __importDefault(require('sharp'));
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
//Directories
const imageDir = path_1.default.join(__dirname, '../images');
const cacheDir = path_1.default.join(__dirname, '../cachedImages');
if (!fs_1.default.existsSync(cacheDir)) {
  fs_1.default.mkdirSync(cacheDir);
}
const Resize = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    //Image directory handling
    const imageName = req.query.image;
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
    const imagePath = path_1.default.join(imageDir, imageName);
    const cacheKey = `${width}_${height}_${imageName}`;
    const cachedImagePath = path_1.default.join(cacheDir, cacheKey);
    //if image found in the cache, will be served directly
    if (fs_1.default.existsSync(cachedImagePath)) {
      console.log('Image found in cache, and now being sent');
      const cachedImageBuffer = yield (0, sharp_1.default)(
        cachedImagePath,
      ).toBuffer();
      res.send(cachedImageBuffer);
    } else {
      console.log('Image not cached, will be generated and sent right away');
      (0, exports.imageProcessing)(
        imagePath,
        imageName,
        width,
        height,
        res,
        cachedImagePath,
      );
    }
  });
const placeholder = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width);
    const height = parseInt(req.query.height);
    const imageName = req.query.image;
    const imagePath = path_1.default.join(imageDir, imageName);
    if (isNaN(width) || isNaN(height)) {
      return res.status(400).send('Invalid width or height');
    }
    // Validate image name
    if (!imageName || typeof imageName !== 'string') {
      return res
        .status(400)
        .send('Image filename is required and must be a string');
    }
    (0, exports.imagePlaceholder)(imagePath, imageName, width, height, res);
  });
const imagePlaceholder = (imagePath, imageName, width, height, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const resizedImage = yield (0, sharp_1.default)(imagePath)
        .resize(width, height) // Resize to widthxheight pixels
        .toBuffer(); // Get the resized image as a buffer
      res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
      res.send(resizedImage); // Send the resized image buffer
    } catch (err) {
      console.error(err);
      res.status(500).send('Error resizing image');
    }
  });
exports.imagePlaceholder = imagePlaceholder;
const imageProcessing = (
  imagePath,
  imageName,
  width,
  height,
  res,
  cachedImagePath,
) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      //resizing image
      const newImage = yield (0, sharp_1.default)(imagePath)
        .resize(width, height)
        .jpeg()
        .toBuffer();
      //caching image
      fs_1.default.writeFileSync(cachedImagePath, newImage);
      //sending image
      res.set('Content-type', 'image/jpg');
      res.send(newImage);
    } catch (error) {
      console.error('Error while generating the image', error);
      res.status(500).send('Error while generating the image');
    }
  });
exports.imageProcessing = imageProcessing;
const imageProcessRoutes = (app) => {
  app.get('/resize', Resize);
  app.get('/placeholder', placeholder);
};
exports.default = imageProcessRoutes;
