const attributeMap: { [key: string]: string } = {
  name: 'nombre',
  height: 'altura',
  mass: 'masa',
  hair_color: 'colorPelo',
  skin_color: 'colorPiel',
  eye_color: 'colorOjos',
  birth_year: 'anioNacimiento',
  gender: 'genero',
  homeworld: 'mundoNatal',
  films: 'peliculas',
  species: 'especies',
  vehicles: 'vehiculos',
  starships: 'navesEstelares',
  created: 'creado',
  edited: 'editado',
  url: 'url',
};

export function translateAttributes(data: any): any {
  const translatedData: any = {};
  for (const [key, value] of Object.entries(data)) {
    const translatedKey = attributeMap[key] || key;
    translatedData[translatedKey] = value;
  }
  return translatedData;
}
