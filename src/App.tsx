import React, { useState, useEffect } from 'react';
import './App.css';
import data from './Utils/WineData';
import MeanCalculation from './Components/MeanCalculation';
import MedianCalculation from './Components/MedianCalculation';
import ModeCalculation from './Components/ModeCalculation';

type AlcoholGroupProps = {
  [alcoholClass: string]: (string | number)[];
};

function App() {

  const [alcohalClassses, setAlcohalClasses] = useState<number[]>([])
  const [alcohalData, setAlcohalData] = useState<AlcoholGroupProps>({});
  const [gammaValues, setGammaValues] = useState<(string | number)[]>([])


  useEffect(()=>{

    // Extract unique Alcohol classes
    const uniqueAlcoholClasses: number[] = Array.from(new Set(data.map(item => item.Alcohol)));
    setAlcohalClasses(uniqueAlcoholClasses);

    // Group together the Flavanoids value as per Alcohol classes
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

    // Function to Add Gamma property to the existing data
    addGammaProperty()
    
  }, [])

  const addGammaProperty = () => {
    const updatedData = data.map(item => {
      const ash = typeof item.Ash === "string" ? parseFloat(item.Ash) : item.Ash
      const gammaValue = (ash* item.Hue) / item.Magnesium
      return {...item, Gamma: gammaValue}
    })

    // Create an array of all values of Gamma Property
    const gammaValueArray = updatedData.map(item => item.Gamma.toFixed(3))
    setGammaValues(gammaValueArray)
  }

  // Reder Component for Mean Calculation (For Gamma Calculation, not passing anything in the parameter)
  const calculateMean = (alcohalClass?: number) => {   
    return <MeanCalculation data = {alcohalClass ? alcohalData[alcohalClass] : gammaValues}/>
  }

  // Reder Component for Median Calculation (For Gamma Calculation, not passing anything in the parameter)
  const calculateMedian = (alcohalClass?: number) => {   
    return <MedianCalculation data = {alcohalClass ? alcohalData[alcohalClass] : gammaValues}/>
  }

  // Reder Component for Meode Calculation (For Gamma Calculation, not passing anything in the parameter)
  const calculateMode = (alcohalClass?: number) => {   
    return <ModeCalculation data = {alcohalClass ? alcohalData[alcohalClass] : gammaValues}/>
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
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMean(item)}</React.Fragment>))}
              </tr>
              <tr>
                <td>Flavanoids Median</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMedian(item)}</React.Fragment>))}
              </tr>
              <tr>
                <td>Flavanoids Mode</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMode(item)}</React.Fragment>))}
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
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMean()}</React.Fragment>))}
              </tr>
              <tr>
                <td>Gamma Median</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMedian()}</React.Fragment>))}
              </tr>
              <tr>
                <td>Gamma Mode</td>
                {alcohalClassses.length &&  alcohalClassses.map((item, index) => (<React.Fragment key={index}>{calculateMode()}</React.Fragment>))}
              </tr>
            </tbody>
          </table>
        </div>
    </div>
  );
}

export default App;
