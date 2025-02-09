import { NeufialertUser } from '../models/neufialertUser.models';

export const findPhoneNumber = async (phone_number: string) => {
    return await NeufialertUser.findOne({ where: { phone_number } });
};

export const verifyUser = async (phone_number: string) => {
    const userExists = await findPhoneNumber(phone_number);
    if (userExists) {
        if (!userExists.verified) {
            await NeufialertUser.update({ verified: true }, { where: { phone_number } });
        }
        return userExists?.number_id
    }
    throw new Error('Code not exists');
};

export const addUser = async (
    fullname: string,
    email: string,
    phone_number: string,
    number_id: string
) => {
    try {
        const userExists = await findPhoneNumber(phone_number);
        if (userExists) {
            throw new Error('User already exists');
        }
        return await NeufialertUser.create({ fullname, email, phone_number, number_id, verified: false });
    } catch (error) {
        throw new Error(`User creation failed: ${error}`);
    }
};
