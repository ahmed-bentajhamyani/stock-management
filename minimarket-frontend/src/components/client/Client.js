import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ClientForm from './ClientForm';

function Client() {

    const [clients, setClients] = useState([]);
    const [client, setClient] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);

    const handleDelete = (codeCli) => {
        fetch(`http://localhost:8080/clients/${codeCli}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const tmp = [...clients]
        const nClients = tmp.filter(c => c.codeCli != codeCli)
        console.log(`apres ${nClients}`)
        setClients(nClients)
    }

    const handleUpdate = (codeCli) => {
        fetch(`http://localhost:8080/clients/${codeCli}`)
            .then(res => res.json())
            .then(result => {
                setClient(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    const newClient = () => {
        setClient('')
        setModal(!modal)
    }

    useEffect(() => {
        fetch("http://localhost:8080/clients")
            .then(res => res.json())
            .then(result => {
                setClients(result);
            })
    }, [])

    return (
        <div className='mx-10 mt-8 p-6 w-full'>

            {/* ajouter un client */}
            <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>New</ModalHeader>
                <ModalBody>
                    <ClientForm clients={clients} setClients={setClients} closeModal={setModal} oldClient={client} setCreateModal={setCreate} createModal={create} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les clients</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={newClient}><AddIcon /> Nouveau Client</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" className="py-3 px-6">Nom</th>
                        <th scope="col" className="py-3 px-6">Prenom</th>
                        <th scope="col" className="py-3 px-6">Adresse</th>
                        <th scope="col" className="py-3 px-6">Telephone</th>
                        <th scope="col" className="py-3 px-6">Ville</th>
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr className='bg-white border-b hover:bg-gray-50' key={client.codeCli}>
                            {/* <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{client.codeCli}</td> */}
                            <td className="py-4 px-6">{client.nomCli}</td>
                            <td className="py-4 px-6">{client.preCli}</td>
                            <td className="py-4 px-6">{client.adrCli}</td>
                            <td className="py-4 px-6">{client.telCli}</td>
                            <td className="py-4 px-6">{client.villeCli}</td>
                            <td className="flex py-4 px-6 text-right">
                                <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleUpdate(client.codeCli) }}>Modifier</button>
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(client.codeCli) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Client