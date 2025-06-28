import {
  AvailableOrderService,
  partnerProfile,
  partnerService,
} from "../services/Delivery.service.js";
import { tryCatchWrapper } from "../utils/tryCatchWrapper.js";

export const partnerRegister = tryCatchWrapper(async (req, res) => {
  const { id } = req.user;
  const partnerData = req.body;
  partnerData.userId = id;
  partnerData.VehicleDetails = {
    LisencePlate: req.body.LisencePlate,
    vehicle: req.body.vehicle,
  };
  if (req.file) {
    partnerData.profileImage = req.file.path;
  }
  const data = await partnerService(partnerData);
  if (!data || data === null) {
    return res.status(400).json({ message: "failed to setup profile" });
  }
  return res.status(200).json({ message: "profile saved", profile: data });
});

export const getProfile = tryCatchWrapper(async (req, res) => {
  const { id } = req.user;
  const profile = await partnerProfile(id);
  if (!profile) {
    return res.status(400).json({ message: "no profile found" });
  }
  return res.status(200).json({ message: "Profile found!!", profile: profile });
});

export const availableOrders = tryCatchWrapper(async(req,res) => {
  const result = await AvailableOrderService();
  res.status(200).json({result})
});