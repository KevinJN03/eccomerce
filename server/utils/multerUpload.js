import multer from 'multer';
import fileFilter from '../Upload/fileFilter';
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 6 },
});

export default upload;
