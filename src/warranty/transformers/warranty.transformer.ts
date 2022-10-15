import { Injectable } from '@nestjs/common';
import { BaseTransformer } from "src/transformer.base"
@Injectable()
export class WarrantyTransformer extends BaseTransformer {
    static singleTransform (element) {
        return {
            id: element.id,
            idProduct: element.idProduct,
            status: element.status,
            note: element.note,
            timestamp: element.timestamp
        }
        // return element
    }
}