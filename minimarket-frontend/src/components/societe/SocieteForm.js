import React, { useEffect, useState } from 'react'

function SocieteForm({ societes, setSocietes, closeModal, oldSociete, setCreateModal, createModal }) {

    const [fournisseurs, setFournisseurs] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/fournisseurs")
            .then(res => res.json())
            .then(result => {
                setFournisseurs(result);
            })
    }, [])

    const [nomSte, setNomSte] = useState('')
    const [faxSte, setFaxSte] = useState('')
    const [telSte, setTelSte] = useState('')
    const [villeSte, setVilleSte] = useState('')
    const [fournisseur, setFournisseur] = useState(Object)

    useEffect( () => {
        setFournisseur(fournisseurs[0])
    }, [fournisseurs])

    useEffect(() => {
        setNomSte(oldSociete.nomSte)
        setFaxSte(oldSociete.faxSte)
        setTelSte(oldSociete.telSte)
        setVilleSte(oldSociete.villeSte)
        setFournisseur(oldSociete.fournisseur)
    }, [oldSociete])

    const champs = [
        { id: 1, label: 'Nom du Societe', type: 'text', name: 'nomSte', value: nomSte, placeholder: 'Entrez le nom du Societe', onChange: (e) => setNomSte(e.target.value) },
        { id: 2, label: 'Fax du Societe', type: 'text', name: 'faxSte', value: faxSte, placeholder: "Entrez le fax du Societe", onChange: (e) => setFaxSte(e.target.value) },
        { id: 3, label: 'Tele du Societe', type: 'text', name: 'telSte', value: telSte, placeholder: 'Entrez le tele du Societe', onChange: (e) => setTelSte(e.target.value) },
        { id: 4, label: 'Ville du Societe', type: 'text', name: 'villeSte', value: villeSte, placeholder: 'Entrez la ville du Societe', onChange: (e) => setVilleSte(e.target.value) },
    ];

    const handleSave = (e) => {
        e.preventDefault()
        const societe = { nomSte, faxSte, telSte, villeSte, fournisseur }
        fetch("http://localhost:8080/societes", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(societe)
        }).then(() => {
            fetch("http://localhost:8080/societes")
                .then(res => res.json())
                .then(result => {
                    setSocietes(result);
                })
        })
        closeModal(false)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const societe = { nomSte, faxSte, telSte, villeSte, fournisseur }
        fetch(`http://localhost:8080/societes/${oldSociete.codeSte}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(societe)
        }).then(() => {
            fetch("http://localhost:8080/societes")
                .then(res => res.json())
                .then(result => {
                    setSocietes(result);
                })
        })
        closeModal(false)
        setCreateModal(true)
    }

    const handleChange = (e) => {
        setFournisseur(fournisseurs.find((fournisseur) => {
            return fournisseur.codeFour === parseInt(e.target.value);
        }))
    }

    return (
        <div className='flex flex-col'>
            {champs.map(champ => (
                <label className="flex flex-col mt-3" key={champ.id}>
                    <span className="text-base font-medium text-slate-700 col-span-2">{champ.label}</span>
                    <input type={champ.type} name={champ.name} defaultValue={champ.value} placeholder={champ.placeholder} onChange={champ.onChange} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                </label>
            ))}

            <label className="flex flex-col mt-3">
                <span className='text-base font-medium text-slate-700 col-span-2'>Selectionner le fournisseur</span>
                <select onClick={handleChange} className="mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                    {fournisseurs.map(fournisseur => (
                        <option key={fournisseur.codeFour} value={fournisseur.codeFour}>{fournisseur.nomFour}</option>
                    ))}
                </select>
            </label>

            <label className="flex flex-col mt-4">
                <span className="text-md font-medium text-slate-700"></span>
                {
                    createModal ?
                        <button onClick={handleSave} className='bg-blue-600 px-3 py-1.5 rounded-lg text-white col-span-4'>Enregistrer</button>
                        :
                        <button onClick={handleUpdate} className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4'>Modifier</button>
                }
            </label>

        </div>
    )
}

export default SocieteForm