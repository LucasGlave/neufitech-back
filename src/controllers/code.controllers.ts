import { Request, Response } from "express";
import {
  findCode,
  addCode,
  statusCode,
  findCodes,
} from "../services/code.services";

const compareCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    if (code === process.env.PRIVATE_CODE) {
      return res.status(200).json({ message: "Code status change." });
    }
    let existingCode = await findCode(code);
    if (!existingCode) {
      return res.status(404).json({ message: "Code not found." });
    }
    const status = await statusCode(code);
    if (status === 200) {
      return res.status(status).json({ message: "Code status change." });
    } else {
      return res.status(status).json({ message: "User already verified." });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error });
  }
};

const createCode = async (req: Request, res: Response) => {
  try {
    const { code } = req.body;
    const newCode = await addCode(code);
    return res.status(201).json({ message: "Code added.", code: newCode });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error });
  }
};

const getCodes = async (req: Request, res: Response) => {
  try {
    const codes = await findCodes();
    return res.status(201).json(codes);
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: error });
  }
};

export default { compareCode, createCode, getCodes };
