import content from '@/content/content.json';

export const FOLDER_TYPES = ['folder', 'contact'];

export { content };

// fetch content (page, folder) by id
export function getContentById(id) {
  let result = null;

  // folders
  content.forEach(content_piece => {
    if (content_piece.id === id) {
      result = {
        id: id,
        title: content_piece.title,
        type: content_piece.type,
        files: content_piece.files,
      }
    }

    // files
    if (content_piece.files) {
      content_piece.files.forEach(file => {
        if (file.id === id) {
          result = {
            id: id,
            title: file.title ? file.title : id,
            type: 'file',
            folder: content_piece.id,
            path: 'content/' + content_piece.id + '/' + file.id
          }
        }
      });
    }
  });

  return result;
}

// every folder that has its own route — `source` is an external link only
export function getFolders() {
  return content.filter(folder => FOLDER_TYPES.includes(folder.type));
}

// every markdown file that has its own route — contact entries are external links
export function getFiles() {
  return getFolders().flatMap(folder =>
    (folder.files ?? [])
      .filter(file => !file.link)
      .map(file => ({ folder: folder.id, file: file.id }))
  );
}

export function getFolderParams() {
  return getFolders().map(folder => ({ folder: folder.id }));
}

export function getFileParams() {
  return getFiles();
}
