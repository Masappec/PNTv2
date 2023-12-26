class UserEntity {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    identification?: string;
    phone?: string;
    address?: string;
    city?: string;
    country?: string;
    password?: string;
    province?: string;
    type_person?: string;
    groups?: {
      id: number;
      name: string;
    
    }[];
    

    constructor(id: number, username: string, email: string, firstName: string, lastName: string) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
    }

   

    
  }
  
  export default UserEntity;