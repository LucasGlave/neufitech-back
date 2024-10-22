import { Request, Response } from "express";
import service from "../services/ia.service";

const getResponses = async (req: Request, res: Response) => {
  const { text } = req.body;
  try {
    if (text) {
      let { responses } = await service.getResponses(text);
      res.send(responses).status(200);
    }
  } catch (err) {
    console.error(err);
  }
};

export default { getResponses };
