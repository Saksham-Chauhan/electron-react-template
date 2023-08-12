import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);

export const loginUser = (token: string) => {
  window.electron.ipcRenderer.sendMessage('login-user', token);
  return new Promise((resolve) => {
    window.electron.ipcRenderer.once('login-user', (arg: any) => {
      resolve(arg);
    });
  });
};
