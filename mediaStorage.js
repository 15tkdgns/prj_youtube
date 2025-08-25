export function loadMedia(key = "media") {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function saveMedia(mediaList, key = "media") {
  localStorage.setItem(key, JSON.stringify(mediaList));
}

// Create
export function addMedia(media, key = "media") {
  const mediaList = loadMedia(key);
  const newMedia = { ...media, id: Date.now() };
  const updatedList = [...mediaList, newMedia];
  saveMedia(updatedList, key);
  return updatedList;
}

// Read
export function getMediaList(key = "media") {
  return loadMedia(key);
}

export function getMediaByCategory(category, key = "media") {
  return loadMedia(key).filter((m) => m.category === category);
}

// Update
export function updateMedia(id, updatedFields, key = "media") {
  const updatedList = loadMedia(key).map((m) =>
    m.id === id ? { ...m, ...updatedFields } : m
  );
  saveMedia(updatedList, key);
  return updatedList;
}

// Delete
export function deleteMedia(id, key = "media") {
  const updatedList = loadMedia(key).filter((m) => m.id !== id);
  saveMedia(updatedList, key);
  return updatedList;
}