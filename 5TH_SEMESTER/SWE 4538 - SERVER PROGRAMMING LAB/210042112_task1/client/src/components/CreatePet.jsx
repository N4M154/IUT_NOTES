import { useState } from "react";
import axios from "axios";

export default function CreatePet() {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("Puppy");
  const [age, setAge] = useState(1);
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("species", species);
    formData.append("age", age);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await axios.post("http://localhost:4000/api/pets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Pet created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating pet");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Create a New Pet</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block">Pet Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Species</label>
          <select
            className="w-full p-2 border rounded"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          >
            <option value="Puppy">Puppy</option>
            <option value="Bunny">Bunny</option>
            <option value="Dragon">Dragon</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block">Age</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block">Images</label>
          <input
            type="file"
            className="w-full p-2 border rounded"
            multiple
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-violet-500 text-white p-2 rounded"
        >
          Create Pet
        </button>
      </form>
    </div>
  );
}
