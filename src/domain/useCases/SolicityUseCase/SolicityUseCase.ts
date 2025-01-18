import SolicityService from "../../../infrastructure/Services/SolicityService";
import { StatusSolicity } from "../../../utils/enums";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";
import { Solicity } from "../../entities/Solicity";
import UserEntity from "../../entities/UserEntity";
import moment from 'moment';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';
import logo from '../../../assets/Home/logo-dpe 2.png';

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }


  async deleteSolicity(id: number) {
    return await this.solicityService.deleteSolicity(id);
  }
  async getSolicities(search: string, page: number, limit?: number, sort?: string[],
    range_start?: string, range_end?: string) {
    return await this.solicityService.getSolicities(search, page, limit, sort, range_start, range_end);
  }
  async getEstablishmentSolicity(search: string, page: number, limit?: number, sort?: string[], status?: string,
    establishment_id?: number) {
    return await this.solicityService.getEstablishmentSolicity(search, page, limit, sort, status, establishment_id);
  }
  async createDraft(data: CreateSolicity) {
    return await this.solicityService.createDraftSolicity(data);
  }

  async sendDraftSolicity(data: CreateSolicity, id: number,is_send:boolean) {
    return await this.solicityService.sendDraftSolicity(data, id,is_send);
  }

  async getSolicityById(id: number) {
    return await this.solicityService.getSolicityById(id);
  }
  async getSolicityBiIdEstablishment(id: number) {
    return await this.solicityService.getSolicityBiIdEstablishment(id);
  }

  async sendSolicityWithouDraft(data: CreateSolicity) {
    return await this.solicityService.sendSolicityWithouDraft(data);
  }

  async responseSolicity(data: ResponseSolicity) {
    return await this.solicityService.responseSolicity(data);
  }

  async getLastDraftSolicity() {
    return await this.solicityService.getLastDraftSolicity();
  }

  async updateSolicity(data: CreateSolicity, id: number, is_send: boolean) {
    return await this.solicityService.updateSolicity(data, id, is_send);

  }

  buildSaipCode() {
    return Math.floor(100000 + Math.random() * 900000);

  }

  commentSolicity(comment: string, solicityId: number, files: number[]) {
    return this.solicityService.commentSolicity(solicityId, comment, files);
  }



  availabletoComment(user: UserEntity, solicity: Solicity) {
    const lastComment = solicity.comments ? solicity.comments[solicity.comments.length - 1] : null;
    if (lastComment) {
      console.log('lastComment', lastComment);
      if (lastComment.user === user.id) {
        return false;
      } else {
        return solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
          || solicity.status == StatusSolicity.RESPONSED.key
          || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_RESPONSED.key
      }
    } else {
      return solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
        || solicity.status == StatusSolicity.RESPONSED.key
        || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_RESPONSED.key
    }


  }


  availableToInsistency(user: UserEntity, solicity: Solicity) {
    if (solicity && user) {
      if (user.group?.find(x=>x.name.toLowerCase().includes('ciudadano'))) {

        return solicity.status == StatusSolicity.INSISTENCY_PERIOD.key
          || solicity.status == StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key
      }

    }
    return false;
  }

  availableToResponse(user: UserEntity, solicity: Solicity) {
    //obtener el ultimo elemto de la lista de respuestas de la solicitud
    const user_citizen_id = parseInt(solicity.user_created);
    const user_session = user.id
    if (solicity && user) {
      if (solicity.is_manual) {
        return true;
      }
      if (user_citizen_id !== user_session) {
        return solicity.status == StatusSolicity.INSISTENCY_SEND.key
          || solicity.status == StatusSolicity.SEND.key
          || solicity.status == StatusSolicity.PRORROGA.key
          || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_SEND.key
      }

    }

    return false;

  }


  avaliableToProrroga(user: UserEntity, solicity: Solicity) {
    const user_session = user.user_permissions?.find(x => x.codename === 'view_solicityresponse')
    if (solicity && user) {
      if (solicity.status == StatusSolicity.SEND.key) {
        if (user_session) {
          const expired_date = new Date(parseInt(solicity.expiry_date.substring(0,4)), parseInt(solicity.expiry_date.substring(5,7)) - 1, parseInt(solicity.expiry_date.substring(8,10)))
          const now = new Date()     
          if (now <= expired_date
          ) {
            return true
          }

        }
      }
    }
    return false;
  }
  
  async createManualSolicity(data: CreateSolicity) {
    console.log(data)
    return await this.solicityService.createManualSolicity(data);
  }

  async changeStatus(solicityId: number, text: string, files: number[]) {
    return await this.solicityService.changeStatus(solicityId, text, files);
  }

  isAvaliableChangeStaus(solicity: Solicity) {
    const expired_date = moment.utc(solicity.expiry_date).toDate()
    const now = new Date()

    console.log(solicity.status)
    if (solicity.status == StatusSolicity.RESPONSED.key
      || solicity.status == StatusSolicity.NO_RESPONSED.key
      || solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
      || solicity.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key) {
      if (now > expired_date) {
        return true
      }

      if (solicity.status == StatusSolicity.RESPONSED.key) {
        return true
      }
    }


    return false
  }

  getTextChangeStatus(solicity: Solicity, user: UserEntity) {
    const user_session = user.user_permissions?.find(x => x.codename === 'view_solicityresponse')
    if (user_session) {
      if (solicity.status == StatusSolicity.SEND.key) {
        return 'Activar Prórroga'
      }
    } else {
      if (solicity.status == StatusSolicity.RESPONSED.key
        || solicity.status == StatusSolicity.NO_RESPONSED.key) {
        return 'Solicitar Insistencia'
      }

      if (solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
        || solicity.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key) {
        return 'Solicitar Gestión oficiosa'
      }
      return ''
    }
    return ''

  }


  getDescriptionTextStatus(solicity: Solicity, user_id: number) {
    console.log('solicity', solicity.status)
    if (user_id != solicity.userCreated) {
      if (solicity.status == StatusSolicity.PRORROGA.key) {
        return 'Solicitar Prórroga. Si necesitas mas tiempo para responder, ingresa a continuación'
      }
    } else {
      if (solicity.status == StatusSolicity.INSISTENCY_PERIOD.key) {
        return 'Escribe a continuación la explicación por la cual solicitas la insistencia a esta solicitud. De acuerdo a lo establecido en la LOTAIP, la entidad tiene un tiempo de 10 días adicionales, para responder a esta insistencia y a su vez a la solicitud original. Si deseas conocer más sobre este proceso revisa la sección '
      }

      if (solicity.status == StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key) {
        return 'Solicitar Gestión oficiosa.  Si la entidad no ha respondido, ingresarla a continuación'
      }
    }
    return ''

  }


  generatePdf(data: Solicity) {
    const doc = new jsPDF();

    // Título
    doc.addImage(logo, 'PNG', 10, 5, 50, 20);
    doc.text('Impresión de Solicitud Enviada', 70, 20).setFontSize(20);



    autotable(doc, {
      startY: 30,
      head: [['Nombre', 'Email', 'Teléfono', 'Identificación cultural', 'Género']],
      body: [[data.first_name, data.email, data.phone, data.race_identification, data.gender]],
    });

    autotable(doc, {
      startY: 50,
      head: [['Nombre de la Institución', 'Número SAIP', 'Fecha de Creación', 'Ciudad']],
      body: [[data.estblishment_name || "", data.number_saip, new Date(data.created_at).toLocaleString(), data.city,]],
    });



    if (data.responses) {
      // Responses
      autotable(doc, {
        startY: 80,
        head: [['Texto', 'Fecha de Creación']],
        body: [
          [
            data.text,
            new Date(data.created_at).toLocaleString()
          ],
          ...data.responses.map(item => [item.text, new Date(item.created_at).toLocaleString()]),
        ],
      });
    }

    // Timeline
    if (data.timeline) {
      doc.text('Estados', 10, 155, { align: 'left' }).setFontSize(12);
      autotable(doc, {
        startY: 160,
        head: [['Estado', 'Fecha de Creación']],
        body: data.timeline.map(item => [
          StatusSolicity[item.status as keyof typeof StatusSolicity].value,
          new Date(item.created_at).toLocaleString()]),
      });
    }



    // Obtener la fecha y hora actual
    const now = new Date();
    const fechaHoraImpresion = now.toLocaleString();

    doc.setFontSize(10);
    // Agregar la fecha y hora de impresión al final de la página
    const pageHeight = doc.internal.pageSize.height;
    doc.text(`Fecha de impresión: ${fechaHoraImpresion}`, 10, pageHeight - 10);

    // Guardar el PDF
    doc.save(`Solicitud-${data.number_saip}.pdf`);
  }


  isAvaliableToResponseProrroga(user: UserEntity, solicity: Solicity) {
 
    if (solicity && user) {
      if (solicity.status == StatusSolicity.PRORROGA.key) {
        return solicity.timeline.find(x => x.status == StatusSolicity.PRORROGA.key) ? true : false
      }
    }
    return false;
  }
}
export default SolicityUseCase;