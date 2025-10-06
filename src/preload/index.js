import { contextBridge, ipcRenderer } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';

// 自定义API
const customAPI = {
  // 窗口控制
  setAlwaysOnTop: (status) => ipcRenderer.invoke('set-always-on-top', status),
  getAlwaysOnTop: () => ipcRenderer.invoke('get-always-on-top'),
  setWindowOpacity: (value) => ipcRenderer.invoke('set-window-opacity', value),
  getWindowOpacity: () => ipcRenderer.invoke('get-window-opacity'),
  
  // 窗口操作（无标题栏需要手动实现）
  closeWindow: () => ipcRenderer.send('window-close'),
  toggleMaximizeWindow: () => ipcRenderer.send('window-toggle-maximize'),
  minimizeWindow: () => ipcRenderer.send('window-minimize')
};

// 暴露API到渲染进程
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electronAPI', { ...electronAPI, ...customAPI });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electronAPI = { ...electronAPI, ...customAPI };
}
    