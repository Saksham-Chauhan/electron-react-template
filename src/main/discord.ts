import { mainWindow } from './main';

const { Client } = require('discord.js-selfbot-v13');

const client = new Client({ checkUpdate: false });

const loginUser = async (token: string) => {
  return new Promise((resolve) => {
    client
      .login(token)
      .then(() => {
        client.on('ready', async () => {
          if (Object.keys(client?.user).length > 0)
            resolve({ username: client?.user.username, login: true });
          else resolve({ message: 'Unable to get user', login: false });
        });
      })
      .catch((e: any) => {
        resolve({ login: false, message: 'Unable to login' + e });
      });
  });
};

export { loginUser };
