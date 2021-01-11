import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function Dashboard(){
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        async function listPosts(){
            const response = await api.get('/dashboard');
            setPosts(response.data);
        }
        listPosts();
    }, []);
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
                            <Link className="nav-link" to="/profile">Perfil</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                        <h1>Posts recentes</h1>
                        {posts.map(post => (
                            <div key={post.id} className="mt-5">
                                <h4>{post.user.first_name}</h4> 
                                <p>{post.content}</p>
                                <img className="img w-100" src={post.thumbnail_url} alt="img"/>
                                <p className="mt-2">{post.description}</p>
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