import { ipcMain } from 'electron';

let mainWindow = null;

export default {
  init(window) {
    mainWindow = window;
    
    // 注册IPC事件处理
    this.registerIpcHandlers();
  },

  registerIpcHandlers() {
    // 窗口置顶控制
    ipcMain.handle('set-always-on-top', (_, status) => {
      if (mainWindow) {
        mainWindow.setAlwaysOnTop(status);
        return true;
      }
      return false;
    });

    // 获取窗口置顶状态
    ipcMain.handle('get-always-on-top', () => {
      return mainWindow ? mainWindow.isAlwaysOnTop() : false;
    });

    // 窗口透明度控制
    ipcMain.handle('set-window-opacity', (_, value) => {
      if (mainWindow) {
        mainWindow.setOpacity(value);
        return true;
      }
      return false;
    });

    // 获取窗口透明度
    ipcMain.handle('get-window-opacity', () => {
      return mainWindow ? mainWindow.getOpacity() : 1;
    });

    // 窗口关闭
    ipcMain.on('window-close', () => {
      if (mainWindow) {
        mainWindow.close();
      }
    });

    // 窗口最大化/还原
    ipcMain.on('window-toggle-maximize', () => {
      if (mainWindow) {
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
        } else {
          mainWindow.maximize();
        }
      }
    });

    // 窗口最小化
    ipcMain.on('window-minimize', () => {
      if (mainWindow) {
        mainWindow.minimize();
      }
    });
  }
};
    