// the URL where the world atlas data is downloaded from
const jsonUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

// place data reading logic in a hook (hooks start with 'use')
const useWorldAtlas = () => {
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        d3.json(jsonUrl).then(topology => {
            const { countries, land } = topology.objects;
            setData({
                land: topojson.feature(topology, land),
                interiors: topojson.mesh(topology, countries, (a, b) => a !== b)
            });
        });
    }, []);
    return data;
};

// the URL where the missing migrants data is downloaded from
const csvUrl = 'https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv';

// --------------------------------------------------
// TODO 1.3 (Data Loading)
// --------------------------------------------------

const row = d => {
    // TODO 1.3: Read the 'Location Coordinates' and split them by the ',' separator, map each value from a string to a number, and then reverse the order. store the result in d.coords
    d.coords = d['Location Coordinates'].split(',').map(s => +s.trim()).reverse();
    // TODO 1.3: Uncomment and Modify the following line to convert the string to a number
    d['Total Dead and Missing'] = +d['Total Dead and Missing'];
    // TODO 1.3:  Uncomment and Modify the following line to convert the string to a number (hint: you can use new Date() for that)
    d['Reported Date'] = new Date(d['Reported Date']);
    return d;
};

const useData = () => {
    // TODO 1.3: create a state that is initially null
    const [data, setData] = React.useState(null);
    
    // useEffect ensures that the data is only loaded once. if it was loaded before the function
    // is not executed again
    React.useEffect(() => {
        // TODO 1.3: read data, and when finished then invoke setData. Since we are working with csv data we are using d3.csv(csvUrl, rowAccessory). The
        // TODO 1.3: row accessor will be the row function we defined above.
        d3.csv(csvUrl, row).then(setData);
    },[]);
    // TODO 1.3: return the data
    return data;
};
