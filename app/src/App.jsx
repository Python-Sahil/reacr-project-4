import styled from "styled-components"
import React,{useState,useEffect} from "react";
import SearchResult from "./components/SearchResult/SearchResult";
export const DATA_BASE = "http://localhost:9000";

const App = () => {

  const[data,setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData,setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

 
  useEffect(()=>{
    const fetchFoodData = async () => {
    setLoading(true);
    try {
      const response = await fetch(DATA_BASE);

      const json = await response.json();
      
      setData(json);
      setFilteredData(json);
      setLoading(false);
    } catch (error) {
      setError("Unable to fetch data");
    }
  };
  fetchFoodData();
}, []
);

const searchFood = (e)=>{
  const searchValue = e.target.value;
  
 
  if(searchValue === ""){
    setFilteredData(null);
  }
  const filter = data?.filter((food)=> food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setFilteredData(filter);
};

  const filterFood = (type) =>{
    if(type === "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
    
  };
 const filterBtns = [
   {
     name: "All",
     type: "all",
   },
   {
     name: "Breakfast",
     type: "breakfast",
   },
   {
     name: "Lunch",
     type: "lunch",
   },
   {
     name: "Dinner",
     type: "dinner",
   },
   {
    name:"Snacks",
    type:"snacks",
   }
 ];
  if(error) return <div>{error}</div>

  if(loading) return <div>Loading....</div>
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo-image" />
          </div>
          <div className="input-box">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food..."
            />
          </div>
        </TopContainer>
        <FilterContainer>
          {
            filterBtns.map((value)=>(
              <Button isSelected = {selectedBtn === value.type} key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>
            ))
          }
        </FilterContainer>
      </Container>
      <SearchResult data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .input-box{
    input{
      background-color: transparent;
      border-radius: 5px;
      height: 40px;
      font-size:16px ;
      color:white;
      border: 1px solid red;
      padding:0 10px;

      &::placeholder{
        color:lightgrey;
      }
    }
  }

  @media(0<width<600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 40px;

`
export const Button = styled.button`
  background-color: ${({ isSelected }) => (isSelected ? "#f42424" : "#f24242")};
  outline:1px solid ${({ isSelected }) => (isSelected ? "white" : "#f24242")};
  border-radius: 5px;
  padding: 6px 12px;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #f42424;
  }
`;

