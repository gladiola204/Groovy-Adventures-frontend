import React from "react";
import { PartialRatings } from "../../../../redux/features/tour/tourSlice.interface";
import Rectangles from "./RectangleRates";

interface Props {
    ratings: PartialRatings
}

const PartialRatingList = React.memo(({ ratings }: Props) => {
  return (
    <ul>
      {Object.entries(ratings).map(([key, value], index) => (
        <li key={index} className="tour-page__rate-item grid-2-cl">
          <h5 className="tour-page__type-of-rate">{key}</h5>
          <Rectangles rating={value}/>
          <p className="tour-page__rate">{value}</p>
        </li>
      ))}
    </ul>
  );
});

export default PartialRatingList;