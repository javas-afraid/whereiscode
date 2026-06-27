const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    openFile: () => ipcRenderer.invoke('open-file'),
    saveFile: (fileData) => ipcRenderer.invoke('save-file', fileData),
    
    // 1. Fetch all repositories the user has access to
    fetchUserRepos: async (token) => {
        const response = await fetch(`https://api.github.com/user/repos?per_page=100&sort=updated`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        return await response.json();
    },

    // 2. Fetch contents (files/folders) of a specific repo path
    fetchRepoContents: async (token, owner, repo, path = '') => {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        return await response.json();
    }
});
