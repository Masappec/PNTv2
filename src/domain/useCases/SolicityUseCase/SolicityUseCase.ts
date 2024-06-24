import SolicityService from "../../../infrastructure/Services/SolicityService";
import { StatusSolicity } from "../../../utils/enums";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";
import { Solicity } from "../../entities/Solicity";
import UserEntity from "../../entities/UserEntity";
import moment from 'moment';

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number, limit?: number,sort?:string[]) {
    return await this.solicityService.getSolicities(search, page, limit,sort);
  }
  async getEstablishmentSolicity(search: string, page: number, limit?: number, sort?: string[]) {
    return await this.solicityService.getEstablishmentSolicity(search, page, limit, sort);
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
    }else{
      return solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
        || solicity.status == StatusSolicity.RESPONSED.key
        || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_RESPONSED.key
    }
    

  }


  availableToInsistency(user: UserEntity, solicity: Solicity) {
    if (solicity && user) {
      if (user.id == solicity.userCreated) {

        return solicity.status == StatusSolicity.INSISTENCY_PERIOD.key || solicity.status == StatusSolicity.PERIOD_INFORMAL_MANAGEMENT.key
      }

    }
    return false;
  }

  availableToResponse(user: UserEntity, solicity: Solicity) {
    //obtener el ultimo elemto de la lista de respuestas de la solicitud
    const user_citizen_id = parseInt(solicity.user_created);
    const user_session = user.id
    if (solicity && user) {
      if(solicity.is_manual){
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

  async createManualSolicity(data: CreateSolicity) {
    console.log(data)
    return await this.solicityService.createManualSolicity(data);
  }

  async changeStatus(solicityId:number){
    return await this.solicityService.changeStatus(solicityId)
  }

  isAvaliableChangeStaus(solicity: Solicity) {
    const expired_date = moment.utc(solicity.expiry_date).toDate()
    const now = new Date()
    
    console.log(now.getDate() ,expired_date.getDate()
      ,now.getFullYear() ,expired_date.getFullYear()
      ,now.getMonth() , expired_date.getMonth())
    if (solicity.status == StatusSolicity.RESPONSED.key
      || solicity.status == StatusSolicity.NO_RESPONSED.key
      || solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
      || solicity.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key) {
      if (now > expired_date) {
        return true
      }
    }

    return false
  }

  getTextChangeStatus(solicity:Solicity){
    if (solicity.status == StatusSolicity.RESPONSED.key
      || solicity.status == StatusSolicity.NO_RESPONSED.key){
        return 'Solicitar Insistencia'
      }

    if (solicity.status == StatusSolicity.INSISTENCY_RESPONSED.key
      || solicity.status == StatusSolicity.INSISTENCY_NO_RESPONSED.key){
        return 'Solicitar Gestión oficiosa'
      }
      return ''
  }
}
export default SolicityUseCase;
