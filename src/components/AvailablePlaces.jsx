import { useState, useEffect } from 'react';
import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {

      try {
        const places = await fetchAvailablePlaces();
        setAvailablePlaces(places);
        setIsFetching(false);

        //  navigator.geolocation.getCurrentPosition((position) => {
        //     const sortedPlases = sortPlacesByDistance(resData.places, position);
        //     setAvailablePlaces(sortedPlases);
        //     setIsFetching(false);
        //   });


      } catch (error) {
        setError({ message: error.message || 'Could not fetch places, try again!' });
        setIsFetching(false);
      }
    }

    fetchPlaces();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoadind={isFetching}
      loadingText={'Loading places...'}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
