const Introduction = ({ data }) => {
    // Declare a variable with intro text
    const introText = "Welcome to the Missing Migrants visualization tool.";

    // Data metrics example
    const dataMetrics = data
        ? `This dataset contains ${data.length} records, representing migrant incidents globally.`
        : "Loading data metrics...";

    return (
        <>
            {/* Title Section */}
            <div className="introTitle">
                Description
                <br />
            </div>

            {/* Intro Section */}
            <div className="intro">
                {introText}
                <br />
                {dataMetrics}
            </div>
        </>
    );
};


const WorldGraticule = () => {
    const width = 960;
    const height = 500;
    // Define a projection
    const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: "Sphere" });

    // Define a path generator
    const path = d3.geoPath(projection);

    // Generate the longitude/latitude grid lines
    const graticule = d3.geoGraticule();

    // Memoize sphere and graticules for better performance
    const sphere = React.useMemo(() => ({ type: "Sphere" }), []);
    const graticuleLines = React.useMemo(() => graticule(), [graticule]);

    return (
        <g className="worldGraticule">
            {/* Sphere */}
            <path d={path(sphere)} fill={"lightblue"}/>

            {/* Graticules */}
            <path d={path(graticuleLines)} fill="none" stroke={"#ececec"}/>
        </g>
    );
};

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


