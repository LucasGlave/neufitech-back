import { Code } from '../models/code.models';

export const findCode = async (inputCode: string) => {
    return await Code.findOne({ where: { code: inputCode } });
};

export const addCode = async (inputCode: string) => {
    const codeExists = await findCode(inputCode);
    if (codeExists) {
        throw new Error('Code already exists');
    }
    return await Code.create({ code: inputCode, verified: false });
};

export const statusCode = async (inputCode: string) => {
    const codeExists = await findCode(inputCode);
    if (codeExists) {
        if (codeExists.verified) {
            return 401
        } else {
            const update = await Code.update({ verified: true }, { where: { code: inputCode } });
            if (update) return 200
        }
    }
    throw new Error('Code not exists');
};

export const findCodes = async () => {
    const codeArray = await Code.findAll();
    if (codeArray) {
        return codeArray;
    }
    throw new Error('Code not exists');
};