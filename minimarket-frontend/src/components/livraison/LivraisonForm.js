import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

function CommandeForm({ livraisons, setLivraisons, closeModal, oldLivraison, setCreateModal, createModal }) {

    const [fournisseurs, setFournisseurs] = useState([])
    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch("http://localhost:8080/fournisseurs")
            .then(res => res.json())
            .then(result => {
                setFournisseurs(result);
            })
    }, [])

    useEffect(() => {
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(result => {
                setArticles(result);
            })
    }, [])

    const [numLiv, setNumLiv] = useState(0)
    const [dateLiv, setDateLiv] = useState('')
    const [fournisseur, setFournisseur] = useState(Object)
    const [articleArray, setArticleArray] = useState([])

    useEffect(() => {
        setFournisseur(fournisseurs[0])
    }, [fournisseurs])

    useEffect(() => {
        setDateLiv(oldLivraison.dateLiv)
        setFournisseur(oldLivraison.fournisseur)
    }, [oldLivraison])

    const champs = [
        { id: 1, label: 'Num du Livraison', type: 'number', name: 'numLiv', value: numLiv, placeholder: 'Entrez le num du livraison', onChange: (e) => setNumLiv(e.target.value) },
        { id: 2, label: 'date du Livraison', type: 'date', name: 'dateLiv', value: dateLiv, placeholder: 'Entrez la date du livraison', onChange: (e) => setDateLiv(e.target.value) }
    ];

    const handleSave = (e) => {
        e.preventDefault()
        const livraison = { numLiv, dateLiv, fournisseur }
        console.log(livraison)
        fetch("http://localhost:8080/livraisons", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(livraison)
        }).then(() => {
            articleArray.map(articleArr => {
                const article = articleArr.article
                const qteLiv = articleArr.qteLiv
                const ligneLiv = { livraison, article, qteLiv }
                console.log(ligneLiv)
                fetch("http://localhost:8080/ligneliv", {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(ligneLiv)
                })
            })
        }).then(() => {
            fetch("http://localhost:8080/livraisons")
                .then(res => res.json())
                .then(result => {
                    setLivraisons(result);
                })
        })
        closeModal(false)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const livraison = { numLiv, dateLiv, fournisseur }
        console.log(livraison)
        fetch(`http://localhost:8080/livraisons/${oldLivraison.numLiv}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(livraison)
        }).then(() => {
            fetch("http://localhost:8080/livraisons")
                .then(res => res.json())
                .then(result => {
                    setLivraisons(result);
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

    const articleChange = (e, id) => {
        const newArticle = articleArray.map(articleArray => {
            if (articleArray.id === id) {
                return {
                    ...articleArray, article: articles.find((article) => {
                        return article.codeArt === parseInt(e.target.value);
                    })
                };
            }
            return articleArray;
        });
        setArticleArray(newArticle)
    }

    const qteChange = (e, id) => {
        console.log(e.target.value)
        const newArticle = articleArray.map(articleArray => {
            if (articleArray.id === id) {
                return {
                    ...articleArray, qteLiv: parseInt(e.target.value)
                };
            }
            return articleArray;
        });
        setArticleArray(newArticle)
    }

    const addAnotherArticle = () => {
        const tmp = [...articleArray]
        tmp.push({
            id: articleArray.length + 1,
            article: articles.find((article) => {
                return article.codeArt === 1;
            }),
            qteLiv: 0
        })
        setArticleArray(tmp)
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
                <select onChange={handleChange} className="mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                    {fournisseurs.map(fournisseur => (
                        <option key={fournisseur.codeFour} value={fournisseur.codeFour}>{fournisseur.nomFour}</option>
                    ))}
                </select>
            </label>

            <span className='text-base font-medium text-slate-700 col-span-2 mt-3'>Les articles dans la livraison</span>
            {articleArray.map(articleArray => (
                <label key={articleArray.id} className="flex flex-col mt-2">
                    <span className='text-sm font-medium text-slate-700 col-span-2'>Selectionner l'article</span>
                    <div className='grid grid-cols-8'>
                        <select defaultValue={1} onChange={(e) => articleChange(e, articleArray.id)} className="mt-1 mr-3 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
                            {articles.map(article => (
                                <option key={article.codeArt} value={article.codeArt}>{article.nomArt}</option>
                            ))}
                        </select>
                        <input type="number" name={articleArray.id} onChange={(e) => qteChange(e, articleArray.id)} className='mt-1 px-3 py-2 col-span-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 placeholder:text-base focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500' />
                    </div>
                </label>
            ))}

            <label className="flex flex-col mt-3">
                <button onClick={addAnotherArticle} className='px-3 py-1.5 rounded-lg border border-slate-700 text-slate-700 col-span-4'><AddIcon /></button>
            </label>


            <label className="flex flex-col mt-4">
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

export default CommandeForm