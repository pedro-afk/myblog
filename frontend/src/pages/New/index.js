import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';
import logo from '../../assets/logo1.png';

export default function New(){
    const [first_name,setfirstName] = useState('');
    const [last_name,setlastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPass] = useState('');
    const history = useHistory();
    
    async function handleSubmit(e){
        e.preventDefault();
        try{
            await api.post('/register',{
                first_name,
                last_name,
                email,
                password    
            });
            alert('Usuario cadastrado com sucesso');
            history.push('/');
        } catch(error) {
            alert(`Erro ao cadastrar usuário ${error}`);
        };
    }
    return(
        <header className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 mt-5">
                    <img src={logo} alt="logo"/>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <div className="form-row">
                                <div className="col">
                                    <label>Nome</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="seu nome"
                                        value={first_name}
                                        onChange={e => setfirstName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label>Sobrenome</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="seu sobrenome"
                                        value={last_name}
                                        onChange={e => setlastName(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Endereço de email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="example@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Senha</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="sua senha"
                                value={password}
                                onChange={e => setPass(e.target.value)}
                                required
                            />
                        </div>
                            <button type="submit" className="btn btn-danger">Cadastrar</button>
                            <Link to="/" className="link">Já tenho cadastro nesse site.</Link>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </header>
    );
}