import React from "react";

interface Props {
    rating: number,
}

const Rectangles: React.FC<Props> = ({ rating }) => {
    const fullRectangles = Math.floor(rating);
    const halfRectangle = rating - fullRectangles >= 0.5 ? 1 : 0;
    const emptyRectangles = 5 - fullRectangles - halfRectangle;
  
    return (
      <>
        {[...Array(fullRectangles)].map((_, i) => (
          <span key={`full-${i}`} className="tour-page__rectangle tour-page__rectangle--fullfilled" />
        ))}

        {halfRectangle > 0 && <span key="half" className="tour-page__rectangle tour-page__rectangle--half-filled" />}
        
        {[...Array(emptyRectangles)].map((_, i) => (
          <span key={`empty-${i}`} className="tour-page__rectangle tour-page__rectangle--empty" />
        ))}
      </>
    );
};

export default Rectangles;