import { membersService } from '@/services/membersService';
import type { Member } from '@/interfaces';

export const createUpdateMember = async (
    member: Partial<Member>
): Promise<Member> => {
    await sleep(1500);
    const { id, email, name, role } = member;
    if (!email || !name || !role) {
        throw new Error('Email, name and role are required');
    }
    if (id) {
        return membersService.update(id, {
            email,
            name,
            role,
        });
    }
    return membersService.add({
        email,
        name,
        role,
    });
};

export const sleep = (ms: number = 1000) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
