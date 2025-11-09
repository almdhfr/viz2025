// Accessor function for the size value
const sizeValue = d => d['Total Dead and Missing'];

// Maximum radius of a bubble
const maxRadius = 15;

/*const projection = d3.geoNaturalEarth1()
        .scale(150) // Adjust scale
        .translate([800 / 2, 400 / 2]); // Adjust width/height
        */

const Bubbles = ({ data, projection/*, sizeValue, maxRadius*/ }) => {

    // Define the sizeScale using d3.scaleSqrt to map the sizeValue to bubble radius
    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, sizeValue)]) // Domain from 0 to the maximum value of sizeValue
        .range([0, maxRadius]); // Range from 0 to maxRadius

    // TODO 2.2: Return the bubbles SVG definition
    return (
        <g className="bubbleMarks">
            {data.map((d, i) => {
                const [x, y] = projection([d.longitude,d.latitude]); // Get projected coordinates
                /*const radius = sizeScale(sizeValue(d)); // Scale radius based on sizeValue*/

                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={sizeScale(sizeValue(d))}
                        fill="rgba(255, 0, 0, 0.5)" // Semi-transparent red
                        stroke="red"
                        strokeWidth={1}
                    />
                );
            })}
        </g>
    );
};