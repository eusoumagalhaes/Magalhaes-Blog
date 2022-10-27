import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../Components/Context/AuthContext'
import { useInsertDocument } from '../../Hooks/useInsertDocument'

const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  const {user} = useAuthValue()


  const {insertDocument, response } = useInsertDocument("posts")

  const navigate = useNavigate()

  const handleSubmit =(e)=> {
    e.preventDefault();
    setFormError("")
  

  try {
    new URL(image);
  } catch (error) {
    setFormError("A imagem deve ser uma URL !")
  }
  
  const tagsArray = tags.split(",").map((tag)=> tag.trim().toLowerCase())

  if(!title || !image || !tags || !body) {
    setFormError("Por favor, preencha todos os campos!")
  }

  if(formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate("/")

  }

  return (
    <div className={styles.create_post}>
       <h2>Criar Post</h2> 
       <p>O que está na sua cabeça ? escreva !</p>
       <form onSubmit={handleSubmit}>
        <label>
          <span>Título: </span>
          <input 
             type="text" 
             name='title' 
             required 
             placeholder='Insira um título...'
             onChange={(e)=> setTitle(e.target.value)}
             value={title}
          />
        </label>
        <label>
          <span>URL da imagem: </span>
          <input 
             type="text" 
             name='image' 
             required 
             placeholder='Insira uma imagem no seu post.'
             onChange={(e)=> setImage(e.target.value)}
             value={image}
          />
        </label>
        <label>
          <span>Conteúdo: </span>
          <textarea 
             name='body' 
             required 
             placeholder='Insira o conteúdo do post' 
             onChange={(e)=> setBody(e.target.value)} 
             value={body}
          />
        </label>
        <label>
          <span>Tags: </span>
          <input 
             type="text" 
             name='tags' 
             required 
             placeholder='Insira as tags separadas por vírgula.'
             onChange={(e)=> setTags(e.target.value)}
             value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Inserir Post</button>}
            {response.loading &&
             (<button className="btn" disabled>
              Aguarde...
              </button>)}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
       </form>
    </div>
  )
}

export default CreatePost