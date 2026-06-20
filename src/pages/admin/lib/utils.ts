export const lines = (v: string): string[] => v.split('\n').map((s) => s.trim()).filter(Boolean);
export const unlines = (v: string[]): string => v.join('\n');
