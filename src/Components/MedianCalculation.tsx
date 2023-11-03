
type MedianTypeProps = {
  data: (string | number)[] 
}

const MedianCalculation = ({ data }: MedianTypeProps) => {

    const sortedData = data
                        .map(value => typeof value === "string" ? parseFloat(value) : value)
                        .sort((a, b) => a - b); // Sort the numeric values

  const dataLength = sortedData.length;

  let median: number | string = 'N/A';

  if (dataLength > 0) {

    if (dataLength % 2 === 0) {
      // If there is an even number of values, calculate the average of the two middle values
      const middle1 = sortedData[dataLength / 2 - 1];
      const middle2 = sortedData[dataLength / 2];
      median = ((middle1 + middle2) / 2).toFixed(3);
    } else {
      // If there is an odd number of values, the median is the middle value
      median = sortedData[Math.floor(dataLength / 2)].toFixed(3);
    }
  }   

  return (
    <td>
      {median}
    </td>
  )
}

export default MedianCalculation
