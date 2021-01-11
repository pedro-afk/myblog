import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import iconTrash from '../../assets/trash.png';
import './styles.css';

export default function Profile(){
    const [posts, setPosts] = useState([]);
    const name = localStorage.getItem('user');
    const history = useHistory();
    useEffect(()=>{
        async function listPosts(){
            const user_id = localStorage.getItem('userId');
            const response = await api.get('/profile', {
                headers:{
                    user_id
                }
            });
            setPosts(response.data);
        }
        listPosts();
    }, []);

    async function deletePost(id){
        const user_id = localStorage.getItem('userId');
        const token = localStorage.getItem('userToken');
        try{
            await api.delete(`deletepost/${id}`, {
               headers:{
                   user_id,
                   Authorization: `Bearer ${token}`
               } 
            });
            setPosts(posts.filter(post => post.id !== id));
        } catch(err){
            alert('Erro ao deletar o post!');
        }
    }

    async function logoutDash(e){
        e.preventDefault();
        localStorage.clear();
        history.push('/');
    }
    return(
        <>  
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">    
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/dashboard">Home <span className="sr-only">(Página atual)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/newpost">Postar</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" onClick={logoutDash}>Sair</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"><h4 className="mt-auto">Seja bem-vindo {name}</h4></div>
                    <div className="col-md-4">
                    
                    <h4 className="mt-5 mb-3">Seus posts</h4>
                    {posts.map(post => (
                        <div key={post.id} className="mt-4">
                            <p>{post.content}</p>
                            <img className="img w-100" src={post.thumbnail_url} alt="img"/>
                            <p className="mt-2">{post.description}</p>
                            <button 
                                className="trash"
                                onClick={() => deletePost(post.id)}
                            >
                                <img src={iconTrash} alt="trash"/>
                            </button>
                            <hr></hr>
                        </div>
                    ))}
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    );
}