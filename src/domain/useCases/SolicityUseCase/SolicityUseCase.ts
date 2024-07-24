import SolicityService from "../../../infrastructure/Services/SolicityService";
import { StatusSolicity } from "../../../utils/enums";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";
import { Solicity } from "../../entities/Solicity";
import UserEntity from "../../entities/UserEntity";
import moment from 'moment';
import jsPDF from 'jspdf';
import autotable from 'jspdf-autotable';

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number, limit?: number, sort?: string[],
    range_start?: string, range_end?: string) {
    return await this.solicityService.getSolicities(search, page, limit, sort, range_start, range_end);
  }
  async getEstablishmentSolicity(search: string, page: number, limit?: number, sort?: string[], status?: string) {
    return await this.solicityService.getEstablishmentSolicity(search, page, limit, sort, status);
  }
  async createDraft(data: CreateSolicity) {
    return await this.solicityService.createDraftSolicity(data);
  }

  async sendDraftSolicity(data: CreateSolicity, id: number) {
    return await this.solicityService.sendDraftSolicity(data, id);
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

  async updateSolicity(data: CreateSolicity, id: number) {
    return await this.solicityService.updateSolicity(data, id);

  }

  buildSaipCode() {
    return Math.floor(100000 + Math.random() * 900000);

  }

  commentSolicity(comment: string, solicityId: number) {
    return this.solicityService.commentSolicity(solicityId, comment);
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
      if (user.id == solicity.userCreated) {

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
          || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_SEND.key
      }

    }

    return false;

  }


  avaliableToProrroga(user: UserEntity, solicity: Solicity) {
    const user_citizen_id = parseInt(solicity.user_created);
    const user_session = user.id
    if (solicity && user) {
      if (solicity.status == StatusSolicity.SEND.key) {
        if (user_citizen_id !== user_session) {
          const expired_date = moment.utc(solicity.expiry_date).toDate()
          const now = new Date()

          if (now.getDay() == expired_date.getDay()
            && now.getMonth() == expired_date.getMonth()
            && now.getFullYear() == expired_date.getFullYear()
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

  async changeStatus(solicityId: number, text: string) {
    return await this.solicityService.changeStatus(solicityId, text);
  }

  isAvaliableChangeStaus(solicity: Solicity) {
    const expired_date = moment.utc(solicity.expiry_date).toDate()
    const now = new Date()


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

  getTextChangeStatus(solicity: Solicity, user_id: number) {
    if (user_id != solicity.userCreated) {
      if (solicity.status == StatusSolicity.SEND.key) {
        return 'Prórroga'
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
        return 'Solicitar Insistencia. Si necesitas consultar alguna aclaración sobre la respuesta recibida, ingresarla a continuación'
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
    doc.text('Reporte de Solicitud', 20, 10);



    autotable(doc, {
      startY: 20,
      head: [['Nombre del Establecimiento', 'Número SAIP', 'Fecha de Creación', 'Ciudad', 'Texto']],
      body: [[data.estblishment_name || "", data.number_saip, new Date(data.created_at).toLocaleString(), data.city, data.text]],
    });


    autotable(doc, {
      startY: 50,
      head: [['Nombre', 'Email', 'Teléfono', 'Identificación cultural', 'Género']],
      body: [[data.first_name, data.email, data.phone, data.race_identification, data.gender]],
    });


    // Timeline
    if (data.timeline) {
      autotable(doc, {
        startY: 80,
        head: [['Estado', 'Fecha de Creación']],
        body: data.timeline.map(item => [
          StatusSolicity[item.status as keyof typeof StatusSolicity].value,
          new Date(item.created_at).toLocaleString()]),
      });
    }


    if (data.responses) {
      // Responses
      autotable(doc, {
        startY: 160,
        head: [['Texto', 'Fecha de Creación']],
        body: data.responses.map(item => [item.text, new Date(item.created_at).toLocaleString()]),
      });
    }


    // Guardar el PDF
    doc.save(`Solicitud-${data.number_saip}.pdf`);
  }
}
export default SolicityUseCase;
