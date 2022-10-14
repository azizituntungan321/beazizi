import { BaseTransformer } from "src/transformer.base"
export class ProductTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            name: element.name,
            description: element.description ?? "",
            tag: element.tag,
            is_show: element.is_show,
            timestamp: element.timestamp
        }
    }
}