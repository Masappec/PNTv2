import FilePublicationContainer from "../../../../../components/Transparency/Reports/FilesPublications/FilePublicationsContainer"
import api from "../../../../../infrastructure/Api"
import ReportsApi from "../../../../../infrastructure/Api/Reports"





const FilePublications= () => {
    return (
        <FilePublicationContainer useCase={new ReportsApi(api)} />
    )

}

export default FilePublications