// import { Bcrypt } from 'bcrypt';
import StationController from './controller/Station';
import UserController from './controller/User';
import WorkingPlaceController from './controller/WorkingPlace';

export default [
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
    path: '/station/{stationId}',
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
    path: '/station/{stationId}/workingplace{workingplaceId}',
    handler: WorkingPlaceController.delete,
  },
  {
    method: 'PUT',
    path: '/station/{stationId}/workingplace/{workingplaceId}',
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
    path: '/user/{userId}',
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

  {
    method: 'GET',
    path: '/',
    // handler: (request: Request, h: ResponseToolkit):string => 'Hello World!',
    handler: (): string => 'Welcome to the restricted home page!',
  },
  // {
  //   method: 'GET',
  //   path: '/login',
  //   handler: (): string => ` <html>
  //                 <head>
  //                     <title>Login page</title>
  //                 </head>
  //                 <body>
  //                     <h3>Please Log In</h3>
  //                     <form method="post" action="/login">
  //                         Username: <input type="text" name="username"><br>
  //                         Password: <input type="password" name="password"><br/>
  //                     <input type="submit" value="Login"></form>
  //                 </body>
  //             </html>`,
  //   options: {
  //     auth: false,
  //   },
  // },
  // {
  //   method: 'POST',
  //   path: '/login',
  //   // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  //   handler: async (request, h) => {
  //     const { username, password } = request.payload;
  //
  //     const user = {
  //       username: 'john',
  //       password: 'test',
  //       name: 'John Doe',
  //       id: '154',
  //     };
  //
  //
  //     if (user.username === username && user.password === password) {
  //       return h.view('/login');
  //     }
  //
  //     request.cookieAuth.set({ id: user.id });
  //
  //     return h.redirect('/');
  //   },
  //   options: {
  //     auth: {
  //       mode: 'try',
  //     },
  //   },
  // },
];
