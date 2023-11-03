
type MeanTypeProps = {
  data: (string | number)[] 
}

const MeanCalculation = ({ data }: MeanTypeProps) => {

  let sum = 0;

  data.forEach(value => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    if (!isNaN(numericValue)) {
      sum += numericValue;
    }
  })

  const mean = data.length > 0 ? (sum / data.length).toFixed(3) : "0.000"; 
    
  return (
    <td>
      {mean}
    </td>
  )
}

export default MeanCalculation
