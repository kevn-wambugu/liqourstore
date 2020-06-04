import mongoose from 'mongoose';

const mpesaSchema = {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },

    mobilenumber: { type: Number, required: true },
};



const mpesamodel = mongoose.model("Mpesa", mpesaSchema);
export default mpesamodel;