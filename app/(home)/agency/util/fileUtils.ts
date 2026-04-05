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
