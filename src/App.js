import { useEffect,useState } from 'react';
import './App.css';

function App() {

  const [listData,listDataFunc] = useState([])
  const[page,pageFunc] = useState(1)


  const getDataFromServer = async ()=>{
    const dataIs = await fetch(`https://dummyjson.com/products?limit=100`);
    const response = await dataIs.json()
    listDataFunc(response.products)
    
  }

  const listBtnFunc = (pageDetail)=>{
    pageFunc(pageDetail)
  }

  useEffect(()=>{
    getDataFromServer()
  },[])

 
  return (
    <div className="App">
      <h1>Product Details</h1>
      <ul className='unor-list'>
        {
          listData.slice(page*10-10,page*10).map((eachItem)=>
            <li className = "list-item" key = {eachItem.id}>
              <img src = {eachItem.thumbnail} alt = {eachItem.title}/>
              <p>{eachItem.title}</p>
            </li>
          )
        }
      </ul>
      <div className='pagination'>
        <span className={page===1?"btn-disable":'im-btn'} onClick = {() =>{listBtnFunc(page-1)}}>◀</span>
        <ul className='un-list'>
          {
            [...Array(listData.length/10)].map((_,i) => 
              <li className={page===i+1?'btn-list add-color':'btn-list'} onClick = {() =>{listBtnFunc(i+1)}} key = {i}>{i+1}</li>
            )
          }
          
        </ul>
        <span className={page===10?"btn-disable":'im-btn'} onClick = {() =>{listBtnFunc(page+1)}}>▶</span>
      </div>
    </div>
  );
}

export default App;
