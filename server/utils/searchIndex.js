import 'dotenv/config';

const orderSearchIndex = {
   collectionName: 'orders',
  database: process.env.DBNAME,
  name: 'orders_search_index',
  type: 'search',
  analyzer: 'lucene.standard',
  mappings: {
    dynamic: false,
    fields: {
      _id: {
        type: 'autocomplete',
      },
      customer: {
        type: 'autocomplete',
      },
      shipping_address: {
        type: 'document',
        fields: {
          name: {
            type: 'autocomplete',
          },
        },
      },
    },
  },
};

const productSearchIndex = {
  collectionName: 'products',
  database: process.env.DBNAME,
  name: 'products_search_index',
  type: 'search',

  mappings: {
    dynamic: false,
    fields: {
      title: {
        type: 'autocomplete',
      },
    },
  },
  searchAnalyzer: 'lucene.standard',
};

export { productSearchIndex, orderSearchIndex };
