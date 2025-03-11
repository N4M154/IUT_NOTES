import { useState, useEffect } from "react";
import axios from "axios";

export default function PetStats() {
  const [petId, setPetId] = useState("");
  const [pet, setPet] = useState(null);
  const [message, setMessage] = useState("");

  const fetchPetStats = async () => {
    if (!petId) return;
    try {
      const response = await axios.get(
        `http://localhost:4000/api/pets/${petId}`
      );
      console.log("Fetched pet stats:", response.data);
      setPet(response.data.pet);
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error fetching pet stats:", error);
      alert("Pet not found or error fetching pet stats.");
    }
  };

  const feedPet = async () => {
    try {
      await axios.put(`http://localhost:4000/api/pets/${petId}/feed`);
      fetchPetStats();
    } catch (error) {
      console.error("Error feeding the pet:", error);
      alert("Error feeding the pet");
    }
  };

  const playPet = async () => {
    try {
      await axios.put(`http://localhost:4000/api/pets/${petId}/play`);
      fetchPetStats();
    } catch (error) {
      console.error("Error playing with the pet:", error);
      alert("Error playing with the pet");
    }
  };

  const releasePet = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/pets/${petId}`);
      alert("Pet released successfully!");
      setPet(null);
      setMessage("");
    } catch (error) {
      console.error("Error releasing the pet:", error);
      alert("Error releasing the pet");
    }
  };

  useEffect(() => {
    if (petId) {
      fetchPetStats();
    }
  }, [petId]);

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-thin mb-4">
        Pet Stats (Check MongoDB to get the id after creating a pet)
      </h2>
      <input
        type="text"
        placeholder="Enter Pet ID"
        className="w-full p-2 border rounded mb-4"
        value={petId}
        onChange={(e) => setPetId(e.target.value)}
      />
      <button
        onClick={fetchPetStats}
        className="w-full bg-violet-500 text-white p-2 rounded mb-4"
      >
        Fetch Pet Stats
      </button>

      {pet && (
        <div className="border p-4 rounded">
          <h3 className="text-xl font-semibold">{pet.name}</h3>
          {pet.images.map((image, index) => (
            <img
              key={index}
              src={`http://localhost:4000${image}`}
              alt={`Pet ${index + 1}`}
              className="w-full max-w-xs mx-auto mb-4"
            />
          ))}
          <p>Species: {pet.species}</p>
          <p>Age: {pet.age}</p>
          <p>Hunger: {pet.stats.hunger}</p>
          <p>Energy: {pet.stats.energy}</p>
          <p>Health: {pet.stats.health}</p>
          {message && <p className="text-red-500 mt-4">{message}</p>}{" "}
          <div className="flex space-x-4 mt-4">
            <button
              onClick={feedPet}
              className="bg-green-500 text-white p-2 rounded"
            >
              Feed Pet
            </button>
            <button
              onClick={playPet}
              className="bg-yellow-500 text-white p-2 rounded"
            >
              Play with Pet
            </button>
            <button
              onClick={releasePet}
              className="bg-red-500 text-white p-2 rounded"
            >
              Release Pet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
