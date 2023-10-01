import React, { useEffect, useState } from 'react'

function FournisseurForm({ closeModal, oldFournisseur, setCreateModal, createModal, fournisseurs, setFournisseurs }) {

    const [nomFour, setNomFour] = useState('')
    const [telFour, setTelFour] = useState('')
    const [villeFour, setVilleFour] = useState('')

    useEffect(() => {
        setNomFour(oldFournisseur.nomFour)
        setTelFour(oldFournisseur.telFour)
        setVilleFour(oldFournisseur.villeFour)

    }, [oldFournisseur])

    const champs = [
        { id: 1, label: 'Nom du Fournisseur', type: 'text', name: 'nomFour', value: nomFour, placeholder: 'Entrez le nom du fournisseur', onChange: (e) => setNomFour(e.target.value) },
        { id: 2, label: 'Telephone du Fournisseur', type: 'text', name: 'telFour', value: telFour, placeholder: 'Entrez le Telephone du fournisseur', onChange: (e) => setTelFour(e.target.value) },
        { id: 3, label: 'Ville du Fournisseur', type: 'text', name: 'villeFour', value: villeFour, placeholder: "Entrez la Ville du fournisseur", onChange: (e) => setVilleFour(e.target.value) },
    ];

    const handleSave = (e) => {
        e.preventDefault()
        const fournisseur = { nomFour, telFour, villeFour }
        console.log(fournisseur)
        fetch("http://localhost:8080/fournisseurs", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(fournisseur)
        }).then(() => {
            fetch("http://localhost:8080/fournisseurs")
                .then(res => res.json())
                .then(result => {
                    setFournisseurs(result);
                })
        })
        closeModal(false)

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const fournisseur = { nomFour, telFour, villeFour }
        console.log(fournisseur)
        fetch(`http://localhost:8080/fournisseurs/${oldFournisseur.codeFour}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(fournisseur)
        }).then(() => {
            fetch("http://localhost:8080/fournisseurs")
                .then(res => res.json())
                .then(result => {
                    setFournisseurs(result);
                })
        })
        closeModal(false)
        setCreateModal(true)
    }

    return (
        <div className='flex flex-col'>
            {champs.map(champ => (
                <label className="flex flex-col mt-3" key={champ.id}>
                    <span className="text-base font-medium text-slate-700 col-span-2">{champ.label}</span>
                    {createModal ?
                        <input type={champ.type} name={champ.name} defaultValue="" placeholder={champ.placeholder} onChange={champ.onChange} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                        :
                        <input type={champ.type} name={champ.name} defaultValue={champ.value} placeholder={champ.placeholder} onChange={champ.onChange} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    }
                </label>
            ))}

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

export default FournisseurForm