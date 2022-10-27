import styles from './EditPost.module.css'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthValue } from '../../Components/Context/AuthContext'
import { useInsertDocument } from '../../Hooks/useInsertDocument'
import { useFetchDocument } from '../../Hooks/useFetchDocument'
import { useUpdateDocument } from '../../Hooks/useUpdateDocument'

const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if(post){
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)

        const textTags = post.tags.join(",")
        setTags(textTags)
    }
  },[post]) 

  const {user} = useAuthValue()


  const {updateDocument, response } = useUpdateDocument("posts")

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

    const data = {
        title,
        image,
        body,
        tags: tagsArray,
        uid: user.uid,
        createdBy: user.displayName
      }

    updateDocument(id, data)

    navigate("/dashboard")

  }           

  return (
    <div className={styles.edit_post}>
        {post && (
            <>
             <h2>Editar Post : {post.title}</h2> 
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
                <p className={styles.preview_title}>Preview da imagem atual:</p>
                <img 
                  className={styles.image_preview} 
                  src={post.image} 
                  alt={post.title} 
                />
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

                {!response.loading && <button className="btn">Editar</button>}
                    {response.loading &&
                    (<button className="btn" disabled>
                    Aguarde...
                    </button>)}
                    {response.error && <p className="error">{response.error}</p>}
                    {formError && <p className='error'>{formError}</p>}
            </form>
            </>
        )}
      
    </div>
  )
}

export default EditPost