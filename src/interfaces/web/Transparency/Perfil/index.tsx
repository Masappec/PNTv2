
import PerfilCreateContainer from '../../../../components/Admin/Perfil/PerfilCreateContainer'


import { ChangeEvent, FormEvent, useState } from 'react'
import SessionService from '../../../../infrastructure/Services/SessionService'

const userData = SessionService.getUserData()
const VerPerfil = () => {
  return <PerfilCreateContainer />
}

export default VerPerfil
