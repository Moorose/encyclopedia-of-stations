import StationController from './controller/StationController';
import UserController from './controller/UserController';
import WorkingPlaceController from './controller/WorkingPlaceController';
import { authUser, logout } from './helper';

export default [
  // auth
  {
    method: 'GET',
    path: '/me',
    handler: UserController.getMe,
  },
  {
    method: 'POST',
    path: '/login',
    handler: authUser,
    options: {
      auth: {
        mode: 'try',
      },
    },
  },
  {
    method: 'POST',
    path: '/logout',
    handler: logout,
  },
  // Stations
  {
    method: 'GET',
    path: '/station/{stationId}',
    handler: StationController.getById,
  },
  {
    method: 'GET',
    path: '/station/unm/{UNM}',
    handler: StationController.getByUNM,
  },
  {
    method: 'GET',
    path: '/station/name/{name}',
    handler: StationController.getByName,
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
  {
    method: 'DELETE',
    path: '/station/{parentStationId}/to/{childStationId}',
    handler: StationController.removeRelatedById,
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
    path: '/user/string/{str}',
    handler: UserController.getByString,
  },
  {
    method: 'GET',
    path: '/user/query{query}',
    handler: UserController.getWithQuery,
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
