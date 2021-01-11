import React,{useState,useMemo} from 'react';
import { useHistory, Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';

export default function NewPost(){
    const [content, setContent] = useState('');
    const [thumbnail, setThumbnail ] = useState(null);
    const [description, setDescription] = useState('');
    const [count, setCount] = useState(0);
    const [countd, setCountd] = useState(0);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail]
    )
    const history = useHistory();

    async function createPost(e){
        e.preventDefault();
        const data = new FormData();
        const token = localStorage.getItem('userToken');
        const user_id = localStorage.getItem('userId');
        data.append('content',content);
        data.append('description', description);
        data.append('thumbnail', thumbnail);
        await api.post('/post', data, {
            headers:{
                user_id,
                Authorization: `Bearer ${token}`
            }
        });
        history.push('/dashboard');
    }
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h1>Novo Post</h1>
                    <form onSubmit={createPost} className="mt-5">
                        <div className="form-group">
                            <label>Assunto</label>
                            <textarea  
                                className="form-control" 
                                placeholder="assunto"
                                value={content}
                                onKeyPress={() => setCount(count+1)}
                                onChange={e => setContent(e.target.value)}
                                maxLength="255"
                                required
                            />
                            <span>{count}/140</span>
                        </div>
                        <div className="form-group">
                        <label 
                            id="thumbnail" 
                            style={{ backgroundImage: `url(${preview})` }}
                            className={thumbnail ? 'has-thumbnail' : ''}
                        />
                            <input
                                type="file"
                                className="form-control"
                                onChange={e => setThumbnail(e.target.files[0])}
                            />
                        </div>
                        <div className="form-group">
                            <label>Descrição <span>(este campo não é obrigatório)</span></label>
                            <input
                                type="text"
                                className="form-control"
                                maxLength="70"
                                onKeyPress={() => setCountd(countd+1)}
                                onChange={e => setDescription(e.target.value)}
                            />
                            <span>{countd}/70</span>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-danger">Postar</button>
                            <Link to="/profile" className="btn btn-warning ml-2">Voltar</Link>
                        </div>
                    </form>
                </div>
                <div className="col-m-3"></div>
            </div>
        </div>
    );
}