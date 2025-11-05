import { createResourceId } from '../utils/create-resource-id';
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from '../utils/jwt';
import { wait } from '../utils/wait';
import axios from 'axios';

const users = [
  {
    id: '5e86809283e28b96d2d38537',
    avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
    email: 'demo@devias.io',
    name: 'Anika Visser',
    password: 'Password123!',
    plan: 'Premium'
  }
];

class AuthApi {
  async login({ email, password }) {
    // await wait(500);

    // const url = '/api/users/login';
    // try {
    //   const cUser = await axios.post(url, { email, password }, {
    //     method: 'POST'
    //   });
    //   console.log('cUser', cUser);
    // } catch (e) {
    //   console.log('Error------>', e);
    //   return 'Please check your email and password';
    // }

    // .catch(error => {
    //   console.log(error);
    // });


    // .then(res => res)
    //     .catch(error => {
    //       console.log(error);
    //     });

    return new Promise(async (resolve, reject) => {
      try {
        // Find the user
        const user = users.find((_user) => _user.email === email);
        const url = '/api/users/login';
        // const urlNew = '/api/users';
        // const newUserAdmin = {
        //   email: 'katala2.jonni@yandex.ru',
        //   name: 'katala',
        //   surname: 'katala',
        //   secondName: 'Max12345678',
        //   password: 'Max12345678',
        //   roles: ['admin'],
        //   passwordConfirm: 'Max12345678'
        // };
        // const newUser = await axios.post(urlNew, { user: newUserAdmin }, {
        //   method: 'POST'
        // })
        //   .catch(error => {
        //     console.log(error.message, 'ОШИБКА');
        //     return null;
        //   });

        const cUser = await axios.post(url, { email, password }, {
          method: 'POST'
        })
          .catch(error => {
            return null;
          });
        // console.log('cUser', cUser);

        // if (!user || (user.password !== password)) {
        //   reject(new Error('Please check your email and password'));
        //   return;
        // }

        console.log('user--->', user);
        console.log('cUser--->', cUser);

        if (!cUser || !cUser.data || !cUser.data.user) {
          reject(new Error('Неправильный логин или пароль!'));
          return;
        }

        // Create the access token
        // const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        const { token } = cUser.data.user;
        // const accessToken = cUser.token;
        // console.log('token', token);
        resolve(token);
        // resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Что-то пошло не так! Попробуйте снова.'));
      }
    });

    // return new Promise((resolve, reject) => {
    //   try {
    //     // Find the user
    //     const user = users.find((_user) => _user.email === email);
    //     const currentUser = users.find((_user) => _user.email === email);
    //
    //     if (!user || (user.password !== password)) {
    //       reject(new Error('Please check your email and password'));
    //       return;
    //     }
    //
    //     // Create the access token
    //     const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    //
    //     resolve(accessToken);
    //   } catch (err) {
    //     console.error('[Auth Api]: ', err);
    //     reject(new Error('Internal server error'));
    //   }
    // });
  }

  async register({ email, name, password }) {
    await wait(1000);

    return new Promise((resolve, reject) => {
      try {
        // Check if a user already exists
        let user = users.find((_user) => _user.email === email);

        if (user) {
          reject(new Error('User already exists'));
          return;
        }

        user = {
          id: createResourceId(),
          avatar: null,
          email,
          name,
          password,
          plan: 'Standard'
        };

        users.push(user);

        const accessToken = sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        resolve(accessToken);
      } catch (err) {
        console.error('[Auth Api]: ', err);
        reject(new Error('Internal server error'));
      }
    });
  }

  me(accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        // Decode access token
        // const { userId } = decode(accessToken);

        // Find the user
        // const user = users.find((_user) => _user.id === userId);
        const url = '/api/user';
        const cUser = await axios.get(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
          .catch(error => {
            return null;
          });

        if (!cUser || !cUser.data || !cUser.data.user) {
          reject(new Error('У Вас нет прав!'));
          return;
        }

        // if (!user) {
        //   reject(new Error('Invalid authorization token'));
        //   return;
        // }

        const { user } = cUser.data;
        delete user.token;

        resolve({
          // id: user.id,
          // avatar: user.avatar,
          // email: user.email,
          // name: user.name,
          ...user,
          plan: 'Premium'
        });
      } catch (err) {
        console.error('[Auth Api]--->ME: ', err);
        reject(new Error('Что-то пошло не так! Попробуйте снова.'));
      }
    });
  }
}

export const authApi = new AuthApi();
