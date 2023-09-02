import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_DATA } from './queries';

const App = () => {
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(5);
  const [fetchData, setFetchData] = useState(false);
  const [fetchingPage, setFetchingPage] = useState(1); // Track the current page being fetched
  const [downloadInProgress, setDownloadInProgress] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_DATA, {
    variables: {
      mediaSize: "MEDIUM",
      q: null,
      filter: {
        categorySlug: "automobiles",
        origin: null,
        connected: false,
        delivery: null,
        regionIds: [],
        cityIds: [],
        priceRange: [null, null],
        exchange: false,
        hasPictures: false,
        hasPrice: false,
        priceUnit: null,
        fields: [],
        page: fetchingPage, // Use the fetchingPage variable
        count: 48
      },
    },
    skip: !fetchData || fetchingPage >= maxPages, // Skip when maximum pages reached
  });

  useEffect(() => {
    if (!loading && data) {
      const newData = data.search.announcements.data;
      setAllData((prevData) => [...prevData, ...newData]);

      if (data.search.announcements.paginatorInfo && data.search.announcements.paginatorInfo.hasMorePages) {
        setCurrentPage((prevPage) => prevPage + 1);

        // Check if the current page has reached the maximum specified pages
        if (fetchingPage >= maxPages) {
          setDownloadInProgress(false); // Stop download
        } else {
          // Increment the fetchingPage to fetch the next page
          setFetchingPage((prevFetchingPage) => prevFetchingPage + 1);
        }
      }
    }
  }, [loading, data, fetchingPage, maxPages, fetchData]);

  const fetchNextPage = () => {
    // Fetch the next page of data by incrementing the fetchingPage variable
    setFetchingPage((prevFetchingPage) => prevFetchingPage + 1);
  };

  const saveDataToJson = () => {
    setDownloadInProgress(true); // Set download in progress
    const jsonData = JSON.stringify(allData);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';

    a.dispatchEvent(new MouseEvent('click'));

    URL.revokeObjectURL(url);

    setDownloadInProgress(false); // Reset download status after completion
  };

  const startFetchingData = () => {
    // Reset currentPage when starting a new data fetch
    setCurrentPage(1);
    // Reset fetchingPage to start fetching from the first page
    setFetchingPage(1);
    // Set fetchData to true to trigger the query
    setFetchData(true);
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Limite de pages"
        value={maxPages}
        onChange={(e) => setMaxPages(Number(e.target.value))}
        disabled={downloadInProgress || loading || fetchData}
      />
      <button onClick={startFetchingData} disabled={downloadInProgress || loading || fetchData}>
        Démarrer la récupération
      </button>
      <button onClick={fetchNextPage} disabled={downloadInProgress || loading || !fetchData || fetchingPage >= maxPages}>
        {loading ? 'Chargement...' : 'Charger la page suivante'}
      </button>
      <button onClick={saveDataToJson} disabled={!allData.length || downloadInProgress}>
        {downloadInProgress ? 'Téléchargement en cours...' : 'Télécharger JSON'}
      </button>
      {/* Le rendu de votre composant React va ici */}
    </div>
  );
};

export default App;
