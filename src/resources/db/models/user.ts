//Contains the model and interface to represent a store
import { Schema, model, models } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface UserInterface {
    email: string;
    password: string;

}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<UserInterface>({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// 3. Create a Model.
const User =  models.User ||model<UserInterface>('User', userSchema) 

export { User }