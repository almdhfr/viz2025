// This is the central component which wires everything together and will be rendered to the root element that 
// is specified in the html section of this file.
const App = () => {

    const width = 960;
    const height = 500;
    const dateHistogramSize = 0.2;

    // TODO 4.1: Setup a state using React.useState similar to what we did for loading the data.

    // read world atlas data amd migrant data
    const worldAtlas = useWorldAtlas();
    const data = useData();
    if (!data || !worldAtlas) {
        return <div>Loading data...</div>;
    }
    // TODO 4.1: define an accessor function that will be used when filtering the data. The function
    // 			 should extract the reported date of the incident.

    // TODO 4.1: Setup the filtered data. The data is filtered based on the extent of the brush.
    // 			 Use .filter on the data to only include values that are within the brush extent.
    // 			 Make sure to handle the situation when the brush extent is not yet defined.

    return (
        <>
            <Introduction data={data} />

            <svg width={width} height={height}>
                <WorldGraticule />
                <Countries worldAtlas={worldAtlas} />


                // TODO 4.1: Pass the filtered data to bubbles
                <g transform={`translate(0, ${height - dateHistogramSize * height})`}>
                    // TODO 3.1: create a Histogram element and pass it the width and height
                    // TODO 4.1: Pass the setter function of the brush extent to Histogram
                </g>
            </svg>
        </>
    );

};

// place the visualization into the root element
ReactDOM.render(<App/>, document.getElementById("root"));