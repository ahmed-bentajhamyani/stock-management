import React, { useEffect, useState } from 'react'

function ClientForm({ clients, setClients, closeModal, oldClient, setCreateModal, createModal }) {

    const [nomCli, setNomCli] = useState('')
    const [preCli, setPreCli] = useState('')
    const [adrCli, setAdrCli] = useState('')
    const [telCli, setTelCli] = useState('')
    const [villeCli, setVilleCli] = useState('')

    useEffect(() => {
        setNomCli(oldClient.nomCli)
        setPreCli(oldClient.preCli)
        setAdrCli(oldClient.adrCli)
        setTelCli(oldClient.telCli)
        setVilleCli(oldClient.villeCli)
    }, [oldClient])

    const champs = [
        { id: 1, label: 'Nom du Client', type: 'text', name: 'nomCli', value: nomCli, placeholder: 'Entrez le nom du client', onChange: (e) => setNomCli(e.target.value) },
        { id: 2, label: 'Prenom du Client', type: 'text', name: 'preCli', value: preCli, placeholder: 'Entrez le prenom du client', onChange: (e) => setPreCli(e.target.value) },
        { id: 3, label: 'Adresse du Client', type: 'text', name: 'adrCli', value: adrCli, placeholder: "Entrez l'adreese du client", onChange: (e) => setAdrCli(e.target.value) },
        { id: 4, label: 'Tele du Client', type: 'text', name: 'telCli', value: telCli, placeholder: 'Entrez le tele du client', onChange: (e) => setTelCli(e.target.value) },
        { id: 5, label: 'Ville du Client', type: 'text', name: 'villeCli', value: villeCli, placeholder: 'Entrez la ville du client', onChange: (e) => setVilleCli(e.target.value) },
    ];

    const handleSave = (e) => {
        e.preventDefault()
        const client = { nomCli, preCli, adrCli, telCli, villeCli }
        fetch("http://localhost:8080/clients", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(client)
        }).then(() => {
            fetch("http://localhost:8080/clients")
                .then(res => res.json())
                .then(result => {
                    setClients(result);
                })
        })
        closeModal(false)

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const client = { nomCli, preCli, adrCli, telCli, villeCli }
        console.log(client)
        fetch(`http://localhost:8080/clients/${oldClient.codeCli}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(client)
        }).then(() => {
            fetch("http://localhost:8080/clients")
                .then(res => res.json())
                .then(result => {
                    setClients(result);
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
                    <input type={champ.type} name={champ.name} defaultValue={champ.value} placeholder={champ.placeholder} onChange={champ.onChange} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
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

export default ClientForm