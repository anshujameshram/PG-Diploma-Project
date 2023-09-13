import React, { useState } from 'react';

const categoriesData = [
  {
    "id": 1,
    "category": "Men",
    "subctegory": "Formal Shirts"
  },
  {
    "id": 2,
    "category": "Men",
    "subctegory": "Casual Shirts"
  },
  {
    "id": 3,
    "category": "Men",
    "subctegory": "Slim Jeans"
  },
  {
    "id": 4,
    "category": "Men",
    "subctegory": "Cotton Jeans"
  },
  {
    "id": 5,
    "category": "Men",
    "subctegory": "Denim Jeans"
  },
  {
    "id": 6,
    "category": "Women",
    "subctegory": "Kurtas"
  },
  {
    "id": 7,
    "category": "Women",
    "subctegory": "Suits"
  },
  {
    "id": 8,
    "category": "Women",
    "subctegory": "Dresses"
  },
  {
    "id": 9,
    "category": "Women",
    "subctegory": "Tops"
  },
  {
    "id": 10,
    "category": "Women",
    "subctegory": "Skirts"
  },
  {
    "id": 11,
    "category": "Women",
    "subctegory": "Palazzos"
  },
  {
    "id": 12,
    "category": "Women",
    "subctegory": "Jackets"
  },
  {
    "id": 13,
    "category": "Women",
    "subctegory": "Tshirts"
  },
  {
    "id": 14,
    "category": "Women",
    "subctegory": "Shrugs"
  },
  {
    "id": 15,
    "category": "Women",
    "subctegory": "Playsuits"
  },
  {
    "id": 16,
    "category": "Kids",
    "subctegory": "Tshirts"
  },
  {
    "id": 17,
    "category": "Kids",
    "subctegory": "Dresses"
  },
  {
    "id": 18,
    "category": "Kids",
    "subctegory": "Jeans"
  },
  {
    "id": 19,
    "category": "Kids",
    "subctegory": "Jackets"
  },
  {
    "id": 20,
    "category": "Kids",
    "subctegory": "Shirts"
  }
]

function Categories() {
  const [openSubCategory, setOpenSubCategory] = useState(null);

  const toggleSubCategory = (subCategory) => {
    setOpenSubCategory(openSubCategory === subCategory ? null : subCategory);
  };

  return (
    <ul className="main-list" id="categoryList">
      {categoriesData.map((entry) => (
        <li key={entry.id}>
          <div onClick={() => toggleSubCategory(entry.subCategory)}>
            {entry.category}
            <img
              src="img/line-angle-down-icon.svg"
              className={`toggle-btn ${openSubCategory === entry.subCategory ? 'open' : ''}`}
              alt=""
            />
          </div>
          {openSubCategory === entry.subCategory && (
            <ul className="sub-list">
              <li
                className={`filterProduct ${openSubCategory === entry.subCategory ? 'open' : ''}`}
                onClick={() => toggleSubCategory(entry.subCategory)}
              >
                {entry.subCategory}
              </li>
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Categories;
