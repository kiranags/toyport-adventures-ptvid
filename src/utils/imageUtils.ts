export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Check if the file is too large (> 1MB)
      if (file.size > 1024 * 1024) {
        // Create a temporary image to resize
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        img.onload = () => {
          // Calculate new dimensions (max width 800px)
          const maxWidth = 800;
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (maxWidth * height) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Convert to WebP format for better compression
          resolve(canvas.toDataURL('image/webp', 0.8));
        };

        img.src = reader.result as string;
      } else {
        resolve(reader.result as string);
      }
    };
    reader.onerror = error => reject(error);
  });
};