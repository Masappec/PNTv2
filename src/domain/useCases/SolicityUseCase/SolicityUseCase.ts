import SolicityService from "../../../infrastructure/Services/SolicityService";
import { StatusSolicity } from "../../../utils/enums";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";
import { Solicity } from "../../entities/Solicity";
import UserEntity from "../../entities/UserEntity";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number, limit?: number) {
    return await this.solicityService.getSolicities(search, page, limit);
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
    }





    return false;
  }


  availableToInsistency(user: UserEntity, solicity: Solicity) {
    if (solicity && user) {
      if (user.id == solicity.userCreated) {

        return solicity.status == StatusSolicity.INSISTENCY_PERIOD.key
      }

    }
    return false;
  }

  availableToResponse(user: UserEntity, solicity: Solicity) {
    //obtener el ultimo elemto de la lista de respuestas de la solicitud
    const user_citizen_id = parseInt(solicity.user_created);
    const user_session = user.id
    if (solicity && user) {
      if (user_citizen_id !== user_session) {
        return solicity.status == StatusSolicity.INSISTENCY_SEND.key
          || solicity.status == StatusSolicity.SEND.key
          || solicity.status == StatusSolicity.INFORMAL_MANAGMENT_SEND.key
      }

    }

    return false;

  }

  async createManualSolicity(data: CreateSolicity) {
    return await this.solicityService.createManualSolicity(data);
  }
}
export default SolicityUseCase;
