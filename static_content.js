// --------------------------------------------------
// TODO 1.2 and 1.4
// --------------------------------------------------

// TODO 1.4: Accept the data by declaring a variable that will contain the data like this: 
// const Introduction = ({your variable name here}) => {...}
const Introduction = ({ data }) => {

    // TODO 1.2: Declare a variable which contains your intro text by writing: const introText = "your text here";
    const count = data ? data.length : 0;
    const totalMissing = data ? d3.sum(data, d => d['Total Dead and Missing']) : 0;
    const dateExtent = data ? d3.extent(data, d => d['Reported Date']) : [null, null];
    const fmtDate = d3.timeFormat('%b %d, %Y');
    const introText = data
        ? ('This dataset contains ' + count + ' incidents with a total of ' + totalMissing + 
           ' dead or missing. Reporting dates range from ' + (dateExtent[0] ? fmtDate(dateExtent[0]) : 'N/A') + 
           ' to ' + (dateExtent[1] ? fmtDate(dateExtent[1]) : 'N/A') + '.')
        : 'Loading dataset metrics…';

    // This returns the html elements which should be created by this component. A react fragment is required because
    // multiple elements are used.
    return (
        <>
            <div className="introTitle">Description<br/></div>
            <div className="intro">{introText}</div>
        </>
    )
};

// --------------------------------------------------
// TODO 1.5 (World Sphere and Graticule)
// --------------------------------------------------

const WorldGraticule = () => (
    // TODO 4.2: Memoization for sphere and graticules
    // TODO 1.5: add className worldGraticule to style with information from css to the g tag
    <g className="worldGraticule">
        <>
            {(() => {
                const projection = d3.geoNaturalEarth1();
                const path = d3.geoPath(projection);
                const graticule = d3.geoGraticule();
                return (
                    <>
                        <path className="sphere" d={path({ type: 'Sphere' })} />
                        <path className="graticules" d={path(graticule())} />
                    </>
                );
            })()}
        </>
    </g>
);

const Countries = ({ worldAtlas: { land, interiors } }) => {
    const width = 960;
    const height = 500;

    const projection = d3.geoNaturalEarth1()
        .scale(150) // Adjust scale
        .translate([width / 2, height / 2]); // Center in viewport

    const pathGenerator = d3.geoPath().projection(projection);

    return (
        <svg width={width} height={height}>
        <g className="countries">
            {/* Render land masses */}
            <path
                className="land"
                d={pathGenerator(land)}
                style={{ fill: 'lightgray', stroke: 'none' }}
            />

            {/* Render country borders */}
            <path
                className="interiors"
                d={pathGenerator(interiors)}
                style={{ fill: 'none', stroke: 'white', strokeWidth: 0.5 }}
            />
        </g>
        </svg>
    );
};


