// utils/loadCopywriting.ts
export const useCopywritingFromFile = async<T1,> (locale: string, pageName: string): Promise<T1> => {
  const module = await import(`../copywriting/${locale}/${pageName}.tsx`);
  return module.default as T1;
};
