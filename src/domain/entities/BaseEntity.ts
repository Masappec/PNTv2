
class BaseEntity{
    createdAt?: Date;
    updatedAt?: Date;
    deleted?: boolean;
    deletedAt?: Date;
    ip?: string;
    userCreated?: string;
    userUpdated?: string;
    userDeleted?: string;

    constructor(
        createdAt: Date,
        updatedAt: Date,
        deleted: boolean,
        deletedAt: Date,
        ip: string,
        userCreated: string,
        userUpdated: string,
        userDeleted: string
    ){
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