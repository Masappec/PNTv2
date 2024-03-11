import { useLocation } from "react-router-dom";
import ActivePreviewDataPresenter from "./ActivePreviewDataPresenter"
import { useEffect, useState } from "react";

export interface INeedProps {
    files: number[]
}

const ActivePreviewDataContainer = () => {


    const location = useLocation()
    const state = location.state as INeedProps;

    const [, setFiles] = useState<number[]>([]);

    useEffect(() => {
        if (state) {
            setFiles(state.files)
        }
    }, [])

    return (
        <ActivePreviewDataPresenter
            onFilter={() => {
            }}
            currentPage={1}
            error={""}
            onAdd={() => { }}
            onConfirmDelete={() => { }}
            onDelete={() => { }}
            onEdit={() => { }}
            onImport={() => { }}
            onPageChange={(page: number) => {
                console.log(page)
            }}
            onSearch={(type: string) => {
                console.log(type)

            }}
            page={1}
            search=""
            setPage={() => { }}
            setSeach={() => { }}
            setVisibleModal={() => { }}
            visibleModal={false}
            key={1}
            onNext={() => { }}
            onPrevious={() => { }}

        />
    )
}

export default ActivePreviewDataContainer;