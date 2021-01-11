import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import logo from '../../assets/logo1.png';
import img from '../../assets/peoples.jpg';

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            const response = await api.post('/login', {
                email,
                password
            });
            const { token, user_id } = response.data;
            localStorage.setItem('userToken', token);
            localStorage.setItem('user', response.data.user.first_name);
            localStorage.setItem('userId', user_id);
            history.push('/dashboard');
        } catch {
            alert("Usuário não encontrado!");
        }
    }
    return(
        <header className="container">
            <div className="row">
                <div className="col-md-5">
                    <img src={logo} alt="logo"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="exampleInputEmail1" 
                                aria-describedby="emailHelp"
                                placeholder="seu email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                id="exampleInputPassword1"
                                placeholder="sua senha"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                            <button type="submit" className="btn btn-danger">Entrar</button>
                            <Link to="/new" className="link">Ainda não possui cadastro?</Link>
                    </form>
                </div>
                <div className="col-md-6">
                    <div className="card mb-3">
                        <img src={img} className="card-img-top" alt="newposts"/>
                            <div className="card-body">
                                <h5 className="card-title">Olá seja bem-vindo!</h5>
                                <p className="card-text">
                                    Essa ferramenta foi criada com o objetivo de que as pessoas compartilhem de suas experiências diárias, e seus melhores momentos.
                                </p>
                            </div>
                    </div>
                </div>
            </div>
        </header>
    );
}