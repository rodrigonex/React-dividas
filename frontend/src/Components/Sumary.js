import React, { useEffect, useState } from 'react';

import Todos from './Todos';

export default function Sumary(props) {

    const [ years, setYears ] = useState([]);
    const [ filteredYears, setFilteredYears ] = useState(2021);

    const [ saveClickMonth, setSaveClickMonth ] = useState(1);
    const [ convertFormatMonths ] = useState(['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']);
    
    const [filtered, setFiltered ] = useState([]);
    

    useEffect(() => {
        const { data } = props;
        
        function filter() {
            const dataMap = data.map((years, i) => {
                return({
                    year: years.year,
                    month: years.month,
                }) 
            })
        
            const filteredYears = dataMap.map((years, i) => {
                return years.year  
            }) 
            const filteredSemDupYears = filteredYears.filter((year, i) => {
                return filteredYears.indexOf(year) === i;
            })

            setYears(filteredSemDupYears.sort())

        }

        filter();

    },[props]);

    useEffect(() => {
        function filterList() {
  
            const filter = props.data.filter((f, i) => {
                // eslint-disable-next-line eqeqeq
                return f.year == filteredYears; 
            });
    
            setFiltered(filter);
        
        

            if(saveClickMonth !== undefined){
                const filterMonth = filter.filter((f, i) => {
                // eslint-disable-next-line eqeqeq
                    return f.month == parseInt(saveClickMonth) + 1;     
                }); 
                
                setFiltered(filterMonth);
            }
        }
        filterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[filteredYears, saveClickMonth]);


    function captureClickMonth(event){
        const { value} = event.target;

        setSaveClickMonth(parseInt(value));

    }

    function captureClickYear(event) {
        const { value} = event.target;

        setFilteredYears(value);
        

    }

    const rowButtonYears = years.map((row, index) => {
        return <button key={index} className="btn btn-primary ml-2" id={'btn-'+index} value={row} onClick={captureClickYear} >{row}</button> 
    });

    const rowButtonMonths = convertFormatMonths.map((row, index) => {
        return <button key={index} className="btn btn-primary ml-2 mt-2" id={'btn-'+index} value={index} onClick={captureClickMonth} >{row}</button> 
    })
    
    function alterarDivida(index) {
        const alter = filtered.map((r, i) => {
            if(i === index){
                let alter = {
                    ...r,
                    done: !r.done
                }
               return alter;
            }

            return r;
        });
        
        setFiltered(alter);  
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-2"></div> 
                <div className="col-md-8 mt-3"><h2 className="text-md-center">React Dívidas</h2></div>
                <div className="col-md-2"></div>  
            </div>

            <div className="row">
                <div className="col-md-2"></div> 
                <div className="col-md-8 mt-5 text-md-center">
                    {rowButtonYears}    
                </div>
                <div className="col-md-2"></div>  
            </div>

            <div className="row">
                <div className="col-md-1"></div> 
                <div className="col-md-10 mt-5 text-md-center">
                    {rowButtonMonths}    
                </div>
                <div className="col-md-1"></div>  
            </div>

            <div className="row">
                <div className="col-md-1"></div> 
                <div className="col-md-10 mt-5 text-md-center">
                    <span className="p-2" style={{background: "#ff6e6e", fontWeight: "bold", borderRadius: "3px"}}>Contas a Pagar</span> 
                    <span className="ml-2 p-2" style={{background: "#a8ed98", fontWeight: "bold", borderRadius: "3px"}}>Contas já Pagar</span> 
                </div>
                <div className="col-md-1"></div>  
            </div>

            <div className="row">
                <div className="col-md-1"></div> 
                <div className="col-md-10 mt-5">
                    <Todos data={filtered} alterarDivida={alterarDivida}/>  
                </div>
                <div className="col-md-1"></div>  
            </div>
        </div>
    )
}
