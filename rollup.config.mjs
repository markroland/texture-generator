import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import fs from 'fs';
import path from 'path';

// Function to generate Rollup configuration for each file in the src directory
function generateConfig() {
  const srcDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), 'src');

  function getFiles(dir) {
    return fs.readdirSync(dir).flatMap(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        return getFiles(filePath);
      } else if (path.extname(file) === '.js') {
        return filePath;
      } else {
        return [];
      }
    });
  }

  const files = getFiles(srcDir);

  return files.flatMap(file => {
    const inputFilePath = file;
    const relativePath = path.relative(srcDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputDir = path.dirname(relativePath).includes('patterns') ? 'patterns' : '';

    return [
      {
        input: inputFilePath,
        output: {
          file: `dist/esm/${outputDir}/${baseName}.js`,
          format: 'esm',
          sourcemap: false
        },
        external: ['three', 'three/tsl'],
        plugins: [
          resolve(),
          commonjs(),
          terser()
        ]
      },
      {
        input: inputFilePath,
        output: {
          file: `dist/cjs/${outputDir}/${baseName}.js`,
          format: 'cjs',
          sourcemap: false
        },
        external: ['three', 'three/tsl'],
        plugins: [
          resolve(),
          commonjs(),
          terser()
        ]
      }
    ];
  });
}

export default generateConfig();