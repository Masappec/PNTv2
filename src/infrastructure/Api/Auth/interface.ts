export interface RegisterDto{

    first_name: string,
    last_name: string,
    username: string,
    password: string,
    identification: string,
    phone: string,
    province: string,
    gender: string,
    age_range: string,
    city: string,
    race: string,
    disability?:boolean,
    accept_terms: boolean
  
  }

  /*{
    "id": 1,
    "is_superuser": true,
    "username": "superadmin@pnt.com",
    "first_name": "Super",
    "last_name": "Administrador",
    "email": "superadmin@pnt.com",
    "group": [
        {
            "id": 5,
            "name": "Superadministradora PNT DPE"
        }
    ],
    "user_permissions": [
        {
            "codename": "add_person"
        },
        
    ]
}*/

export interface LoginUserDataResponseDto{
    id: number,
    is_superuser: boolean,
    username: string,
    first_name: string,
    last_name: string,
    email: string,
    group?: {
        id: number;
        name: string;
    }[];
    user_permissions?: {
        codename: string;
    }[]

}

export interface LoginResponseDto{
    access: string,
    refresh: string,
    user: LoginUserDataResponseDto
}