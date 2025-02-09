import { Request, Response } from "express";
import { addUser, verifyUser } from "../services/neufialertUser.services";

const checkNumberID = async (req: Request, res: Response) => {
  try {
    const { phone_number } = req.body;
    if (!phone_number) {
      return res.status(400).json({ message: "Number ID is required." });
    }
    const number_id = await verifyUser(phone_number)
    if (number_id) {
      return res.status(200).json({ number_id });
    }
    return res.status(404).json({ message: "Code not found." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}

const addNumber = async (req: Request, res: Response) => {
  try {
    const { fullname,
      email,
      phone_number,
      number_id } = req.body;
    if (!fullname && !email && !phone_number && !number_id) {
      return res.status(400).json({ message: "Body incomplete." });
    }
    await addUser(fullname, email, phone_number, number_id)
    return res.status(200).json({ message: "User created." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
}

export default { checkNumberID, addNumber };
