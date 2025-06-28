import mongoose from "mongoose";

const DeliveryPartnerSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required: true,
        unique: true
    },
    VehicleDetails:{
        LisencePlate: {type: String,required: true,unique: true},
        vehicle:{
            type: String,
            enum: ["bike","scooter","bicycle"],
            default: "bike"
        }
    },
    totalDeliveries: {type: Number, default: 0},
    isOnline: {type: Boolean, default: true},
    profileImage: {type: String , required: true}
});

export const Delivery = mongoose.model("delivery",DeliveryPartnerSchema);
