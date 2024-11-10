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
const express_1 = __importDefault(require('express'));
const sharp_1 = __importDefault(require('sharp'));
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const resize = express_1.default.Router();
//Directories
const imageDir = path_1.default.join(__dirname, '../../../images');
const cacheDir = path_1.default.join(__dirname, '../../../cachedImages');
if (!fs_1.default.existsSync(cacheDir)) {
  fs_1.default.mkdirSync(cacheDir);
}
resize.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width) || 2200;
    const height = parseInt(req.query.height) || 1000;
    //Image directory handling
    const imageName = req.query.image;
    if (typeof imageName !== 'string') {
      res.status(400).send('Image filename is required and must be a string');
    }
    if (!imageName) {
      res.status(400).send('Image filename is required');
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
      try {
        //resizing image
        const newImage = yield (0, sharp_1.default)(imagePath)
          .resize(width, height)
          .jpeg()
          .toBuffer();
        //saving new sized image to cache
        fs_1.default.writeFileSync(cachedImagePath, newImage);
        //sending image to browser
        res.set('Content-type', 'image/jpg');
        res.send(newImage);
      } catch (error) {
        console.error('Error while generating the image', error);
        res.status(500).send('Error while generating the image');
      }
    }
  }),
);
exports.default = resize;
