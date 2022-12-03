import * as path from 'https://deno.land/std@0.167.0/path/mod.ts';
export { path };

export const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));

export const readFile = (file: string) => {
  return Deno.readTextFile(path.join(mainModuleDir, file));
};
