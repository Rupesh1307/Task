import {Image} from 'react-native-compressor';

export type ImageData = {
  cropRect: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  data: string;
  height: number;
  mime: string;
  modificationDate: string;
  path: string;
  size: number;
  width: number;
};

export const compressImage = async (image: ImageData) => {
  let value = null;
  if (image.path) {
    const result = await Image.compress(image.path, {
      compressionMethod: 'auto',
      maxWidth: 720,
      maxHeight: 720,
    });
    value = {
      uri: result,
      fileUrl: 'data:image/*;base64,' + image.data,
      fileName: image.path.split('/')[image.path.split('/').length - 1],
      fileType: image.mime,
    };
    return value;
  }
};