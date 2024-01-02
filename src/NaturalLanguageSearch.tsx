import React, { useState } from "react";

interface NaturalLanguageSearchProps {
  setOrigin: (origin: any) => void;
}

function NaturalLanguageSearch({ setOrigin }: NaturalLanguageSearchProps) {
  const [searchInput, setSearchInput] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonLabel, setButtonLabel] = useState("Search");

  const loadFunction = async (data: any) => {
    return await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify(data),
    });
  };

  const handleSearch = () => {
    setButtonLabel("Searching...");
    const API_BODY = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: ` Is the query '${searchInput}?' related to location, direction, nearest location, or distance? Reply with Yes or No. if Yes so only send me origin and destination.`,
        },
      ],
      temperature: 0.7,
    };

    loadFunction(API_BODY)
      .then((response) => response.json())
      .then((response) => {
        const result = response.choices[0].message.content;
        if (result.toLocaleLowerCase() === "no") {
          setButtonLabel("Search");
          setShowSearch("");
          setOrigin("");
          return setErrorMessage("wrong searched message");
        }

        const API_BODY_RES = {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: searchInput,
            },
          ],
          temperature: 0.7,
        };

        loadFunction(API_BODY_RES)
          .then((response) => response.json())
          .then(async (response) => {
            const geocoder = new window.google.maps.Geocoder();

            geocoder.geocode(
              { address: searchInput },
              async (results: any, status) => {
                if (status === "OK" && results.length > 0) {
                  // eslint-disable-next-line no-undef
                  const directionService = new google.maps.DirectionsService();
                  const result = await directionService.route({
                    origin: results[0]?.formatted_address,
                    destination: results?.[1]?.formatted_address,
                    // eslint-disable-next-line no-undef
                    travelMode: google.maps.TravelMode.DRIVING,
                  });
                  setButtonLabel("Search");
                  setOrigin(result);
                } else {
                  setButtonLabel("Search");
                  console.error("Geocoding failed with status:", status);
                }
              }
            );
            setShowSearch(response.choices[0].message.content);
          })
          .catch((error) => {
            setButtonLabel("Search");
            console.error(error);
          });
      })
      .catch((error) => {
        setButtonLabel("Search");
        console.error(error);
      });
  };

  return (
    <div>
      <div className="question-wrapper">
        <div className="container">
          <input
            type="text"
            placeholder="Ask a question..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button className="search-btn" onClick={handleSearch}>
            {buttonLabel}
          </button>
        </div>
      </div>
      {errorMessage && <h1 className="error-msg"> {errorMessage} </h1>}

      {showSearch && (
        <div className="search-result">
          <div className="container">
            <p className="search-result-inner">{showSearch}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default NaturalLanguageSearch;
