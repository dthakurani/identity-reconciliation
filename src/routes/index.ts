import fs from 'fs';
import { resolve } from 'path';

const routesFolder = resolve('./src/routes');

function camelCaseToDash(myStr: string): string {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// HELPER FUNCTION TO GET ALL ROUTES PATH
const getAllRoutesPath = function (): { fullPath: string; fileName: string }[] {
  const allRoutesPath: { fullPath: string; fileName: string }[] = [];

  fs.readdirSync(routesFolder).forEach((file: string) => {
    const fullPath = `${routesFolder}/${file}`;
    if (fs.existsSync(fullPath) && fullPath.endsWith('.route.ts')) {
      allRoutesPath.push({
        fullPath: fullPath.replace('.ts', ''),
        fileName: file.replace('.route.ts', ''),
      });
    }
  });
  return allRoutesPath;
};

// MAIN FUNCTION TO REGISTER ALL ROUTES
const registerRoutes = async function (expressInstance: any): Promise<void> {
  const allRoutesPath = getAllRoutesPath();
  console.log(
    '✔️ ~ file: index.ts:29 ~ registerRoutes ~ allRoutesPath:',
    allRoutesPath,
  );
  // LOAD ALL NESTED ROUTES FILE
  for (const routeFile of allRoutesPath) {
    const routerModule = await import(routeFile.fullPath);
    const router = routerModule?.router;
    console.log(`/api/${camelCaseToDash(routeFile.fileName)}`, router);

    expressInstance.use(`/api/${camelCaseToDash(routeFile.fileName)}`, router);
  }
};

export { registerRoutes };
