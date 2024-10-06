import {CanActivate, ExecutionContext} from "@nestjs/common";
import * as  process from "process";
import {Observable} from "rxjs";

export class ApiGuard implements CanActivate {

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const apikey = req.query.apiKey || req.body.apiKey;
        return apikey === process.env.API_KEY;
    }
}