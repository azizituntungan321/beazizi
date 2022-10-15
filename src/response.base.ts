import { Res, HttpStatus, Response } from '@nestjs/common';
export class AppResponse {

    static ok(@Res() res, values: any, message: String = ""): Response {
        return res.status(HttpStatus.OK).json({
            "statusCode": HttpStatus.OK,
            "message": message,
            "data": values
        })
    }

    static badRequest(@Res() res, values: any, message: String = ""): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            "statusCode": HttpStatus.BAD_REQUEST,
            "message": message,
        })
    }

    static notFound(@Res() res, values: any, message: String = ""): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            "statusCode": HttpStatus.NOT_FOUND,
            "message": 'Data Not Found!',
        })
    }
}