import { useState } from 'react';

function Rating() {
    const [rating, setRating] = useState(1);
    return (
        <div className="rating rating-md gap-1">
            <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                onClick={() => setRating(1)}
            />
            <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                onClick={() => setRating(2)}
            />
            <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                onClick={() => setRating(3)}
            />
            <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                onClick={() => setRating(4)}
            />
            <input
                type="radio"
                name="rating-7"
                className="mask mask-star-2 bg-orange-400"
                onClick={() => setRating(5)}
            />
        </div>
    );
}

export default Rating;
