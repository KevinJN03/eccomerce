async function dropCollection(mongoose) {
  try {
    const collections = await mongoose.connection.client
      .db('glamo')
      .listCollections()
      .toArray();

    await Promise.all(
      collections.map(async (collection) => {
        await mongoose.connection.dropCollection(collection.name);
      }),
    );
  } catch (error) {
    console.log('err at dropcollection', error);
    // mongoose.connection.close();
  }
}

export default dropCollection;
