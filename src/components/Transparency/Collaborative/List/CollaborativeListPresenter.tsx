
import { Pagination } from "flowbite-react";
import TransparencyCollab from "../../../../domain/entities/TransparencyCollab";

import Numeral from "../../../Common/Numeral";
import { StatusTransparency } from "../../../../domain/entities/TransparencyActive";

interface Props {

  data: TransparencyCollab[]
  error: string | null
  onSearch: (search: string) => void
  onAdd: () => void
  onImport: () => void
  onFilter: () => void
  onEdit: (transparency: TransparencyCollab) => void
  search: string
  setSeach: (search: string) => void
  page: number
  setPage: (page: number) => void
  setVisibleModal: (visible: boolean) => void
  visibleModal: boolean
  onConfirmDelete: () => void
  onCancelDelete: () => void
  onDelete: (Transparency: TransparencyCollab) => void
  from: number
  to: number
  total: number
  totalPage: number,
  selectedItem: TransparencyCollab | null,
  type_alert: "success" | "warning" | "info" | "error"
  hasPermApp: boolean
  onApproved: (item:TransparencyCollab)=>void
}
const CollaborativeListPresenter = (props: Props) => {
return(<>
  <h2 className='mb-4 text-balance border-b border-gray-300 pb-1 text-2xl font-bold text-primary'>
    Transparencia Colaborativa
  </h2>
  <h2 className='mb-4 mt-8 hidden rounded-md bg-primary p-4 text-left text-xl font-bold text-white' />
  <section className='flex flex-col items-center justify-center gap-4'>
    <Numeral
      title={"Transparencia Colaborativa"}
      text={""}
      onClick={() => props.onAdd()}
      isPublished={false}
    />

    {
      props.data.map(transparency => (
        <Numeral
          title={"Transparencia Colaborativa"}
          text={new Date(transparency.published_at).toLocaleString()}
          onClick={() => props.onEdit(transparency)}
          isPublished={transparency.published}
          isApprobation={
            transparency.status!==StatusTransparency.APROVED && props.hasPermApp
          }
          onApproved={() => props.onApproved(transparency)}
        />
      ))
    }
    <Pagination 
      currentPage={props.page || 1} 
      totalPages={props.totalPage}
      onPageChange={props.setPage || (() => { })}
      nextLabel="Siguiente"
      previousLabel="Anterior"
      className="bg-transparent"
     
    />
  </section>
</>)

}

export default CollaborativeListPresenter;