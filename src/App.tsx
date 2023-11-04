import React, { useState, useEffect } from 'react';
import './App.css';
import data from './Utils/WineData';
import MeanCalculation from './Components/MeanCalculation';
import MedianCalculation from './Components/MedianCalculation';
import ModeCalculation from './Components/ModeCalculation';

type GroupProps = {
  [alcoholClass: string]: (string | number)[];
};

function App() {

  const [alcohalClassses, setAlcohalClasses] = useState<number[]>([])
  const [flavanoidData, setFlavanoidData] = useState<GroupProps>({});
  const [gammaData, setGammaData] = useState<GroupProps>({});

  useEffect(()=>{

    // Extract unique Alcohol classes
    const uniqueAlcoholClasses: number[] = Array.from(new Set(data.map(item => item.Alcohol)));
    setAlcohalClasses(uniqueAlcoholClasses);

    // Function to group together Flavanoids value as per Alcohol classes
    groupFlavanoidData()

    // Function to Add & group together Gamma property to the existing data
    groupGammaData()

  }, [])


  const groupFlavanoidData = () => {
    const groupedDataFlavanoid: GroupProps = {};
    data.forEach((item) => {
      const alcoholClass = item.Alcohol.toString();
      const flavanoidValue = item.Flavanoids.toString();

      if (!groupedDataFlavanoid[alcoholClass]) {
        groupedDataFlavanoid[alcoholClass] = [];
      }
      groupedDataFlavanoid[alcoholClass].push(flavanoidValue);
    });
    setFlavanoidData(groupedDataFlavanoid);
  }

  const groupGammaData = () => {
    const updatedData = data.map(item => {
      const ash = typeof item.Ash === "string" ? parseFloat(item.Ash) : item.Ash
      const gammaValue = (ash* item.Hue) / item.Magnesium
      return {...item, Gamma: gammaValue}
    })

   // Group together the Gamma value as per Alcohol classes
        const groupedDataGamma: GroupProps = {};
        updatedData.forEach((item) => {
          const alcoholClass = item.Alcohol.toString();
          const gammaValue = item.Gamma !== undefined ? item.Gamma.toString() : '';
    
          if (!groupedDataGamma[alcoholClass]) {
            groupedDataGamma[alcoholClass] = [];
          }
          groupedDataGamma[alcoholClass].push(gammaValue);
        });
        setGammaData(groupedDataGamma);
  }

  // Reder Component for Mean Calculation 
  const calculateMean = (alcohalClass: number,  type : string) => {  
    return <MeanCalculation data = {type ===  'flavanoid' ? flavanoidData[alcohalClass] : gammaData[alcohalClass]}/>
  }

  // Reder Component for Median Calculation 
  const calculateMedian =  (alcohalClass: number,  type : string) => {   
    return <MedianCalculation data = {type ===  'flavanoid' ? flavanoidData[alcohalClass] : gammaData[alcohalClass]}/>
  }

  // Reder Component for Mode Calculation 
  const calculateMode =  (alcohalClass: number,  type : string) => {   
    return <ModeCalculation data = {type ===  'flavanoid' ? flavanoidData[alcohalClass] : gammaData[alcohalClass]}/>
  }
  
  return (
    <div className="App">
        <h1>FLAVANOIDS DATA</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => <th key={index}>Class {`${item}`}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flavanoids Mean</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMean(item, 'flavanoid')}</React.Fragment>))}
              </tr>
              <tr>
                <td>Flavanoids Median</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMedian(item, 'flavanoid')}</React.Fragment>))}
              </tr>
              <tr>
                <td>Flavanoids Mode</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMode(item, 'flavanoid')}</React.Fragment>))}
              </tr>
            </tbody>
          </table>
        </div>
      <br/><br />
        <h1>Gamma DATA</h1>
        <div>
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {alcohalClassses.length && alcohalClassses.map((item, index) => <th key={index}>Class {`${item}`}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gamma Mean</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMean(item, 'gamma')}</React.Fragment>))}
              </tr>
              <tr>
                <td>Gamma Median</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMedian(item, 'gamma')}</React.Fragment>))}
              </tr>
              <tr>
                <td>Gamma Mode</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMode(item, 'gamma')}</React.Fragment>))}
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
