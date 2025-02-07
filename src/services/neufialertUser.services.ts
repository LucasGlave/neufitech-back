import { NeufialertUser } from '../models/neufialertUser.models';

export const findNumberID = async (numberID: string) => {
    return await NeufialertUser.findOne({ where: { number_id: numberID } });
};

export const verifyUser = async (numberID: string) => {
    const userExists = await findNumberID(numberID);
    if (userExists) {
        if (userExists.verified) {
            return 401
        } else {
            const update = await NeufialertUser.update({ verified: true }, { where: { number_id: numberID } });
            if (update) return 200
        }
    }
    throw new Error('Code not exists');
};
