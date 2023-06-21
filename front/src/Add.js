import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useSelector } from 'react-redux';
import 'easymde/dist/easymde.min.css';
import { useNavigate, Navigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Heddd';


export const AddPost = () => {
  const {id} = useParams();
  const navigate = useNavigate();
  const [isloading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null ); 
  
   const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const file = event.target.files[0];
     const formData = new FormData();
     formData.append('image', file);
     const { data } = await axios.post('https://movie-scripts.onrender.com/upload', formData);
     setImageUrl(data.url);
     console.log(data);
    } 
    catch (err) {
     console.warn(err)
     alert('mistake on load file')
    }
};

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        genre,
        text,
        author
      }; 
    //   isEditing 
    //   ? await axios.patch(`/posts/${id}`, fields)
      const { data } = isEditing ? await axios.put(`https://movie-scripts.onrender.com/posts/${id}`, fields)
      :await axios.post('https://movie-scripts.onrender.com/posts/', fields);
      // const _id =  data._id;
      navigate(`/`);
    } 
    catch (err) {
    console.warn(err);
    alert('mistake on get arcticle');
    }
  }
  React.useEffect(() => {
    if (id) {
      axios.get(`https://movie-scripts.onrender.com/posts/${id}`).then(({data}) => {
        setTitle(data.title);
        setAuthor(data.author);
        setText(data.text);
        setImageUrl(data.imageUrl);
        setGenre(data.genre.join(','));
      }).catch(err => {
        console.warn(err);
        alert();
      })
    }
  }, []);  

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

//   if(!window.localStorage.getItem('token') && !isAuth) {
//     return <Navigate to={"/"} />;
//   }

  return ( <>
   
   <Header/>
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
        <img style={{maxWidth: "30%",marginBottom: "3rem"}} src={`https://movie-scripts.onrender.com${imageUrl}`} alt="Uploaded" />
        </>   
      )} 
      <br />
      <br />
      <TextField
      sx={{marginBottom: "1rem"}}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
      sx={{marginBottom: "1rem"}}
        variant="standard"
        placeholder="Author Name..."
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        fullWidth
      />
      <TextField
      sx={{marginBottom: "1rem"}}
      value={genre}
      onChange={(e) => setGenre(e.target.value)} 
       variant="standard" placeholder="Genres" fullWidth />
      <SimpleMDE  value={text} onChange={onChange} options={options} />
      <div >
        <Button onClick={onSubmit} size="large" variant="contained">
        {/* isEditing ? 'Saved' : */}
          {isEditing ? 'Saved' :'Опубликовать'}
        </Button>
        <Link href="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
   
   
   
   </>
    
  );
};