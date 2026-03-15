// Configuration for Google Drive resume files
// This system will dynamically fetch the latest file from the folder

export const RESUME_CONFIG = {
  // Google Drive folder ID containing resume files
  folderId: '1TlyomLtz1yckYb9fS0l_6ExhDPooPFxK',
  folderUrl: 'https://drive.google.com/drive/folders/1TlyomLtz1yckYb9fS0l_6ExhDPooPFxK?usp=sharing',
  
  // File types to consider as resume files
  supportedTypes: ['pdf', 'doc', 'docx'],
  
  // API key for Google Drive API (optional - for better performance)
  apiKey: '', // Add your API key if you want to use the Drive API
};
