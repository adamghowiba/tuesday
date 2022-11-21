export const filterEmptyKeys = (object: Record<string, any>) => {
  return Object.entries(object).reduce(
    (acc: Record<string, any>, [key, value]) => {
      if (value !== null || value !== undefined) acc[key] = value;
      return acc;
    },
    {}
  );
};

export const filterKeys = <T extends object>(
  object: T,
  keys: Array<keyof T>
) => {
  const tempObject = { ...object };

  keys.forEach((key) => {
    delete tempObject[key];
  });

  return tempObject;
};
