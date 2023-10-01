import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SocieteForm from './SocieteForm';

function Societe() {

    const [societes, setSocietes] = useState([]);
    const [fournisseurs, setFournisseurs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/societes")
            .then(res => res.json())
            .then(result => {
                setSocietes(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/fournisseurs")
            .then(res => res.json())
            .then(result => {
                setFournisseurs(result);
            })
    }, [])

    const [societe, setSociete] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);

    const handleDelete = (codeSte) => {
        fetch(`http://localhost:8080/societes/${codeSte}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })
        const tmp = [...societes]
        const newSocietes = tmp.filter(societe => {
            return societe.codeSte != codeSte
        })
        setSocietes(newSocietes)
    }

    const handleChange = (codeCli) => {
        fetch(`http://localhost:8080/societes/${codeCli}`)
            .then(res => res.json())
            .then(result => {
                setSociete(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    useEffect(() => {
        if (!modal) {
            setCreate(true)
        }
    })

    const newSociete = () => {
        setSociete('')
        setModal(!modal)
    }

    const societeFournisseur = (id) => {
        let nom = ''
        fournisseurs.map((fournisseur) => (
            fournisseur.codeFour === id ? nom = fournisseur.nomFour : null
        ))
        return nom;
    }

    return (
        <div className='mx-10 mt-8 p-6 w-full'>

            {/* ajouter un societe */}
            <Modal size='lg' isOpen={modal} toggle={() => setModal(!modal)}>
                <ModalHeader toggle={() => setModal(!modal)}>Nouveau Societe</ModalHeader>
                <ModalBody>
                    <SocieteForm societes={societes} setSocietes={setSocietes} closeModal={setModal} oldSociete={societe} setCreateModal={setCreate} createModal={create} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les societes</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={newSociete}><AddIcon /> Nouveau Societe</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                    <tr>
                        <th scope="col" className="py-3 px-6">Nom</th>
                        <th scope="col" className="py-3 px-6">Telephone</th>
                        <th scope="col" className="py-3 px-6">Fax</th>
                        <th scope="col" className="py-3 px-6">Ville</th>
                        <th scope="col" className="py-3 px-6">Fournisseur</th>
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {societes.map((societe) => (
                        <tr className='bg-white border-b hover:bg-gray-50' key={societe.codeSte}>
                            {/* <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{societe.codeSte}</td> */}
                            <td className="py-4 px-6">{societe.nomSte}</td>
                            <td className="py-4 px-6">{societe.telSte}</td>
                            <td className="py-4 px-6">{societe.faxSte}</td>
                            <td className="py-4 px-6">{societe.villeSte}</td>
                            <td className="py-4 px-6">{societeFournisseur(societe.fournisseur.codeFour)}</td>
                            <td className="flex py-4 px-6 text-right">
                                <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleChange(societe.codeSte) }}>Modifier</button>
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(societe.codeSte) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Societe