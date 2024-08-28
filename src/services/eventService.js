import Event from "../models/Event.js";

export const filterEvents = (query) => {
  let filter = { $and: [{}] };

  const { latitude, longitude, distance, category } = query;

  if (latitude && longitude) {
    filter.$and.push({
      "location.geoLocation": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: distance || 100000,
        },
      },
    });
  }

  if (category) {
    filter.$and.push({ category: category });
  }

  console.log(filter);

  return filter;
};
