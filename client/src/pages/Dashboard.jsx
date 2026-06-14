import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const stocks = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];

function Dashboard() {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  const [selectedStocks, setSelectedStocks] = useState([]);
  const [prices, setPrices] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");

  useEffect(() => {
    if (!userEmail) {
      navigate("/");
      return;
    }

    const savedStocks =
      JSON.parse(localStorage.getItem(`stocks_${userEmail}`)) || [];

    setSelectedStocks(savedStocks);
  }, []);

  useEffect(() => {
    if (userEmail) {
      localStorage.setItem(
        `stocks_${userEmail}`,
        JSON.stringify(selectedStocks)
      );
    }
  }, [selectedStocks, userEmail]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPrices = {};

      selectedStocks.forEach((stock) => {
        updatedPrices[stock] = (
          100 + Math.random() * 900
        ).toFixed(2);
      });

      setPrices(updatedPrices);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedStocks]);

  const handleSelectStock = (stock) => {
    if (selectedStocks.includes(stock)) {
      alert("Already subscribed!");
      return;
    }

    if (selectedStocks.length >= 5) {
      alert("Maximum 5 stocks allowed");
      return;
    }

    setSelectedStocks([...selectedStocks, stock]);
  };

  const removeStock = (stock) => {
    setSelectedStocks(
      selectedStocks.filter((item) => item !== stock)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Stock Broker Dashboard
          </h1>

          <p className="text-sm mt-1">
            Logged in as: {userEmail}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="p-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Subscribe to Stocks
          </h2>

          <div className="flex flex-wrap gap-3">
            {stocks.map((stock) => (
              <button
                key={stock}
                onClick={() => handleSelectStock(stock)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                {stock}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">
            Live Stock Prices
          </h2>

          <p className="text-gray-500 mb-4">
            Last Updated: {lastUpdated}
          </p>

          {selectedStocks.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6">
              No stocks selected.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {selectedStocks.map((stock) => (
                <div
                  key={stock}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <h3 className="text-2xl font-bold text-blue-700">
                    {stock}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Current Price
                  </p>

                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ₹ {prices[stock]}
                  </p>

                  <button
                    onClick={() => removeStock(stock)}
                    className="mt-4 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                  >
                    Remove Stock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;