import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const FRAMES_DIR = "./public/frames";

const files = (await readdir(FRAMES_DIR))
  .filter(f => f.endsWith(".png"))
  .sort();

console.log(`Converting ${files.length} PNGs to WebP...`);

let done = 0;
await Promise.all(
  files.map(async (file) => {
    const input  = join(FRAMES_DIR, file);
    const output = join(FRAMES_DIR, file.replace(".png", ".webp"));
    await sharp(input).webp({ quality: 82 }).toFile(output);
    done++;
    if (done % 20 === 0) console.log(`  ${done}/${files.length}`);
  })
);

console.log("Done! All frames converted to WebP.");
