import fs from 'fs-extra';
const { pathExists, readJson, writeJson, writeFile, remove, existsSync, mkdirSync } = fs;
import klaw from 'klaw';
import merge from 'lodash.merge';

const getDataFromDataUrl = (dataUrl) => {
  const matches = dataUrl.match(/^data:(.*?);base64,(.*)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid Data URL');
  }

  const [, mimeType, base64Data] = matches;
  return { mimeType, base64Data };
}

const saveBase64DataToFile = (dataUrl, outputPath) => {
  const { base64Data } = getDataFromDataUrl(dataUrl);
  const binaryData = Buffer.from(base64Data, 'base64');

  writeFile(outputPath, binaryData, (err) => {
    if (err) {
      console.error('Error saving file:', err);
    }
  });
}

export const getDiskFile = async ({ path }) => {
  try {
    const exists = await pathExists(path);
    if (exists) {
      const content = await readJson(path);
      return { content };
    }
    else {
      return { content: {}};
    } 
  } catch (error) {
    if (error.code === 'EISDIR') {
      const content = [];
      for await (const file of klaw(path)) {
        if (file.path.includes('.json')){
          const name = file.path.split(path)[1].substring(1);
          content.push({
            name,
            path: path + file.path.split(path)[1]
          });
        }
      }
      return { content };
    }
  }
}

export const addDiskMediaFile = ({ path, content }) => {

  const directoryPath = path.slice(0, path.lastIndexOf('/')).split('/');
  directoryPath.reduce((str, path) => {
    str = `${str}${path}/`
    if (!existsSync(str)) mkdirSync(str);
    return str;
  }, '');
  
  saveBase64DataToFile(content, path);
}

export const updateDiskJsonFile = async ({ path, content }) => {

  const directoryPath = path.slice(0, path.lastIndexOf('/')).split('/');
  directoryPath.reduce((str, path) => {
    str = `${str}${path}/`
    if (!existsSync(str)) mkdirSync(str);
    return str;
  }, '');

  const { content: oldContent } = await getDiskFile({ path });
  const newContent = merge(oldContent, content);
  await writeJson(path, newContent, {spaces: 2});
}

export const updateDiskMarkdownFile = async ({ path, content }) => {

  const directoryPath = path.slice(0, path.lastIndexOf('/')).split('/');
  directoryPath.reduce((str, path) => {
    str = `${str}${path}/`
    if (!existsSync(str)) mkdirSync(str);
    return str;
  }, '');

  const { content: oldContent } = await getDiskFile({ path });
  const newContent = merge(oldContent, content);
  writeFile(path, newContent, (err) => {
    if (err) {
      console.error('Error saving file:', err);
    }
  });
}

export const deleteDiskFile = async ({ path }) => {

  await remove(path);
}