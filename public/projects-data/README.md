# Projects Data Configuration

This folder contains the dynamic project data for the Work section of your portfolio.

## How to Add/Update Projects

### 1. Update projects.json
Edit `projects.json` to add, remove, or modify projects. Each project should have:
- `id`: Unique identifier (used for file naming)
- `title`: Project title
- `category`: Project category
- `tools`: Technologies and tools used
- `image`: Image filename (must be in this folder)
- `liveUrl`: (Optional) Live demo URL - leave empty string `""` if not available
- `githubUrl`: (Optional) GitHub repository URL - leave empty string `""` if not available

### 2. Add Project Images
Place project images in this folder with the exact filename specified in the JSON file.
Supported formats: PNG, JPG, JPEG, GIF, WebP

### 3. Automatic Updates
- The portfolio automatically loads the latest data from this folder
- After updating files, the changes will be reflected when the page reloads
- No code changes required
- Live and GitHub links will only appear if URLs are provided (non-empty strings)

## Example Project Entry
```json
{
  "id": "my-project",
  "title": "My Awesome Project",
  "category": "Web Development",
  "tools": "React, TypeScript, Node.js",
  "image": "my-project.png",
  "liveUrl": "https://myproject.com",
  "githubUrl": "https://github.com/user/my-project"
}
```

## URL Field Options
- **Both URLs provided**: Shows both "Live Demo" and "GitHub" buttons
- **Only liveUrl**: Shows only "Live Demo" button
- **Only githubUrl**: Shows only "GitHub" button
- **Both empty**: Shows no URL buttons

## File Structure
```
projects-data/
├── README.md
├── projects.json
├── project1-image.png
├── project2-image.jpg
└── ...
```

## Deployment Notes
- Ensure the entire `projects-data` folder is uploaded to your hosting provider
- The folder should be placed in the `public` directory of your built application
