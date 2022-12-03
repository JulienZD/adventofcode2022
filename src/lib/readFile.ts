import * as path from 'https://deno.land/std@0.167.0/path/mod.ts';
export { path };

export const mainModuleDir = path.dirname(path.fromFileUrl(Deno.mainModule));

export const readFile = async (file: string) => {
  const decoder = new TextDecoder('utf-8');

  return decoder.decode(await Deno.readFile(path.join(mainModuleDir, file)));
};
