export const validateImage = (
  file: Express.Multer.File,
  allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSizeMB = 5,
): void => {
  if (!allowedTypes.includes(file.mimetype)) {
    throw new Error(`Недопустимый формат файла. Разрешены: ${allowedTypes.join(', ')}`);
  }

  const sizeInMB = file.size / (1024 * 1024);
  if (sizeInMB > maxSizeMB) {
    throw new Error(`Превышен максимальный размер файла (${maxSizeMB} MB)`);
  }
};
