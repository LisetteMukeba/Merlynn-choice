import { useEffect, useState } from "react";
import axios from "axios";

export default function DrinkChoiceForm() {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [inputs, setInputs] = useState({});
  const [decision, setDecision] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch available models on component mount
  useEffect(() => {
    axios.get("/api/models").then((res) => setModels(res.data.data));
  }, []);

  // Handle Model Selection
  const handleModelSelect = async (modelId) => {
    setSelectedModel(null);
    setDecision(null);
    setError(null);

    try {
      const { data } = await axios.get(`/api/models/${modelId}`);
      setSelectedModel(data.data.attributes);

      const defaultInputs = {};
      data.data.attributes.metadata.attributes.forEach(attr => defaultInputs[attr.name] = "");
      setInputs(defaultInputs);
    } catch (error) {
      setError("Failed to load model details.");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedModel) return;

    setLoading(true);
    setDecision(null);
    setError(null);

    console.log("Submitting form with:", { modelId: selectedModel.id, input: inputs });

    try {
      const response = await axios.post("/api/decision", { modelId: selectedModel.id, input: inputs });

      console.log("Decision API response:", response.data);

      if (response.data && response.data.decision) {
        setDecision(response.data.decision);
      } else {
        setError("Unexpected response structure from API.");
      }
    } catch (error) {
      console.error("Failed to fetch decision:", error.response?.data || error.message);
      setError("An error occurred while fetching the decision.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Drink Choice Model</h1>

      {/* Model Selection Dropdown */}
      <select onChange={(e) => handleModelSelect(e.target.value)} className="w-full p-3 border rounded text-lg">
        <option value="">Select a model...</option>
        {models.map((model) => (
          <option key={model.id} value={model.id}>{model.attributes.name}</option>
        ))}
      </select>

      {selectedModel && (
        <form onSubmit={handleSubmit} className="mt-4 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{selectedModel.name}</h2>

          {selectedModel.metadata.attributes.map((feature) => (
            <div key={feature.name} className="mb-4">
              <label className="block text-lg font-medium text-gray-800 mb-2">{feature.question}</label>
              {feature.domain.values ? (
                <select
                  name={feature.name}
                  value={inputs[feature.name]}
                  onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                  className="w-full p-3 border rounded-lg text-lg"
                >
                  <option value="">Select...</option>
                  {feature.domain.values.map((value) => (
                    <option key={value} value={value}>{value}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="number"
                  name={feature.name}
                  value={inputs[feature.name]}
                  onChange={(e) => setInputs({ ...inputs, [e.target.name]: e.target.value })}
                  min={feature.domain.lower}
                  max={feature.domain.upper}
                  className="w-full p-3 border rounded-lg text-lg"
                />
              )}
            </div>
          ))}

          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700">
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
      )}

      {decision && <p className="mt-4 p-4 bg-green-200 text-green-800 text-lg">Decision: {decision}</p>}
      {error && <p className="mt-4 p-4 bg-red-200 text-red-800 text-lg">{error}</p>}
    </div>
  );
}
