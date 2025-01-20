import { AxiosInstance } from "axios";
import { TRANSPARENCY_PATH } from "..";
import { Pnt1ActiveDto, Pnt1ColabDto, Pnt1FocalDto, Pnt1PasiveDto, Pnt1ReservadaDto } from "./interface";


export class Pnt1Api {
  constructor(private readonly api: AxiosInstance) {}



  async getPasive(ruc:string){
    const res = await this.api.get<Pnt1PasiveDto[]>(
      TRANSPARENCY_PATH + "/pnt1/pasive",
      {
        params: {
          ruc,
        },
      }
    );

    return res.data;
  }

  //get active

  async getActive(ruc: string) {
    console.log(ruc)
    const res = await this.api.get<Pnt1ActiveDto[]>(
      TRANSPARENCY_PATH + "/pnt1/active",
      {
        params: {
          ruc,
        },
      }
    );

    return res.data;
  }

  //get colaborator
  //Pnt1ColabDto
    async getColaborator(ruc: string) {
        const res = await this.api.get<Pnt1ColabDto[]>(
          TRANSPARENCY_PATH + "/pnt1/colab",
          {
            params: {
              ruc,
            },
          }
        );
    
        return res.data;
    }

    //get focal
    //Pnt1FocalDto
    async getFocal(ruc: string) {
        const res = await this.api.get<Pnt1FocalDto[]>(
          TRANSPARENCY_PATH + "/pnt1/focal",
          {
            params: {
              ruc,
            },
          }
        );
    
        return res.data;
    }

    //get reservada
    //Pnt1ReservadaDto
    async getReservada(ruc: string) {
        const res = await this.api.get<Pnt1ReservadaDto[]>(
          TRANSPARENCY_PATH + "/pnt1/reservada",
          {
            params: {
              ruc,
            },
          }
        );
    
        return res.data;
    }

}