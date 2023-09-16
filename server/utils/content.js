import { 
  getRepoFile, 
  addRepoMediaFile, 
  updateRepoJsonFile, 
  updateRepoMarkdownFile,
  deleteRepoFile 
} from '~/server/libraries/content/github';
import { 
  getDiskFile, 
  addDiskMediaFile,
  updateDiskJsonFile, 
  updateDiskMarkdownFile,
  deleteDiskFile 
} from '~/server/libraries/content/disk';

const {
  public: {
    isDeployed
  }
} = useRuntimeConfig();

export const getFile = async ({ path }) => {

  if (isDeployed) return await getRepoFile({ path });
  else return await getDiskFile({ path });
}

export const addMedia = async ({ path, content, message }) => {

  if (isDeployed) return await addRepoMediaFile ({ path, content, message });
  else return await addDiskMediaFile({ path, content });
}

export const updateJson= async ({ path, content, message }) => {

  if (isDeployed) return await updateRepoJsonFile({ path, content, message });
  else return await updateDiskJsonFile({ path, content });
}

export const updateMarkdown = async ({ path, content, message }) => {

  if (isDeployed) return await updateRepoMarkdownFile({ path, content, message });
  else return await updateDiskMarkdownFile({ path, content });
}

export const deleteFile = async ({ path }) => {

  if (isDeployed) return await deleteRepoFile({ path });
  else return await deleteDiskFile({ path });
}