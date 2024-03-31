export interface BaseDTO {
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date;
    ip?: string;
    userCreated?: string;
    userUpdated?: string;
    userDeleted?: string;
}
class BaseEntity {
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date | null;
    ip?: string;
    userCreated?: string | null;
    userUpdated?: string | null;
    userDeleted?: string | null;

    constructor(
        createdAt: Date,
        updatedAt: Date,
        deleted: boolean,
        deletedAt: Date | null,
        ip: string,
        userCreated: string | null,
        userUpdated: string | null,
        userDeleted: string | null
    ) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deleted = deleted;
        this.deletedAt = deletedAt;
        this.ip = ip;
        this.userCreated = userCreated;
        this.userUpdated = userUpdated;
        this.userDeleted = userDeleted;
    }
}

export default BaseEntity;