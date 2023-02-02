const fs = require('fs');
const path = require('path');
const { Router, RequestHandler, Request, Response, NextFunction } = require('express');

const wrapper = (asyncFn) =>
  (
    async (req = Request, res = Response, next = NextFunction) => {
      try {
        return await asyncFn(req, res, next);
      } catch (error) {
        return next(error);
      }
    }
  );

const createRouter = (services) => {
  const router = Router();

  services.forEach((service) => {
    service.routes.forEach((route) => {

      router[route.method](
        path.join(service.baseURL, route.path),
        wrapper(route.handler),
      );
      
    });
  });

  return router;
};

const services = fs.readdirSync(__dirname)
  .filter((s) => !s.startsWith('index'));

const importedServices = services.map((s) => ({
  code: s,
  ...(require(`${__dirname}/${s}`)),
}));

module.exports = { serviceRouter: createRouter(importedServices) };