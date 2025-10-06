import { app, BrowserWindow } from 'electron';
import path from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import windowManager from './windowManager'; // 引入窗口管理模块

function createWindow() {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    menuBarVisible:false,
    frame: true, // 关键：移除窗口边框和标题栏
    // titleBarStyle: 'hidden', // 隐藏标题栏
    autoHideMenuBar: true, // 自动隐藏菜单栏
    ...(process.platform === 'linux' ? { icon: path.join(__dirname, '../../build/icon.png') } : {}),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  });

  // 窗口准备好后显示
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // 加载渲染进程
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));
  }

  // 初始化窗口管理
  windowManager.init(mainWindow);

  return mainWindow;
}

// 应用就绪后创建窗口
app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
    