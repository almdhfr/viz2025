// --------------------------------------------------
// TODO 2.2 – Bubbles
// --------------------------------------------------

// access number of dead and missing migrants
const sizeValue = d => d['Total Dead and Missing'];

// maximum radius for a bubble (in pixels)
const maxRadius = 15;

// We re-use the same projection that was defined for the map
// in static_content.js: const projection = d3.geoNaturalEarth1();

const Bubbles = ({ data }) => {
    // scale: area of circle ~ sizeValue, so use sqrt scale for radius
    const sizeScale = d3.scaleSqrt()
        .domain([0, d3.max(data, sizeValue)])
        .range([0, maxRadius]);

    return (
        <g className="bubbleMarks">
            {data.map((d, i) => {
                // project [lon, lat] -> [x, y]
                const [x, y] = projection(d.coords);
                const r = sizeScale(sizeValue(d));

                return (
                    <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r={r}
                    />
                );
            })}
        </g>
    );
};
