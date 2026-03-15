# Resume Download System

This system allows users to access your latest resume files from your Google Drive folder.

## How It Works

1. **Folder-Based Access**: Opens your Google Drive folder for users to download the latest file
2. **User Selection**: Users can see all files and choose the most recent one
3. **No API Required**: Works without Google Drive API keys or authentication
4. **Always Up-to-Date**: Automatically shows whatever you've uploaded most recently

## User Experience

When users click the resume button:
1. **New Tab Opens**: Your Google Drive folder opens in a new tab
2. **Instructions Display**: Clear message guides users to find the latest resume
3. **File Selection**: Users can see all files and their upload dates
4. **Easy Download**: Standard Google Drive download interface

## Configuration

### Main Config File: `resumeConfig.ts`

```typescript
export const RESUME_CONFIG = {
  folderId: 'YOUR_GOOGLE_DRIVE_FOLDER_ID',
  folderUrl: 'YOUR_GOOGLE_DRIVE_FOLDER_URL',
  supportedTypes: ['pdf', 'doc', 'docx'],
  apiKey: '' // Optional - for future enhancements
};
```

## Managing Resume Files

### Adding New Resume Files
1. **Upload to Google Drive**: Simply drag and drop your new resume to the folder
2. **No Code Changes**: The system automatically detects new files
3. **User Access**: Users will see the new file immediately

### Best Practices
1. **Clear Naming**: Use descriptive names like "Resume_2025.pdf" or "CV_March_2025.pdf"
2. **File Organization**: Keep only current resumes in the folder
3. **Consistent Format**: Use PDF format for best compatibility

## Alternative: Direct Download (Optional)

If you want direct download for specific files, you can use the `downloadKnownResume()` function:

```typescript
// Update known file IDs when you add new files
const knownFiles = [
  { id: 'FILE_ID_1', name: 'resume_primary.pdf' },
  { id: 'FILE_ID_2', name: 'resume_backup.pdf' }
];
```

## Advantages of Folder Approach

✅ **Always Current**: Shows whatever you uploaded last  
✅ **No Maintenance**: No need to update code when adding files  
✅ **User Choice**: Users can see all available versions  
✅ **Reliable**: Works without API keys or authentication  
✅ **Familiar Interface**: Users already know how to use Google Drive  

## File URL Formats

- **Folder URL**: `https://drive.google.com/drive/folders/FOLDER_ID?usp=sharing`
- **Direct Download**: `https://drive.google.com/uc?export=download&id=FILE_ID`

## Security Notes

- Files must be in a public Google Drive folder
- No authentication required for public folders
- Standard Google Drive sharing permissions apply

## Testing

Test the resume download by:
1. Clicking the resume button
2. Verifying the Google Drive folder opens
3. Checking that files are visible and downloadable
4. Testing with different file types (PDF, DOC, DOCX)
