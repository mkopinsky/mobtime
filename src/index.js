import { app, sub } from 'ferp';
import * as storage from './storage';
import * as Action from './actions';
import { Http } from './http';
import { Websocket } from './websocket';

const port = process.env.PORT || 1234;

const Storage = storage.make();

app({
  init: Action.Init(),

  subscribe: state => [
    Http(Storage, Action, 'localhost', port),
    ...state.connections.map((connection) => (
      Websocket(Action, connection, connection.timerId)
    )),
  ],

  observe: ([state], action) => {
    Storage.store(state);
  },
});
