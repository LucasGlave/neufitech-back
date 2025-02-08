import { Request, Response } from "express";

import { findNumberID, verifyUser } from "../services/neufialertUser.services";

const checkNumberID = async (req: Request, res: Response) => {
  try {
    const { numberID } = req.body;
    if (!numberID) {
      return res.status(400).json({ message: "Number ID is required." });
    }
    const existingCode = await findNumberID(numberID);
    if (!existingCode) {
      return res.status(404).json({ message: "Code not found." });
    }
    verifyUser(numberID);
    return res.status(200).json({ message: "Code found." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}



export default { checkNumberID };
