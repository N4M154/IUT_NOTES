import Pet from "../models/Pet.js";

// Create a new pet
export const createPet = async (req, res) => {
  const { name, species, age } = req.body;
  const images = req.files.map((file) => `/uploads/${file.filename}`);
  try {
    const pet = new Pet({
      name,
      species,
      age,
      images,
    });
    await pet.save();
    res.status(201).json({ success: true, pet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View pet stats
export const getPetStats = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    // Condition for pet removal: Energy < 0 OR Hunger > 50
    if (pet.stats.energy <= 0 || pet.stats.hunger >= 50) {
      // If energy is < 0 OR hunger >= 50, pet is removed
      await pet.deleteOne();
      return res.status(400).json({
        success: false,
        message:
          "Pet has either become sick or run away and has been removed from the playground.",
      });
    }
    const petWithImages = {
      ...pet.toObject(),
      images: pet.images.map((image) => `/uploads/${image}`),
    };
    res.status(200).json({ success: true, pet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Feed pet
export const feedPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    pet.stats.hunger = Math.max(pet.stats.hunger - 25, 0);
    pet.stats.energy = Math.min(pet.stats.energy + 5, 100);
    await pet.save();

    res.status(200).json({ success: true, pet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Play with pet
export const playWithPet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    pet.stats.hunger = Math.min(pet.stats.hunger + 25, 50);
    pet.stats.energy = Math.max(pet.stats.energy - 30, 0);
    await pet.save();

    res.status(200).json({ success: true, pet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Release pet
export const releasePet = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }

    if (pet.stats.energy <= 0 && pet.stats.hunger >= 50) {
      //AND
      await pet.deleteOne();
      return res.status(200).json({
        success: true,
        message:
          "Pet was removed automatically because energy is low and hunger is high.",
      });
    }

    await pet.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Pet released successfully!" });
  } catch (err) {
    console.error("Error releasing pet:", err);
    res.status(500).json({
      success: false,
      message: "Error releasing pet",
      error: err.message,
    });
  }
};
