import React, { memo, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { colors } from "../../config/color";

export default function MapChart({ setTooltipContent }) {
  return (
    <ComposableMap>
      <Geographies geography="/features.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
            data-tooltip-id="my-tooltip-1" 
              key={geo.rsmKey}
              geography={geo}
              onMouseEnter={() => setTooltipContent(geo.properties.name) }
              onMouseLeave={() => setTooltipContent("")}
              style={{
                default: {
                  fill: colors.primary,
                  borderColor: colors.dark,
                },
                hover: {
                  fill: colors.dark,
                },
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  );
}