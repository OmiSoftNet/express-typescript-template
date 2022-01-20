import { Controller, Get, Param, Post, OnUndefined, Body } from 'routing-controllers';
import 'reflect-metadata';
import { UseAfter, UseBefore } from 'routing-controllers';
import { loggingAfter, loggingBefore } from '../middlewares/login-hooks.meddleware';
import { Info } from '../models/info';

   @UseBefore(loggingBefore)
   @UseAfter(loggingAfter)
   @Controller()
   export class UserController {

    @Post('/users/:id')
    @OnUndefined(204)
    postOne (@Param('id') id: number, @Body() info: Info) {
      console.log(JSON.stringify(info));
    }

     @Get('/users/:id')
     getOne (@Param('id') id: number) {
       return 'This action returns user #' + id;
     }
   }