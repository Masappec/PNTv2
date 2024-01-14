import React from "react";
import UserImportContainer from "../../../../../components/Admin/Users/Import/UserImportContainer";
import Breadcrumb from "../../../../../components/Common/Breadcrumb";

const UserImport= ()=>{
    return(
        <>
        <Breadcrumb
            items={[
                {
                    name: 'Usuarios',
                    path: '/admin/users',
                },
                {
                    name: 'Importar archivos',
                    path: '/admin/import',
                }
            
            ]}
        />
        <UserImportContainer/>

    </>
    )
}

export default UserImport