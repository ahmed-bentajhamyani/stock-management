import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import LivraisonForm from './LivraisonForm';

function Livraison() {

    const [livraisons, setLivraisons] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);
    const [livraison, setLivraison] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:8080/livraisons")
            .then(res => res.json())
            .then(result => {
                setLivraisons(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/fournisseurs")
            .then(res => res.json())
            .then(result => {
                setFournisseurs(result);
            })
    }, [])

    const handleDelete = (numLiv) => {
        fetch(`http://localhost:8080/livraisons/${numLiv}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const tmp = [...livraisons]
        const newLivraisons = tmp.filter( livraison => {
            return livraison.numLiv != numLiv
        })
        setLivraisons(newLivraisons)
    }

    const handleUpdate = (numLiv) => {
        fetch(`http://localhost:8080/livraisons/${numLiv}`)
            .then(res => res.json())
            .then(result => {
                setLivraison(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    useEffect(() => {
        if (!modal) {
            setCreate(true)
        }
    })

    const livraisonFournisseur = (id) => {
        let nom = ''
        fournisseurs.map((fournisseur) => (
            fournisseur.codeFour === id ? nom = fournisseur.nomFour : null
        ))
        return nom;
    }

    return (
        <div className='mx-10 mt-8 p-6 w-full'>

            {/* ajouter un Livraison */}
            <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Nouveau Livraison</ModalHeader>
                <ModalBody>
                    <LivraisonForm livraisons={livraisons} setLivraisons={setLivraisons} closeModal={setModal} oldLivraison={livraison} setCreateModal={setCreate} createModal={create} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les livraisons</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={() => { setModal(!modal) }}><AddIcon /> Nouveau Livraison</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" className="py-3 px-6">Numero du Livraison</th>
                        <th scope="col" className="py-3 px-6">La date du livraison</th>
                        <th scope="col" className="py-3 px-6">Fournisseur</th>
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {livraisons.map((livraison) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={livraison.numLiv}>
                            <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{livraison.numLiv}</td>
                            <td className="py-4 px-6">{livraison.dateLiv.slice(0, 10)}</td>
                            <td className="py-4 px-6">{livraisonFournisseur(livraison.fournisseur.codeFour)}</td>
                            <td className="flex py-4 px-6 text-right">
                                {/* <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleUpdate(livraison.numLiv) }}>Modifier</button> */}
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(livraison.numLiv) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Livraison