import StationController from './controller/StationController';
import UserController from './controller/UserController';
import WorkingPlaceController from './controller/WorkingPlaceController';
import * as Boom from '@hapi/boom';


const users = [
  { username: 'john', password: 'test', id: '1' },
  { username: 'tom', password: 'test', id: '2' },
];

export default [
  // auth test
  {
    method: 'GET',
    path: '/restricted',
    handler: (request, h): string => `Welcome ${JSON.stringify(request.auth.credentials)} to the restricted home page!`,
  },
  {
    method: 'GET',
    path: '/home',
    handler: (request, h): string => `Welcome, you should login!`,
    options: {
      auth: false,
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: async (request, h) => {
      console.log('/login request');
      const { username, password } = request.payload;
      console.log('payload');
      console.log(username);
      console.log(password);
      const account = users.find(
        (user) => user.username === username
      );
      console.log("account");
      console.log(account);
      console.log('check pass');
      // if (!account || !(await Bcrypt.compare(password, account.password))) {
      if (!account || password !== account.password) {
        console.error('fail!');
        throw Boom.unauthorized(`Authentication failed: ${request.auth.error.message}`);
      }
      console.log('set cookie');
      request.cookieAuth.set({ id: account.id });
      return Promise.resolve({message:'Authentication succeed'});
    },
    options: {
      auth: {
        mode: 'try'
      },
    },
  },{
    method: 'POST',
    path: '/logout',
    handler: async (request, h) => {
      console.log('/logout request');
      console.log(JSON.stringify(request.auth.credentials));
      request.cookieAuth.clear();
      return h.redirect('/');
    },
  },
  // Stations
  {
    method: 'GET',
    path: '/station/{stationId}',
    handler: StationController.getById,
  },
  {
    method: 'GET',
    path: '/station',
    handler: StationController.getAll,
  },
  {
    method: 'POST',
    path: '/station',
    handler: StationController.create,
  },
  {
    method: 'DELETE',
    path: '/station/{stationId}',
    handler: StationController.delete,
  },
  {
    method: 'PUT',
    path: '/station',
    handler: StationController.update,
  },
  {
    method: 'POST',
    path: '/station/{parentStationId}/to/{childStationId}',
    handler: StationController.setRelatedById,
  },
  // WorkingPlace
  {
    method: 'GET',
    path: '/station/{stationId}/workingplace',
    handler: WorkingPlaceController.getAll,
  },
  {
    method: 'POST',
    path: '/station/{stationId}/workingplace',
    handler: WorkingPlaceController.create,
  },
  {
    method: 'DELETE',
    path: '/station/{stationId}/workingplace{workingPlaceId}',
    handler: WorkingPlaceController.delete,
  },
  {
    method: 'PUT',
    path: '/station/{stationId}/workingplace/{workingPlaceId}',
    handler: WorkingPlaceController.update,
  },
  //  Users
  {
    method: 'GET',
    path: '/user/{userId}',
    handler: UserController.getById,
  },
  {
    method: 'GET',
    path: '/user',
    handler: UserController.get,
  },
  {
    method: 'POST',
    path: '/user',
    handler: UserController.create,
  },
  {
    method: 'DELETE',
    path: '/user/{userId}',
    handler: UserController.delete,
  },
  {
    method: 'PUT',
    path: '/user',
    handler: UserController.update,
  },
];
