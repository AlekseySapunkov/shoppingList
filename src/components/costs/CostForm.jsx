import Button from "./Button";
import "./CostForm.css"
import React, {useState} from "react";
import postApi from "../../services/PostApi";
import putApi from "../../services/PutApi";

const CostForm = (props) => {
    const id = props.id
    const [description, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [formVisible, setFormVisible] = useState(props.CostFormValue)
    const [isInputValid, setInputValid] = useState(true)
    const nameChangeHandler =(event)=>{
        setName(event.target.value)
    };
    const amountChangeHandler =(event)=>{
        setAmount(event.target.value)
    };
    const dateChangeHandler =(event)=>{
        setDate(event.target.value)
    };
    const apiData = {
        item_name:description,
        date,
        price:amount
    }
    const submitHandler = async (event)=>{
        event.preventDefault();
        try{
            const apiResponse = await postApi(apiData);
            console.log(apiResponse)
        }catch(err){
            console.error(error);
        }
        const costData = {
            description:description,
            date: new Date(date),
            price:amount,
        }
        console.log(costData);
        if(event.target.value > 0){
            setInputValid(true)
        }
        if(description.trim().length === 0 || amount===0){
            setInputValid(false)
            alert('поле название не заполнено ')
            return
        } else if(amount.length===0){
            alert('не указана цена товара!')
            setInputValid(false)
            return
        }
        props.onSaveCost(costData);
        setName('');
        setDate('');
        setAmount('');
    }
    const onClickCancelHandler =()=>{
        setFormVisible(false)
        console.log(props)
        props.onSaveCost()
        console.log(formVisible)
    }
    const onClickChangeHandler = async() =>{
        const response = await putApi(id, putDate)
    }
  
    return <form onSubmit={submitHandler}>
         <div className="new-cost__controls">
         <div className="new-cost__control">
                <label>Название</label>
                <input type="text" onChange={nameChangeHandler} value={description} style={{borderBlockColor: isInputValid ? "black":"red"}}/>
            </div>
            <div className="new-cost__control">
            <label>Сумма</label>
                <input type="number" min="0.01" step="0.01" onChange={amountChangeHandler} value={amount} style={{borderBlockColor: isInputValid ? "black":"red"}}/>
            </div>
            <div className="new-cost__control">
            <label>Дата</label>
                <input type="date" min="0.01" step="0.01" onChange={dateChangeHandler} value={date}/>
            </div>
            <div className="new-cost__actions"> 
<Button type ="submit">Добавить расход</Button>
<Button type ="submit" onClick={onClickChangeHandler}>Внести изменения</Button>
<Button type ="button" onClick={onClickCancelHandler}>отмена</Button>
            </div>
            </div>
    </form>
    }
    export default CostForm