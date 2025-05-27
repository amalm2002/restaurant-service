
import { Document, ObjectId } from 'mongoose';

export interface BaseSchemaInterface extends Document {
    createdAt: Date;
    updatedAt: Date;
}