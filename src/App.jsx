import axios from "axios";
import { useState } from "react"
import ClipLoader from "react-spinners/ClipLoader";

const App= () => {

   const [data,setData]= useState([]);
   const [loading,setLoading]= useState(false); 
   const [Suggestion,setSuggestion] = useState([]);
   const onchangeHandle=(e)=> {
     setData(items=> ({...items,[e.target.name]: e.target.value}))
   } 

  const onclickHnadler= async(e)=> {
       e.preventDefault()
       console.log(data)
       setLoading(true)
       const prompt=`Suggest some books and movies for someone feeling ${data.mood}
       who enjoys the ${data.category} genre , and whose favourite books/ movie is ${data.favourite}`
       const payload= {
        "model": "tinyllama",
        "prompt": prompt,
        "stream": false
      }
     await axios.post("http://localhost:11434/api/generate",payload).then((res)=> {
      console.log(res.data.response)
      let booklist=res.data.response.split("\n").filter(item=>item!="").map(item=> item.trim())
      console.log(booklist)
      setSuggestion(booklist)
      setLoading(false)
     }).catch(err=> console.log(err)) 
  }

  return(
    <>
   <h3 className='mt-[20px] text-center text-4xl font-bold text-pink'>
        AI Book/Movie Suggestion
      </h3>
      <div className='w-full h-screen flex justify-center mt-[20px]'>
        <div className='flex flex-col gap-5 mx-7'>
          <div className='flex gap-5 justify-center'>
            <div className='flex flex-col'>
              <label>Mood</label>
              <select name="mood"
                 onChange={onchangeHandle}
                className='bg-white outline-none border-none w-[255px] h-[30px] rounded-md'>
                <option value="calm">Calm</option>
                <option value="happy">Happy</option>
                <option value="cozy">Cozy</option>
                <option value="energetic">Energetic</option>
                <option value="playful">Playful</option>
                <option value="romantic">Romantic</option>
                <option value="sad">Sad</option>
              </select>
            </div>
            <div className='flex flex-col'>
              <label>Category</label>
              <select name="category"
              onChange={onchangeHandle}
                className='bg-white outline-none border-none w-[255px] h-[30px] rounded-md'>
               <option value="Romance">Romance</option>
          <option value="Adventure">Adventure</option>
          <option value="fantasy">Fantasy</option>
          <option value="thriller">Thriller</option>
          <option value="comedy">Comedy</option>
          <option value="romantic">Romantic</option>
          <option value="drama">Drama</option>
        </select>
      </div>
      <div className='flex flex-col'>
        <label>Favourite</label>
        <input type="text" name='favourite'
        onChange={onchangeHandle}
        className='bg-white outline-none border-none w-[255px] h-[30px] rounded-md px-2'/>
      </div>
  </div>
      <div className='text-center'>
        <button className='bg-gray-100 w-[150px] p-[5px] rounded-md cursor-pointer font-semibold'
        onClick={onclickHnadler}>
          Suggest
        </button>
      </div>

      <div className='w-[900px] h-[450px] text-md text-white overflow-auto p-5 bg-[#51865d]'>
        {Suggestion.map(item=><div className="text-md my-2 border-b-2 mb-5">{item}</div>)}
        <div className='h-full flex justify-center items-center'>
        <ClipLoader
        color="#ffffff"
        loading={loading}
        size={20}
      />
      </div>
      </div>
    </div>
      </div>
    </>
  )
}
export default App