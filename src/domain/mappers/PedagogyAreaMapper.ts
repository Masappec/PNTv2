import { FAQRequest, PedagogyAreaRequest, PedagogyAreaResponse } from "../../infrastructure/Api/PedagogyArea/interface";
import PedagogyAreaEntity from "../entities/PedagodyAreaEntity";


class PedagogyAreaMapper {
    static fromDomainToApi(data:PedagogyAreaEntity):PedagogyAreaRequest{
        return {
            faq: data.faq.map((item)=>{
                return {
                    question: item.question,
                    answer: item.answer,
                    is_active: item.isActive
                } as FAQRequest
            }),
            normative: data.normatives.map((item)=>{
                return {
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    is_active: item.isActive,

                }
            }),
            tutorial: data.tutorials.map((item)=>{
                return {
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    is_active: item.isActive,
                }
            })
        }
    }

    static fromApiToDomain(data:PedagogyAreaResponse):PedagogyAreaEntity{
        return new PedagogyAreaEntity(
            data.json.faq.map((item)=>{
                return {
                    id: item.id,
                    question: item.question,
                    answer: item.answer,
                    isActive: item.is_active,
                }
            }),
            data.json.normative.map((item)=>{
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    isActive: item.is_active,
                }
            }),
            data.json.tutorial.map((item)=>{
                return {
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    url: item.url,
                    isActive: item.is_active,
                }
            })
        )
    }

}

export default PedagogyAreaMapper;