import { Request, Response } from 'express';
import { findCode, addCode, statusCode, findCodes } from '../services/code.service';

export const compareCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        let existingCode = await findCode(code);
        if (!existingCode) {
            return res.status(404).json({ message: 'Code not found' });
        } else {
            await statusCode(code)
        }
        return res.status(200).json({ message: 'Code status change' });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

export const createCode = async (req: Request, res: Response) => {
    try {
        const { code } = req.body;
        const newCode = await addCode(code);
        return res.status(201).json({ message: 'Code added', code: newCode });
    } catch (error) {
        console.error(error)
        return res.status(400).json({ error: error });
    }
};

export const getCodes = async (req: Request, res: Response) => {
    try {
        const codes = await findCodes();
        return res.status(201).json(codes);
    } catch (error) {
        console.error(error)
        return res.status(400).json({ error: error });
    }
};
