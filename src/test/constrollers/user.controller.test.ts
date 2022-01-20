import express from 'express'
import bodyParser from 'body-parser'
import { useExpressServer } from "routing-controllers";
import request from 'supertest'
import { Info } from "../../models/info";
import { UserController } from "../../controllers/user.controller";
import { GlobalErrorHandler } from '../../middlewares/global-error-handler.middleware';

let server;

beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());
    useExpressServer(server, {
      controllers: [UserController], // we specify controllers we want to use
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  });

describe('UserController', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });
  
    it('postOne with validations', done => {
        request(server)
          .post('/users/1')
          .send({
            country: 'Russia',
            city: 'SPb'
          } as Info)
          .expect(204)
          .end((err, res) => {
            if (err) throw new Error(JSON.stringify(res.body));
            done();
          });
      });
  })