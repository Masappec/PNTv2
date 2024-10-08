import SessionService from "../../infrastructure/Services/SessionService";

class UserEntity {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  identification?: string;
  phone?: string;
  address?: string;
  city?: string;
  country?: string;
  password?: string;
  province?: string;
  group?: {
    id: number;
    name: string;

  }[];
  job?: string;
  establishment_id?: number;
  race?: string;
  age_range?: string;
  accept_terms?: boolean;
  is_active?: boolean;
  user_permissions?: {
    codename: string;
  }[]
  is_superuser?: boolean;


  constructor(id: number, username: string, email: string, firstName: string, lastName: string,
    identification?: string, phone?: string, address?: string, city?: string, country?: string, password?: string,
    province?: string, groups?:
      {
        id: number;
        name: string;
      }[],
    establishment_id?: number,
    race?: string,
    age_range?: string,
    accept_terms?: boolean,
    job?: string,
    is_active?: boolean,
    user_permissions?: {
      codename: string;
    }[],
    is_superuser?: boolean
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.first_name = firstName;
    this.last_name = lastName;
    this.identification = identification;
    this.phone = phone;
    this.address = address;
    this.city = city;
    this.country = country;
    this.password = password;
    this.province = province;
    this.group = groups;
    this.establishment_id = establishment_id;
    this.race = race;
    this.age_range = age_range;
    this.accept_terms = accept_terms;
    this.job = job;
    this.is_active = is_active;
    this.user_permissions = user_permissions;
    this.is_superuser = is_superuser;
  }




  static isUserEntity(data: UserEntity): boolean {
    if (!data) return false;
    const establishment = SessionService.getEstablishmentData();
    return establishment  && !data.is_superuser
  }
}

export default UserEntity;