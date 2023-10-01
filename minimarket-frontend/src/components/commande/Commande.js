import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import CommandeForm from './CommandeForm';

function Commande() {

    const [commandes, setCommandes] = useState([]);
    const [clients, setClients] = useState([]);
    const [ligneCmds, setLigneCmds] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/commandes")
            .then(res => res.json())
            .then(result => {
                setCommandes(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/clients")
            .then(res => res.json())
            .then(result => {
                setClients(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/lignecmd")
            .then(res => res.json())
            .then(result => {
                setLigneCmds(result);
            })
    }, [])

    const [commande, setCommande] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);

    const handleDelete = (numCmd) => {
        fetch(`http://localhost:8080/commandes/${numCmd}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const tmp = [...commandes]
        const newCommandes = tmp.filter(commande => {
            return commande.numCmd != numCmd
        })
        setCommandes(newCommandes)
    }

    const handleUpdate = (numCmd) => {
        fetch(`http://localhost:8080/commandes/${numCmd}`)
            .then(res => res.json())
            .then(result => {
                setCommande(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    useEffect(() => {
        if (!modal) {
            setCreate(true)
        }
    })

    const newCommande = () => {
        setCommande('')
        setModal(!modal)
    }

    const qteCmd = (numCmd) => {
        let qte = 0
        ligneCmds.map((ligneCmd) => (
            ligneCmd.commande.numCmd === numCmd ? qte = qte + ligneCmd.qteCmd : null
        ))
        return qte;
    }

    const commandeClient = (id) => {
        let nom = ''
        clients.map((client) => (
            client.codeCli === id ? nom = client.nomCli : null
        ))
        return nom;
    }

    return (
        <div className='mx-10 mt-8 p-6 w-full'>

            {/* ajouter un commande */}
            <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Nouveau Commande</ModalHeader>
                <ModalBody>
                    <CommandeForm commandes={commandes} setCommandes={setCommandes} closeModal={setModal} oldCommande={commande} setCreateModal={setCreate} createModal={create} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les commandes</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={newCommande}><AddIcon /> Nouveau Commande</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" className="py-3 px-6">Numero</th>
                        <th scope="col" className="py-3 px-6">La date</th>
                        <th scope="col" className="py-3 px-6">Client</th>
                        {/* <th scope="col" className="py-3 px-6">Quantité</th> */}
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {commandes.map((commande) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={commande.numCmd}>
                            <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{commande.numCmd}</td>
                            <td className="py-4 px-6">{commande.dateCmd.slice(0, 10)}</td>
                            <td className="py-4 px-6">{commandeClient(commande.client.codeCli)}</td>
                            {/* <td className="py-4 px-6">{qteCmd(commande.numCmd)}</td> */}
                            <td className="flex py-4 px-6 text-right">
                                {/* <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleUpdate(commande.numCmd) }}>Modifier</button> */}
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(commande.numCmd) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Commande