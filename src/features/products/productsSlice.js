import { createSlice, createSelector } from '@reduxjs/toolkit';

const mockProducts = [
  {
    id: 1,
    name: 'Pan de Campo',
    description: 'Elaborado con masa madre y larga fermentación.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    category: 'Pan',
    stock: 50,
  },
  {
    id: 2,
    name: 'Croissant de Almendras',
    description: 'Hojaldre de manteca relleno de crema de almendras.',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
    category: 'Facturas',
    stock: 30,
  },
  {
    id: 3,
    name: 'Torta Selva Negra',
    description: 'Bizcocho de chocolate, crema y cerezas.',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800',
    category: 'Tortas',
    stock: 10,
  },
  {
    id: 4,
    name: 'Pan de Masa Madre',
    description: 'Sabor intenso y miga alveolada.',
    price: 6.00,
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800',
    category: 'Pan',
    stock: 40,
  },
  {
    id: 5,
    name: 'Medialunas de Manteca',
    description: 'Tiernas, dulces y con un glaseado perfecto.',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800',
    category: 'Facturas',
    stock: 60,
  },
  {
    id: 6,
    name: 'Torta de Chocolate',
    description: 'Húmeda, intensa y con cobertura de ganache.',
    price: 30.00,
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800',
    category: 'Tortas',
    stock: 8,
  },
  {
    id: 7,
    name: 'Croissant de Mantequilla',
    description: 'Elaborado con una mezcla de harina de centeno y trigo integral.',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=800',
    category: 'Facturas',
    stock: 35,
  },
  {
    id: 8,
    name: 'Muffin de Arándanos',
    description: 'Esponjoso y lleno de arándanos frescos.',
    price: 3.00,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800',
    category: 'Facturas',
    stock: 45,
  },
];

const initialState = {
  products: mockProducts,
  selectedCategory: null,
  searchQuery: '',
  sortBy: 'popularity',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
});

export const { setSelectedCategory, setSearchQuery, setSortBy } = productsSlice.actions;

// Selectors
const selectProducts = state => state.products.products;
const selectSelectedCategory = state => state.products.selectedCategory;
const selectSearchQuery = state => state.products.searchQuery;
const selectSortBy = state => state.products.sortBy;

export const selectFilteredProducts = createSelector(
  [selectProducts, selectSelectedCategory, selectSearchQuery, selectSortBy],
  (products, selectedCategory, searchQuery, sortBy) => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }
);

export const selectCategories = createSelector(
  [selectProducts],
  (products) => [...new Set(products.map(p => p.category))]
);

export const selectProductById = createSelector(
  [selectProducts, (state, productId) => productId],
  (products, productId) => products.find(p => p.id === parseInt(productId))
);

export default productsSlice.reducer;
