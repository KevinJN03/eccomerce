function productSearchStage(searchText) {
  const should = [
    {
      autocomplete: {
        query: searchText,
        path: 'title',
      },
    },
  ];

  try {
    const objectId = new mongoose.Types.ObjectId(searchText);
    should.push({
      equals: {
        value: objectId,
        path: '_id',
      },
    });
  } catch (error) {
    console.error('parse string to objectId failed: ', error?.message);
  }

  const searchStage = {
    $search: {
      index: 'products_search_index',
      compound: {
        should,
      },
    },
  };
  return searchStage;
}

export default productSearchStage;
