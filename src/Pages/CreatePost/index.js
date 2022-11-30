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
    setFormError("image must be an URL !")
  }
  
  const tagsArray = tags.split(",").map((tag)=> tag.trim().toLowerCase())

  if(!title || !image || !tags || !body) {
    setFormError("Please make sure all fields are filled in correctly.")
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
       <h2>Create Post</h2> 
       <p>What's on your mind ? Write it down !</p>
       <form onSubmit={handleSubmit}>
        <label>
          <span>Title: </span>
          <input 
             type="text" 
             name='title' 
             required 
             placeholder='Insert a title...'
             onChange={(e)=> setTitle(e.target.value)}
             value={title}
          />
        </label>
        <label>
          <span>Image URL: </span>
          <input 
             type="text" 
             name='image' 
             required 
             placeholder='Insert an image in your post.'
             onChange={(e)=> setImage(e.target.value)}
             value={image}
          />
        </label>
        <label>
          <span>Content: </span>
          <textarea 
             name='body' 
             required 
             placeholder='Speak up your mind ' 
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
             placeholder='Enter tags separated by a comma.'
             onChange={(e)=> setTags(e.target.value)}
             value={tags}
          />
        </label>

        {!response.loading && <button className="btn">Insert Post</button>}
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