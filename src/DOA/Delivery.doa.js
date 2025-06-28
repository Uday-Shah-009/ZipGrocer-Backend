import { Delivery } from "../Models/deliveryPartner.model.js" 

export const RegisterPartner = async(partnerData) => {
    const partner = await Delivery.create(partnerData)
    return partner;
}

export const findById = async(id) => {
    return await Delivery.findOne({userId: id}).populate("userId")
}

