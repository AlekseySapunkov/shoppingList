import ItemCost from "./ItemCost";
import "./costs.css";
import Card from "../UI/Card";
import CostsFilter from "./CostsFilter";
import React, { useState } from "react";
const Costs = (props) => {
  const [selectedYear, setSelectedYear] = useState("2024");
  const yearChangeHandler = (year) => {
    setSelectedYear(year);
  };
  console.log(props.costs)
  console.log(props.costs.map((cost)=>cost.date.getUTCFullYear()))
  const filterProps= (props)=>{
   return  props.costs.filter((cost)=>cost.date.getUTCFullYear().toString()===selectedYear)}
  console.log(selectedYear)
  return (
    <div>
      <Card className="costs">
        <CostsFilter year={selectedYear} onChangeYear={yearChangeHandler} />
        {filterProps(props).length===0?<p>в массиве нет элементов</p>:
        filterProps(props).map((cost)=> 
        <ItemCost
         key={cost.id}
        date={cost.date}
          description={cost.description}
          price={cost.price}/>)}
        
      </Card>
    </div>
  );
};
export default Costs;
