//Contains the model and interface to represent a store
import { model, models, Schema } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface StoreInterface {
    name: string;
    age: string;
    owner: string;
}

// 2. Create a Schema corresponding to the document interface.
const storeSchema = new Schema<StoreInterface>({
    name: { type: String, required: true },
    age: { type: String, required: true },
    owner: { type: String, required: true },
});

// 3. Create a Model.
const Store = models.Store || model<StoreInterface>('Store', storeSchema)

export { Store }
