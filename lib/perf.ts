export const logP = (message: string) => {
  const start = performance.now();

  return () => {
    const end = performance.now();
    console.log(`[BookPH Performance] ${message} completed in ${end - start}ms`);
  };
};
