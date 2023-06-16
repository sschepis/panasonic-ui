import React from 'react';

import "../App.css";

const FeaturedPlanes = () => {
    return (
        <section>
            <div className="planes">
            <h2>Featured Planes</h2>
                <div className="plane">
                    <h3>Plane 1</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="plane">
                    <h3>Plane 2</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="plane">
                    <h3>Plane 3</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </section>
    );
};

export default FeaturedPlanes;
