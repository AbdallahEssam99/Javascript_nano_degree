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
const node_cache_1 = __importDefault(require('node-cache'));
const placeholder = express_1.default.Router();
const myCache = new node_cache_1.default({ stdTTL: 3600 });
placeholder.get('/', (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const width = parseInt(req.query.width) || 1500;
    const height = parseInt(req.query.height) || 1000;
    const cacheKey = `image:${width}x${height}`;
    const cachedImage = myCache.get(cacheKey);
    if (cachedImage) {
      console.log('Image found in cache and is now being sent to the browser');
      res.set('Content-type', 'image/png');
      res.send(cachedImage);
    } else {
      console.log(
        'Image is not found in cache, and will now be created then cached then sent to the browser',
      );
      try {
        const newImage = yield (0, sharp_1.default)({
          create: {
            width: width,
            height: height,
            channels: 3,
            background: { r: 255, g: 255, b: 220 },
          },
        })
          .png()
          .toBuffer();
        res.set('Content-type', 'image/png');
        res.send(newImage);
        const newcacheKey = `image:${width}x${height}`;
        myCache.set(newcacheKey, newImage);
      } catch (error) {
        console.error('Error while generating the image', error);
        res.status(500).send('Error while generating the image');
      }
    }
  }),
);
exports.default = placeholder;
