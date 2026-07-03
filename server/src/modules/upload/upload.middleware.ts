import multer from 'multer';
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE,
} from './upload.constants';

const storage = multer.memoryStorage();

const fileFilter: multer.Options['fileFilter'] = (
  _req,
  file,
  cb,
) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
    return;
  }

  cb(new Error('Only PDF and DOCX files are allowed.'));
};

export const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter,
});