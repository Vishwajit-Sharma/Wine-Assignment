import React, { useState } from 'react'

type MeanTypeProps = {
  alcohalClass: number, 
  data: (string | number)[] 
}

const MeanCalculation = ({ alcohalClass, data }: MeanTypeProps) => {
    console.log("data mean- ", data);

    // const [mean, setMean] = useState<number>(0)

    let sum = 0;
    let count = 0;

  for (const value of data) {

    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    if (!isNaN(numericValue)) {
      sum += numericValue;
    }
  }

  const mean = data.length > 0 ? sum / data.length : 0;
    

  return (
    <td>
      {alcohalClass && alcohalClass}
    </td>
  )
}

export default MeanCalculation
