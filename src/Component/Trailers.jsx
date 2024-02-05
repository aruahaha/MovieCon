import React, { Suspense, useEffect, useState } from 'react';

import { getTrailers } from '../api';
import './Trailers.css';


export default function Trailers(props) {

    const [trailers, setTrailers] = useState(null);

    useEffect(() => {
        const idArray = props.data.map((item) => item.id);
        const trailersData = idArray.map((id) => getTrailers(id));
        setTrailers(trailersData)
    }, [props.data]);


    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <div className='trailer-main-div'>
                    <div className='trailer-title-div'>
                        <h1 className='trailer-title'>Trailers</h1>
                    </div>
                    <div className='trailer-name-video'>
                        <div className='youtube-trailer-div'>
                            {/* {trailers?.map((item) => (
                                <Await resolve={item}>
                                    
                                </Await>
                            ))} */}
                        </div>
                    </div>
                </div>
            </Suspense>
        </>
    );
}
