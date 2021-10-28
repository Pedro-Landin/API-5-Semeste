import React, {createContext} from 'react'
import meusAnuncios from '../data/meusAnuncios'

const  MeusAnunciosContext = createContext({})

export const UsersProvider = props => {
    return(
        <MeusAnunciosContext.Provider valuer={{
            state: {
                meusAnuncios
            }
         }}>
         {props.children}
         </MeusAnunciosContext.Provider>
         )
}

export default MeusAnunciosContext