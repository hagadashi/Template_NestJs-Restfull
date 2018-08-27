import { ExceptionFilter, ArgumentsHost, HttpStatus, Catch, HttpException } from "@nestjs/common";
import { ApiException } from "../base";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const req: Request = context.getRequest();
        const res: Response = context.getResponse();
        const status = error.getStatus();

        if (status === HttpStatus.UNAUTHORIZED) {
            if (typeof(error.response) !== typeof('string')) {
                error.response['message'] =
                    error.response.message || 'You do not have permission to access this resource';
            }
        }

        const responseError: ApiException = {
            statusCode: status,
            error: error.response.name || error.name,
            message: error.response.message || error.message,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null,
            method: req ? req.method : null,
        }
        res.status(status).json(responseError);
    }
}
