

class TemplateFileEntity {

  constructor(
    public id: number,
    public file: File | null,
    public name: string,
    public isValid: boolean,
    public link?: string | null
  ) { }
}

export default TemplateFileEntity;