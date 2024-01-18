

  class FormFieldsEntity {
    id: number;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string;
    name: string;
    description: string;
    form_type: string;
    model: string;
    is_active: boolean;
    role: string;
    type_field: string;

    options?: {
      id: number;
      name: string;
    }[] | null;

    constructor(
      id: number,
      created_at: string,
      updated_at: string,
      deleted: boolean,
      deleted_at: string,
      name: string,
      description: string,
      form_type: string,
      model: string,
      is_active: boolean,
      role: string,
      type_field: string,
      options?: {
        id: number;
        name: string;
      }[] | null
    ) {
      this.id = id;
      this.created_at = created_at;
      this.updated_at = updated_at;
      this.deleted = deleted;
      this.deleted_at = deleted_at;
      this.name = name;
      this.description = description;
      this.form_type = form_type;
      this.model = model;
      this.is_active = is_active;
      this.role = role;
      this.type_field = type_field;
      this.options = options;
    }
  }

  export default FormFieldsEntity;