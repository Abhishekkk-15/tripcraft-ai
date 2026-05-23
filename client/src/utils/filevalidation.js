export const validateTravelFile = (file) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  return allowedTypes.includes(file.type);
};