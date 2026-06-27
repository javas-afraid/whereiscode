ipcMain.handle('open-file', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'All Source Code Files', extensions: ['js', 'mjs', 'ts', 'tsx', 'html', 'htm', 'css', 'scss', 'json', 'py', 'java', 'c', 'cpp', 'h', 'cs', 'go', 'rs', 'rb', 'php', 'sh', 'bat', 'ps1', 'md', 'yaml', 'yml', 'sql', 'xml'] },
            { name: 'JavaScript & TypeScript', extensions: ['js', 'mjs', 'cjs', 'ts', 'tsx', 'jsx'] },
            { name: 'Web Files', extensions: ['html', 'htm', 'css', 'scss', 'less'] },
            { name: 'Python Scripts', extensions: ['py', 'pyw'] },
            { name: 'C-Style Languages', extensions: ['c', 'cpp', 'h', 'hpp', 'cs', 'java'] },
            { name: 'Data & Config', extensions: ['json', 'yaml', 'yml', 'xml', 'sql', 'md'] },
            { name: 'Systems & Shells', extensions: ['go', 'rs', 'rb', 'php', 'sh', 'bat', 'ps1'] }
        ]
    });
    if (!canceled && filePaths.length > 0) {
        const content = fs.readFileSync(filePaths[0], 'utf8');
        return { filePath: filePaths[0], content };
    }
    return null;
});
