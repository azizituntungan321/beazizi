import { BaseTransformer } from "src/transformer.base"
export class UsersTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            username: element.username,
            password: element.password,
            role: element.role,
            timestamp: element.timestamp
        }
    }
}