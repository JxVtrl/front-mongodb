'use client'

import { useApp } from '@/contexts/contextApi';
import { Rota } from '@/types';
import React, { useState } from 'react';

// import { Container } from './styles';

const Page: React.FC = () => {
    const [selectedRoute, setSelectedRoute] = useState<Rota | null>(null)
    const { rotas } = useApp()
    
    const downloadRouteContentExcel = () => {
        const content = selectedRoute?.seats.map(seat => {
            return `${seat.numero},${seat.ocupado},${selectedRoute.origin},${selectedRoute.destination}`
        })
        
        const csvContent = "data:text/csv;charset=utf-8," + content!.join("\n")
        const encodedUri = encodeURI(csvContent)
        window.open(encodedUri)
    }
    
    return <div>
        
        <header>
            {/* make a excel download */}
            <button onClick={downloadRouteContentExcel}>Download</button>
        </header>
        
        
        
        {/* select da rota */}
        <select
            onChange={e => {
                const selectedRoute = rotas.find(rota => rota._id === e.target.value)
                setSelectedRoute(selectedRoute!)
            }}
            value={selectedRoute?._id}
        >
            {rotas.map((rota,index) => {
                return <option key={index} value={rota._id}>{rota.origin} - {rota.destination}</option>
            })}
        </select>
        
        {/* tabela com os passageiros */}
        <table>
            <thead>
                <tr>
                    <th>Numero</th>
                    <th>Ocupado</th>
                    <th>Origem</th>
                    <th>Destino</th>
                </tr>
            </thead>
            <tbody>
                {selectedRoute?.seats.map((seat,index) => {
                    return <tr key={index}>
                        <td>{seat.numero}</td>
                        <td>{seat.ocupado}</td>
                        <td>{selectedRoute.origin}</td>
                        <td>{selectedRoute.destination}</td>
                    </tr>
                })}
            </tbody>
        </table>
        
      
    
    
    
    </div>
}

export default Page;