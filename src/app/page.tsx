'use client'
import { toast } from "react-hot-toast";
import axios from 'axios'

export default function Home() {


  //Submit function
  function onSubmitting(e:React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e.target)
    
    let name='bob'
    let age=1
    axios
      .post(`./api/stores/1`, {
        name: name,
        age:age,
        owner:'1'
      })
      .then(function (response) {
        console.log(response)
        toast.success(response.data);
        return;
      })
      .catch(function (error) {
        toast.error(error.response.data);
        console.log(error);
        return;
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">


      <div>

        <form onSubmit={(e)=>onSubmitting(e)}>

          <label htmlFor="name">Enter Name </label>
          <input type="text" name="name" id="name" />


          <label htmlFor="age"> Enter Age </label>
          <input type="text" name="age" id="age" />

          <input type="submit" value="submit" />

        </form>
      </div>


    </main>
  );
}
