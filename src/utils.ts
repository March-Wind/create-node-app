import { fileURLToPath } from 'url';
import path, { dirname } from 'node:path';
import fs from 'fs';

const moduleType = () => {
  // 判断当前模块是否是ESM模块
if (typeof __filename === 'undefined' && typeof __dirname === 'undefined' && typeof import.meta !== 'undefined') {
  return 'esm'
} else {
  return 'commonjs'
}
}
const getCurrentFilePath = () => {
  const _moduleType = moduleType();
  if(_moduleType === 'esm' ){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    return {
      filename:__filename,
      dirname:__dirname
    }
  }else{
    return {
      filename:__filename,
      dirname:__dirname
    }
  }
}
/**
 * 检查文件或者文件夹是否存在
 *
 * @param {string} path
 * @return {*}  {boolean}
 */
const checkExistence = (path: string): boolean => {
  try {
    fs.accessSync(path);
    return true;
  } catch (error) {
    return false;
  }
}


export {moduleType, getCurrentFilePath, checkExistence} ;