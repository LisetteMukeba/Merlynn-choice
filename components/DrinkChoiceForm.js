import { useEffect, useState } from "react";
import axios from "axios";

export default function DrinkChoiceForm() {
  const [model, setModel] = useState(null);
  const [inputs, setInputs] = useState({});
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("/api/model").then((res) => {
      const modelData = res.data.data.attributes;
      setModel(modelData);

      const defaultInputs = {};
      modelData.metadata.attributes.forEach((attr) => {
        defaultInputs[attr.name] = "";
      });
      setInputs(defaultInputs);
    });
  }, []);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDecision(null);
    setError(null);

    const cleanInputs = Object.fromEntries(
      Object.entries(inputs).filter(([_, value]) => value !== "" && value !== null)
    );

    const requestData = {
      data: {
        type: "decision",
        attributes: {
          model: "58d3bcf97c6b1644db73ad12",
          values: cleanInputs,
        }
      }
    };

    console.log("🔍 Sending request:", JSON.stringify(requestData, null, 2));

    try {
      const response = await axios.post(
        "https://api.up2tom.com/v3/decision",
        requestData,
        {
          headers: {
            "Authorization": "Bearer 9307bfd5fa011428ff198bb37547f979",
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Decision response:", response.data);
      setDecision(response.data);
    } catch (error) {
      console.error("❌ Error fetching decision:", error.response?.data || error.message);
      setError("An error occurred while fetching the decision");
    } finally {
      setLoading(false);
    }
  };

  if (!model) return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 w-full fixed top-0 left-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          <div className="flex-1 flex justify-center">
            <h1 className="text-xl font-bold text-blue-600">DrinkChoice</h1>
          </div>
          <div className="space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-500">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-500">Contact</a>
          </div>
        </div>
      </nav>

      {/* Form Container */}
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{model.name}</h1>
        <p className="text-gray-600 mb-4">{model.description}</p>

        <form onSubmit={handleSubmit}>
          {model.metadata.attributes.map((feature) => (
            <div key={feature.name} className="mb-4">
              <label className="block text-lg font-semibold text-gray-800 mb-1">
                {feature.question}
              </label>
              {feature.domain.values ? (
                <select
                  name={feature.name}
                  value={inputs[feature.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Select...</option>
                  {feature.domain.values.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={feature.name}
                  value={inputs[feature.name]}
                  onChange={handleChange}
                  min={feature.domain.lower}
                  max={feature.domain.upper}
                  step={feature.domain.interval || 1}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              )}
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>

        {/* Display Decision */}
        {decision && decision.decision && decision.decision.data && decision.decision.data.attributes ? (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg">
            <h2 className="text-lg font-bold">Decision Result</h2>
            <p>Outcome: {decision.decision.data.attributes.prediction?.name || "N/A"}</p>
          </div>
        ) : decision && decision.errors ? (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            <h2 className="text-lg font-bold">Error</h2>
            <p>{decision.errors[0]?.detail || "An error occurred"}</p>
          </div>
        ) : null}

        {/* Error handling */}
        {error && (
          <div className="mt-6 p-4 bg-red-100 text-red-700 rounded-lg">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
