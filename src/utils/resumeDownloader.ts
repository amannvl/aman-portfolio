import { RESUME_CONFIG } from './resumeConfig';

/**
 * Opens the Google Drive folder for users to download the latest resume
 * This is the most reliable approach since Google Drive doesn't provide a public API
 * for listing folder contents without authentication
 */
export const downloadResume = async (): Promise<void> => {
  try {
    console.log('Opening Google Drive folder for resume download...');
    
    // Open the Google Drive folder in a new tab
    const folderUrl = RESUME_CONFIG.folderUrl;
    window.open(folderUrl, '_blank');
    
    // Show a user-friendly message
    setTimeout(() => {
      alert('📁 Google Drive folder opened!\n\nPlease download the latest resume file from the folder.\n\nTip: Look for the most recently uploaded PDF or DOC file.');
    }, 500);
    
  } catch (error) {
    console.error('Error opening Google Drive folder:', error);
    
    // Fallback: try to open with a different URL format
    const fallbackUrl = `https://drive.google.com/drive/folders/${RESUME_CONFIG.folderId}`;
    window.open(fallbackUrl, '_blank');
    
    throw new Error('Unable to open Google Drive folder. Please try again.');
  }
};

/**
 * Alternative approach: Try to download from known file IDs
 * This can be used if you want to maintain specific file IDs as backup
 */
export const downloadKnownResume = async (): Promise<void> => {
  // Known file IDs from your folder - update these when you add new files
  const knownFiles = [
    { id: '1exlQXts7V8xQn9L6sYx06Wk-ySSdPSPd', name: 'resume_1.pdf' },
    { id: '1Flg3UZNZ3CUaEeBo1F9jPEGgSkThyKwV', name: 'resume_2.pdf' }
  ];

  try {
    // Try the first known file
    const file = knownFiles[0];
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${file.id}`;
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = file.name;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Downloaded: ${file.name}`);
    
  } catch (error) {
    console.error('Direct download failed, opening folder instead:', error);
    // Fallback to opening folder
    downloadResume();
  }
};

/**
 * Gets the Google Drive folder URL
 */
export const getResumeFolderUrl = (): string => {
  return RESUME_CONFIG.folderUrl;
};
