import React, { useState, useEffect } from 'react';
import './App.css';
import data from './Utils/WineData';

type AlcoholGroupProps = {
  [alcoholClass: string]: (string | number)[];
};

function App() {

  const [alcohalClassses, setAlcohalClasses] = useState<number[]>([])
  const [alcohalData, setAlcohalData] = useState<AlcoholGroupProps>({});

  useEffect(() => {
    // Extract unique alcohol classes
    const uniqueAlcoholClasses: number[] = Array.from(new Set(data.map(item => item.Alcohol)));
    setAlcohalClasses(uniqueAlcoholClasses);
    console.log(uniqueAlcoholClasses);
    
  }, []);


  useEffect(()=>{

    const groupedData: AlcoholGroupProps = {};

    data.forEach((item) => {
      const alcoholClass = item.Alcohol.toString();
      const flavanoidValue = item.Flavanoids.toString();

      if (!groupedData[alcoholClass]) {
        groupedData[alcoholClass] = [];
      }
      groupedData[alcoholClass].push(flavanoidValue);
    });

    setAlcohalData(groupedData);
    console.log(groupedData);
    
  }, [])
  
  return (
    <div className="App">
        <h1>FLAVANOIDS DATA</h1>
        <p>Mean - {}</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {alcohalClassses.map(classes => <th>Class {`${classes}`}</th>)}
              </tr>
            </thead>
          </table>
        </div>

    </div>
  );
}

export default App;
