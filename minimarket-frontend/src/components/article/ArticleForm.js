import React, { useState, useEffect } from 'react'

function ArticleForm({ closeModal, setCreateModal, createModal, articles, setArticles, oldArticle }) {

    const [nomArt, setNomArt] = useState("")
    const [pu, setPu] = useState(0)
    const [qteStock, setQteStock] = useState(0)


    useEffect(() => {
        setNomArt(oldArticle.nomArt)
        setPu(oldArticle.pu)
        setQteStock(oldArticle.qteStock)
    }, [oldArticle])

    const champs = [
        { id: 1, label: 'Nom Article', type: 'text', name: 'nomArt', value: nomArt, placeholder: 'Entrez le nom du article', onChange: (e) => setNomArt(e.target.value) },
        { id: 2, label: 'prix unitaire  Article', type: 'number', name: 'pu', value: pu, placeholder: 'Entrez le prenom du client', onChange: (e) => setPu(e.target.value) },
        { id: 3, label: 'quantite stock  Article', type: 'number', name: 'qteStock', value: qteStock, placeholder: "Entrez l'adreese du client", onChange: (e) => setQteStock(e.target.value) },
    ];

    const handleSave = (e) => {
        e.preventDefault()
        const article = { nomArt, pu, qteStock }
        console.log(`article a modifier est ${article.nomArt}`)
        fetch("http://localhost:8080/articles", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(article)
        }).then(() => {
            fetch("http://localhost:8080/articles")
                .then(res => res.json())
                .then(result => {
                    setArticles(result);
                })
        })
        closeModal(false)

    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const article = { nomArt, pu, qteStock }
        fetch(`http://localhost:8080/articles/${oldArticle.codeArt}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(article)
        }).then(() => {
            fetch("http://localhost:8080/articles")
                .then(res => res.json())
                .then(result => {
                    setArticles(result);
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
                        <input type={champ.type} name={champ.name} placeholder={champ.placeholder} onChange={champ.onChange} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
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

export default ArticleForm