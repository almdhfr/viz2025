// --------------------------------------------------
// TODO 2.2
// --------------------------------------------------

// Accessor function for the size value
const sizeValue = d => d['Total Dead and Missing'] || 0;

// Maximum radius of a bubble
const maxRadius = 15;

const Bubbles = ({ data }) => {
    //const width = 960;
    //const height = 500;
    // Define the projection here so this file is self-contained
    const projection = d3.geoNaturalEarth1();

    // Define the sizeScale using d3.scaleSqrt to map the sizeValue to bubble radius
    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, sizeValue)]) // 0 .. max number of dead/missing
        .range([0, maxRadius]);               // 0 .. maxRadius pixels

    // Return the bubbles SVG definition
    return (
        <g className="bubbleMarks">
            {data.map((d, i) => {
                // coords were created in data_loading.js as d.coords = [lon, lat]
                if (!d.coords || d.coords.length !== 2) return null;

                const [lon, lat] = d.coords;
                if (!isFinite(lon) || !isFinite(lat)) return null;

                const [x, y] = projection(d.coords);

                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={sizeScale(sizeValue(d))}
                        className="bubble"
                        // optional inline styling; or use CSS
                        // fill="rgba(255,0,0,0.5)"
                        // stroke="red"
                        // strokeWidth={1}
                    />
                );
            })}
        </g>
    );
};
