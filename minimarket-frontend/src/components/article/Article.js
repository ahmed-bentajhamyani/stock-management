import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import ArticleForm from './ArticleForm';

function Article() {

    const [articles, setArticles] = useState([]);
    const [article, setArticle] = useState(Object);
    const [modal, setModal] = useState(false);
    const [create, setCreate] = useState(true);

    const handleDelete = (codeArt) => {
        fetch(`http://localhost:8080/articles/${codeArt}`, {
            method: "DELETE",
            headers: { "content-type": "application/json" }
        })

        const tmp = [...articles]
        const nArticles = tmp.filter(c => c.codeArt != codeArt)
        console.log(`apres ${nArticles}`)
        setArticles(nArticles)
    }

    const handleChange = (codeArt) => {
        fetch(`http://localhost:8080/articles/${codeArt}`)
            .then(res => res.json())
            .then(result => {
                setArticle(result);
            })
        setModal(!modal)
        setCreate(false)
    }

    useEffect(() => {
        fetch("http://localhost:8080/articles")
            .then(res => res.json())
            .then(result => {
                setArticles(result);
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
                <ModalHeader toggle={() => setModal(!modal)}>New</ModalHeader>
                <ModalBody>
                    <ArticleForm closeModal={setModal} oldArticle={article} setCreateModal={setCreate} createModal={create} articles={articles} setArticles={setArticles} />
                </ModalBody>
            </Modal>

            <div className='flex justify-between'>
                <h1 className='text-2xl'>Tout les articles</h1>
                <button className='bg-blue-600 px-3 py-1.5 rounded-lg text-white' onClick={() => { setModal(!modal) }}><AddIcon /> Nouveau Article</button>
            </div>

            <table className='table-auto mt-6 w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        {/* <th scope="col" className="py-3 px-6">Code</th> */}
                        <th scope="col" className="py-3 px-6">Nom</th>
                        <th scope="col" className="py-3 px-6">PU</th>
                        <th scope="col" className="py-3 px-6">Quantité</th>
                        <th scope="col" className="py-3 px-6">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={article.codeCli}>
                            {/* <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{article.codeArt}</td> */}
                            {/* <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">{article.codeArt}</td> */}
                            <td className="py-4 px-6">{article.nomArt}</td>
                            <td className="py-4 px-6">{article.pu}</td>
                            <td className="py-4 px-6">{article.qteStock}</td>
                            <td className="flex py-4 px-6 text-right">
                                <button className='bg-emerald-600 px-3 py-1.5 rounded-lg text-white col-span-4 mr-2' onClick={() => { handleChange(article.codeArt) }}>Modifier</button>
                                <button className='bg-red-600 px-3 py-1.5 rounded-lg text-white col-span-4' onClick={() => { handleDelete(article.codeArt) }}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Article