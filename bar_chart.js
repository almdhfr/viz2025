// --------------------------------------------------
// TODO 3.1 and 3.2
// --------------------------------------------------

// TODO 3.2: AxisLeft component
const AxisLeft = ({ yScale, innerWidth, tickOffset = 3 }) => (
  <>
    {yScale.ticks().map(tickValue => (
      // TODO 3.2: create a group element with class name tick
      <g
        className="tick"
        key={tickValue} // key will be the tick value
        // move the group to the right position
        transform={`translate(0, ${yScale(tickValue)})`}
      >
        {/* horizontal grid line */}
        <line x2={innerWidth} />
        {/* tick label slightly left of axis */}
        <text
          x={-tickOffset}
          dy="0.32em"
          style={{ textAnchor: "end" }} // align properly on the right
        >
          {tickValue}
        </text>
      </g>
    ))}
  </>
);

// TODO 3.2: bottom axis
const AxisBottom = ({
  xScale,
  innerHeight,
  tickOffset = 3,
  tickFormat = d => d
}) => (
  <>
    {xScale.ticks().map(tickValue => (
      <g
        className="tick"
        key={tickValue}
        transform={`translate(${xScale(tickValue)}, 0)`}
      >
        <line y2={innerHeight} />
        <text
          y={innerHeight + tickOffset}
          dy="0.71em"
          style={{ textAnchor: "middle" }} // centered textAnchor
        >
          {tickFormat(tickValue)}
        </text>
      </g>
    ))}
  </>
);

// TODO 3.2: Bars component
const Bars = ({ binnedData, xScale, yScale, innerHeight }) => (
  <>
    {binnedData.map((bin, i) => (
      <rect
        className="bar"                   // className bar
        key={i}                           // key is the index
        x={xScale(bin.x0)}                // beginning of bar on x-axis
        y={yScale(bin.y)}                 // top height of bar
        width={Math.max(0, xScale(bin.x1) - xScale(bin.x0))} // width = end - start
        height={innerHeight - yScale(bin.y)} // innerHeight minus bar height
      />
    ))}
  </>
);

// TODO 3.1: accessor for total number of dead and missing migrants
const yValue = d => d["Total Dead and Missing"];

// TODO 3.2: y axis label text
const yAxisLabel = "Total Dead and Missing";

// variables for the offset of the axis label
const yAxisLabelOffset = 30;
// margin (small gaps on the sides of the bar chart)
const margin = { top: 0, right: 30, bottom: 20, left: 45 };
// TODO 3.2: Define a time format using d3.timeFormat
const xAxisTickFormat = d3.timeFormat("%b %Y");

// TODO 4.1: brush extent setter as parameter
const Histogram = ({ width, height, data, setBrushExtent }) => {
  // Guard so we never crash if data is not there yet
  if (!data) {
    return null;
  }

  // TODO 3.1: compute innerHeight and innerWidth by subtracting the margins
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // TODO 3.1: accessor for date of incident
  const xValue = d => d["Reported Date"];

  // TODO 3.1: define the xScale using d3.scaleTime
  const xScale = React.useMemo(
    () =>
      d3
        .scaleTime()
        // domain from min to max value of data (d3.extent)
        .domain(d3.extent(data, xValue))
        // range from 0 to innerWidth
        .range([0, innerWidth])
        // nice numbers for labeling
        .nice(),
    // TODO 4.2: Memoization dependencies for scale
    [data, innerWidth]
  );

  // TODO 3.1: grab the start and end from the domain
  const [start, stop] = xScale.domain();

  // TODO 3.1: aggregate the data into bins
  const binnedData = React.useMemo(() => {
    const bin = d3
      .bin()
      .value(xValue)
      .domain([start, stop])
      .thresholds(30); // number of bins

    return bin(data).map(bin => ({
      x0: bin.x0,
      x1: bin.x1,
      y: d3.sum(bin, yValue) // sum of deaths per bin
    }));
  }, [data, start, stop]); // TODO 4.2: Memoization for the binned data

  // TODO 3.2: y scale based on binned data
  const yScale = React.useMemo(
    () =>
      d3
        .scaleLinear()
        // domain from 0 to maximum of binned data
        .domain([0, d3.max(binnedData, d => d.y) || 0])
        // range from innerHeight (bottom) to 0 (top)
        .range([innerHeight, 0])
        .nice(),
    [binnedData, innerHeight] // TODO 4.2: Memoization for scale
  );

  // TODO 4.1: create a const brushRef
  const brushRef = React.useRef(null);

  // TODO 4.1: setup brush and side effect
  React.useEffect(() => {
    if (!brushRef.current) return;

    // TODO 4.1: setup the brush using d3.brushX() and set its extent
    const brush = d3
      .brushX()
      .extent([[0, 0], [innerWidth, innerHeight]])
      .on("brush end", event => {
        const selection = event.selection;
        if (!selection) {
          // if brush is cleared, reset filter
          setBrushExtent && setBrushExtent(null);
          return;
        }
        // TODO 4.1: invert the selection using xScale.invert
        const [x0, x1] = selection.map(xScale.invert);
        setBrushExtent && setBrushExtent([x0, x1]);
      });

    // connect the brush with the group element
    d3.select(brushRef.current).call(brush);
  }, [innerWidth, innerHeight, xScale, setBrushExtent]); // dependencies

  return (
    <>
      {/* TODO 3.2: background rectangle */}
      <rect width={width} height={height} fill="white" />

      {/* TODO 3.2: group translated by margins */}
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* TODO 3.2: AxisLeft */}
        <AxisLeft yScale={yScale} innerWidth={innerWidth} tickOffset={5} />

        {/* TODO 3.2: AxisBottom */}
        <AxisBottom
          xScale={xScale}
          innerHeight={innerHeight}
          tickOffset={5}
          tickFormat={xAxisTickFormat}
        />

        {/* TODO 3.2: Bars */}
        <Bars
          binnedData={binnedData}
          xScale={xScale}
          yScale={yScale}
          innerHeight={innerHeight}
        />

        {/* TODO 3.2: y axis label */}
        <text
          className="axis-label"
          textAnchor="middle"
          transform={`translate(${-yAxisLabelOffset},${
            innerHeight / 2
          }) rotate(-90)`}
        >
          {yAxisLabel}
        </text>

        {/* TODO 4.1: group element with ref for brush */}
        <g ref={brushRef} />
      </g>
    </>
  );
};
