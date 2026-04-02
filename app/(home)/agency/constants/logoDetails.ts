export const MAX_LOGO_SIZE = 2 * 1024 * 1024;
export const MAX_COVER_SIZE = 5 * 1024 * 1024

export const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      typeof reader.result === "string"
        ? resolve(reader.result)
        : reject(new Error("Read failed."));
    reader.onerror = () => reject(new Error("Read failed."));
    reader.readAsDataURL(file);
  });
