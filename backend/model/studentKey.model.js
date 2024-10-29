// models/AccessKey.js
import mongoose from 'mongoose';

const accessKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    validUntil: {
        type: Date,
        required: true,
    }
});

export const accessKeyModel = new mongoose.model("AccessKey", accessKeySchema)
// export default mongoose.model("AccessKey", accessKeySchema);
