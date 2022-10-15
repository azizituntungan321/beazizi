import { Injectable } from '@nestjs/common';
import { BaseTransformer } from "src/transformer.base"
@Injectable()
export class UsersTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            username: element.username,
            role: element.role,
            active: element.active,
            timestamp: element.timestamp
        }
    }
}