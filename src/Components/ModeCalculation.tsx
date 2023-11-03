
type MedianTypeProps = {
  data: (string | number)[] 
}

const ModeCalculation = ({ data }: MedianTypeProps) => {
    
    const numericData = data
                        .map(value => typeof value === "string" ? parseFloat(value) : value)
                        .filter(value => !isNaN(value));

    const frequencyMap: { [key: number]: number } = {};

    let mode: (string | number)[] = [];

    let maxFrequency = 0;
  
    numericData.forEach(value => {
      if (frequencyMap[value]) {
        frequencyMap[value]++;
      } else {
        frequencyMap[value] = 1;
      }
  
      if (frequencyMap[value] > maxFrequency) {
        maxFrequency = frequencyMap[value];
       mode = [value];
      } else if (frequencyMap[value] === maxFrequency) {
        // If multiple values have the same highest frequency, store them as an array
        mode.push(value);
      }
    });
  
    const formattedMode = mode
                          .map(value => (typeof value === 'number' ? value.toFixed(3) : value.toString()))
                          .join(', ');

  return (
    <td>
      {formattedMode}
    </td>
  )
}

export default ModeCalculation
