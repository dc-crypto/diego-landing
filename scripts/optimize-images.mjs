import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const WIDTHS = [640, 960, 1280, 1920];
const QUALITY = 78;

async function run(srcDir) {
  const outDir = path.join(srcDir, "optimized");
  await mkdir(outDir, { recursive: true });
  const files = (await readdir(srcDir)).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const file of files) {
    const srcPath = path.join(srcDir, file);
    const name = file.replace(/\.(jpe?g|png)$/i, "");
    const meta = await sharp(srcPath).metadata();

    for (const width of WIDTHS) {
      const outPath = path.join(outDir, `${name}-${width}.webp`);
      await sharp(srcPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
    }
    console.log(`done ${file} (${meta.width}x${meta.height})`);
  }
}

const dir = process.argv[2];
if (!dir) {
  console.error("Usage: node scripts/optimize-images.mjs <images-dir>");
  process.exit(1);
}
await run(path.resolve(dir));
