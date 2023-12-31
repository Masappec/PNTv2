/*{
    "id": 35,
    "created_at": "2023-12-29T16:28:32.783001Z",
    "updated_at": "2023-12-29T16:28:32.783001Z",
    "deleted": false,
    "deleted_at": null,
    "name": "race",
    "description": "Autoidentificación",
    "form_type": "Usuario",
    "model": "Person",
    "is_active": true,
    "role": "Ciudadano",
    "type_field": "text"
  },*/

  export interface FormFieldsList {
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
  }