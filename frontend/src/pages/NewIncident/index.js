import React, {
    useState
} from 'react'
import {
    Link,
    useHistory
} from 'react-router-dom'
import {
    FiArrowLeft
} from 'react-icons/fi'
import './styles.css'
import logo from '../../assets/logo.jpg'
import api from '../../services/api'


export default function NewIncident() {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const history = useHistory()
    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: localStorage.ongId
                }
            })

            history.push('/profile')

        } catch (error) {
            alert('Erro ao cadastrar')
        }
    }
    
    return (
        <div className='new-incident-container'>
            
        <div className='content'>
            <section>
                <img src={logo} alt='logo' />

                <h1> Cadastrar novo caso</h1>
                <p>Descreva o novo caso detalhadamente</p>

                <Link className='back-link' to='/profile'> <FiArrowLeft size={16} color='#E02041' />Voltar para home</Link>
            </section>

            <form onSubmit={handleNewIncident}>
                <input 
                    placeholder='Título do caso' 
                    value={title}
                    onChange={e => setTitle(e.target.value)}/>
                <textarea  
                    placeholder=' Descrição' 
                    value={description}
                    onChange={e => setDescription(e.target.value)}/>
                <input 
                    placeholder='Valor em reais' 
                value={value}
                onChange={e => setValue(e.target.value)} />

                <button type='submit' className='button'>Cadastrar</button>
            </form>
            </div>
        </div>
    )
}