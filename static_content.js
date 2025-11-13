// --------------------------------------------------
// TODO 1.2 and 1.4
// --------------------------------------------------

// TODO 1.4: Accept the data by declaring a variable that will contain the data like this:
// const Introduction = ({your variable name here}) => {...}
const Introduction = ({ data }) => {

    // TODO 1.2: Declare a variable which contains your intro text by writing: const introText = "your text here";
    const count = data ? data.length : 0;
    const totalMissing = data ? d3.sum(data, d => d['Total Dead and Missing']) : 0;
    const introText = data
        ? ('This dataset contains ' + count + ' incidents with a total of ' + totalMissing +
           ' dead or missing. ')
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

const WorldGraticule = () => {

        {/* TODO 4.2: Memoization for sphere and graticules */}
        {/* TODO 1.5: add className worldGraticule to style with information from css to the g tag */}
                const width = 960;
                const height = 500;
                // Define a projection
                const projection = d3.geoNaturalEarth1().fitSize([width, height], { type: "Sphere" });

                // Define a path generator
                const path = d3.geoPath(projection);

                // Generate the longitude/latitude grid lines
                const graticule = d3.geoGraticule();


                // Simple plain objects — re-created each render (negligible cost here)
                const sphere = { type: "Sphere" };
                const graticuleLines = graticule();

                return (
                    <g className="worldGraticule">
                     {/* Sphere */}
                    <path className="sphere" d={path(sphere)} />
                    {/* Graticules */}
                    <path className="graticule" d={path(graticuleLines)} />
                </g>
  );
};




// --------------------------------------------------
// TODO 2.1 — Countries (land + interiors)
// --------------------------------------------------

// the data we work on is composed of land and interiors (use destructuring)
const Countries = ({ worldAtlas: { land, interiors } }) => {
  // A local projection/path so this component can render independently.
  // If you already have a shared projection/path, you can pass them down instead.

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
            />

            {/* Render country borders */}
            <path
                className="interiors"
                d={pathGenerator(interiors)}
            />
        </g>
        </svg>
    );
};

