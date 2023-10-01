import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import FournisseurForm from './FournisseurForm';

function Fournisseur() {

    const [fournisseurs, setFournisseurs] = useState([]);
    const [fournisseur, setFournisseur] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);

    const handleDelete = (codeFour) => {
        fetch(`http://localhost:8080/fournisseurs/${codeFour}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })

        const tmp = [...fournisseurs]
        const nFournisseurs = tmp.filter(c => c.codeFour != codeFour)
        setFournisseurs(nFournisseurs)
    }

    const handleChange = (codeFour) => {
        fetch(`http://localhost:8080/fournisseurs/${codeFour}`)
            .then(res => res.json())
            .then(result => {
                setFournisseur(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    useEffect(() => {
        fetch("http://localhost:8080/fournisseurs")
            .then(res => res.json())
            .then(result => {
                setFournisseurs(result);
            })
    }, [])

    useEffect(() => {
        if (!modal) {
            setCreate(true)
        }
    })

    return (
        <div className='mx-10 mt-8 p-6 w-full'>

            {/* ajouter un client */}
            <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Ajouter un fournisseur</ModalHeader>
                <ModalBody>
                    <FournisseurForm closeModal={setModal} oldFournisseur={fournisseur} setCreateModal={setCreate} createModal={create} fournisseurs={fournisseurs} setFournisseurs={setFournisseurs} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les fournisseurs</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={() => { setModal(!modal) }}><AddIcon /> Nouveau Fournisseur</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>

                        <th scope="col" className="py-3 px-6">Nom</th>
                        <th scope="col" className="py-3 px-6">Telephone</th>
                        <th scope="col" className="py-3 px-6">Ville</th>
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {fournisseurs.map((fournisseur) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={fournisseur.codeFour}>

                            <td className="py-4 px-6">{fournisseur.nomFour}</td>
                            <td className="py-4 px-6">{fournisseur.telFour}</td>
                            <td className="py-4 px-6">{fournisseur.villeFour}</td>
                            <td className="flex py-4 px-6 text-right">
                                <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleChange(fournisseur.codeFour) }}>Modifier</button>
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(fournisseur.codeFour) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Fournisseur