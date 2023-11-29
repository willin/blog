// compress images
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(__filename);

function main() {
  const fileList = [];
  function walk(dir) {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        walk(filePath);
      } else if (filePath.endsWith('.png')) fileList.push(filePath);
    });
  }
  walk(path.join(__dirname, '../public/images'));

  // 压缩图片
  // eslint-disable-next-line no-restricted-syntax
  for (const file of fileList) {
    try {
      execSync(`pngquant ${file}`);
    } catch (e) {
      //
    }
    execSync(`rm -f ${file}`);
    execSync(`mv ${file.replace(/\.png$/, '-fs8.png')} ${file}`);
  }
}

main();
