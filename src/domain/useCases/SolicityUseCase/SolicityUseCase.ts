import SolicityService from "../../../infrastructure/Services/SolicityService";
import CreateSolicity from "../../entities/CreateSolicity";
import ResponseSolicity from "../../entities/ResponseSolicity";
import { Solicity } from "../../entities/Solicity";
import UserEntity from "../../entities/UserEntity";

class SolicityUseCase {
  constructor(private readonly solicityService: SolicityService) { }
  async getSolicities(search: string, page: number) {
    return await this.solicityService.getSolicities(search, page);
  }
  async getEstablishmentSolicity(search: string, page: number) {
    return await this.solicityService.getEstablishmentSolicity(search, page);
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



  availableToResponse(user: UserEntity, solicity: Solicity) {
    //obtener el ultimo elemto de la lista de respuestas de la solicitud
    if (solicity && user) {
      if (solicity.responses) {
        if (solicity.responses.length === 10) {
          return false;
        }
        const lastResponse = solicity.responses[solicity.responses.length - 1];
        if (!lastResponse) {
          if (user.user_permissions) {
            if (user.user_permissions?.find(x => x.codename === 'view_solicityresponse')) {
              if (solicity.userCreated !== user.id) {
                return true;
              }
            }

          }

        }


        if (lastResponse) {
          if (lastResponse.user.id !== user.id) {
            return true;
          }
        }


      }

    }
    return false;

  }
}
export default SolicityUseCase;
