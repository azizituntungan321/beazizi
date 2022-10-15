import { Injectable } from '@nestjs/common';
import { BaseTransformer } from "src/transformer.base"
@Injectable()
export class UsersTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            username: element.username,
            role: element.role,
            timestamp: element.timestamp
        }
        // return element
    }
}