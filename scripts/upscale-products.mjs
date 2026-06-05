#!/usr/bin/env node
// Batch upscale every product image with Real-ESRGAN (ncnn-vulkan),
// re-encode the output as WebP and write a URL → local-path map.
//
// Designed to be resumable: skips any product whose local file is already
// present. Safe to interrupt and re-run.

import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  createWriteStream,
  unlinkSync,
} from "node:fs";
import { spawn } from "node:child_process";
import path from "node:path";
import https from "node:https";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const sharp = require("C:/Users/Admin/AppData/Local/Temp/node_modules/sharp");

const __filename = fileURLToPath(import.meta.url);
const ROOT = path.resolve(path.dirname(__filename), "..");
const TOOL = "C:\\Users\\Admin\\AppData\\Local\\Temp\\tools\\realesrgan\\realesrgan-ncnn-vulkan.exe";
const TOOL_DIR = "C:\\Users\\Admin\\AppData\\Local\\Temp\\tools\\realesrgan";
const TMP = "C:\\Users\\Admin\\AppData\\Local\\Temp\\upscale-cache";
const OUT_DIR_REL = "public/products/upscaled";
const OUT_DIR = path.join(ROOT, OUT_DIR_REL);
const MAP_FILE = path.join(ROOT, "lib/local-images.json");

mkdirSync(TMP, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const products = JSON.parse(
  readFileSync(path.join(ROOT, "lib/products.data.json"), "utf8")
);

let map = {};
if (existsSync(MAP_FILE)) {
  try {
    map = JSON.parse(readFileSync(MAP_FILE, "utf8"));
  } catch {
    map = {};
  }
}

function download(url, dest, redirects = 5) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": "ecosoftweb-upscale/1" } },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location &&
          redirects > 0
        ) {
          res.resume();
          download(res.headers.location, dest, redirects - 1).then(resolve, reject);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          res.resume();
          return;
        }
        const file = createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
        file.on("error", reject);
      }
    );
    req.on("error", reject);
  });
}

function runUpscale(inPath, outPath) {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      TOOL,
      ["-i", inPath, "-o", outPath, "-n", "realesrgan-x4plus", "-s", "2"],
      { cwd: TOOL_DIR, stdio: ["ignore", "ignore", "pipe"] }
    );
    let err = "";
    proc.stderr.on("data", (d) => (err += d.toString()));
    proc.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`realesrgan exit ${code}: ${err.slice(-200)}`))
    );
    proc.on("error", reject);
  });
}

const all = products.filter((p) => p.image);
const total = all.length;
let done = 0;
let processed = 0;
let skipped = 0;
let errors = 0;
const t0 = Date.now();

for (const p of all) {
  done++;

  const url = p.image;
  const slug = p.slug.replace(/[^a-z0-9-]/gi, "-");
  const localRel = `/products/upscaled/${slug}.webp`;
  const localAbs = path.join(OUT_DIR, `${slug}.webp`);

  if (existsSync(localAbs)) {
    map[url] = localRel;
    skipped++;
    continue;
  }

  const ext = url.split("?")[0].toLowerCase().endsWith(".webp")
    ? "webp"
    : url.split("?")[0].toLowerCase().endsWith(".png")
      ? "png"
      : "jpg";
  const dlPath = path.join(TMP, `${slug}.${ext}`);
  const upPath = path.join(TMP, `${slug}-up.png`);

  try {
    const tStart = Date.now();
    await download(url, dlPath);
    await runUpscale(dlPath, upPath);
    await sharp(upPath)
      .resize({ width: 1100, height: 1100, fit: "inside" })
      .webp({ quality: 90 })
      .toFile(localAbs);
    try { unlinkSync(dlPath); } catch {}
    try { unlinkSync(upPath); } catch {}

    map[url] = localRel;
    processed++;
    const secs = ((Date.now() - tStart) / 1000).toFixed(1);
    const cum = ((Date.now() - t0) / 1000 / 60).toFixed(1);
    console.log(
      `[${done}/${total}] ${slug} ${secs}s (cum ${cum}m, ok:${processed} skip:${skipped} err:${errors})`
    );
    writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
  } catch (e) {
    errors++;
    console.error(`[${done}/${total}] ${slug} FAILED: ${e.message}`);
  }
}

writeFileSync(MAP_FILE, JSON.stringify(map, null, 2) + "\n");
console.log(
  `Finished. processed=${processed} skipped=${skipped} errors=${errors} of ${total}`
);
