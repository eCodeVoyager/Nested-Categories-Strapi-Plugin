// // Dropdown.js
// import React, { useState, useEffect } from "react";
// import { fetchCategories } from "../../api/api";

// const Dropdown = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);

//   useEffect(() => {
//     const getData = async () => {
//       const categoriesData = await fetchCategories();
//       setCategories(categoriesData);
//     };
//     getData();
//   }, []);

//   const handleCategoryChange = (e) => {
//     const categoryId = parseInt(e.target.value);
//     const category = categories.find((cat) => cat.id === categoryId);
//     setSelectedCategory(category);
//     setSelectedSubcategory(null); // Reset subcategory when category changes
//   };

//   const handleSubcategoryChange = (e) => {
//     const subcategoryId = parseInt(e.target.value);
//     const subcategory = selectedCategory.subcategories.find(
//       (sub) => sub.id === subcategoryId
//     );
//     setSelectedSubcategory(subcategory);
//   };

//   return (
//     <div>
//       <div>
//         <label htmlFor="category">Category:</label>
//         <select id="category" onChange={handleCategoryChange}>
//           <option value="">Select Category</option>
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </select>
//       </div>
//       {selectedCategory && (
//         <div>
//           <label htmlFor="subcategory">Subcategory:</label>
//           <select id="subcategory" onChange={handleSubcategoryChange}>
//             <option value="">Select Subcategory</option>
//             {selectedCategory.subcategories.map((subcategory) => (
//               <option key={subcategory.id} value={subcategory.id}>
//                 {subcategory.name}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}
//       <div>
//         <h3>Selected Category: {selectedCategory?.name || "None"}</h3>
//         <h3>Selected Subcategory: {selectedSubcategory?.name || "None"}</h3>
//       </div>
//     </div>
//   );
// };

// export default Dropdown;

//

import React, { useState, useEffect } from "react";
import { fetchCategories } from "../../api/api";
import { useCMEditViewDataManager } from "@strapi/helper-plugin";
import "./Dropdown.css";

import {
  Combobox,
  ComboboxOption,
  CreatableCombobox,
} from "@strapi/design-system";

const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const { onChange, modifiedData } = useCMEditViewDataManager();

  useEffect(() => {
    const getData = async () => {
      const categoriesData = await fetchCategories();
      console.log(categoriesData);
      setCategories(categoriesData);

      // Pre-populate the dropdown if the field already has a value
      if (modifiedData.nestedCategory) {
        const { category, subCategory } = JSON.parse(
          modifiedData.nestedCategory
        );
        const preSelectedCategory = categoriesData.find(
          (cat) => cat.name === category
        );
        setSelectedCategory(preSelectedCategory);
        if (preSelectedCategory) {
          setSelectedSubcategory(
            preSelectedCategory.subcategories.find(
              (sub) => sub.name === subCategory
            )
          );
        }
      }
    };
    getData();
  }, [modifiedData.nestedCategory]);

  // Run this effect when `modifiedData.nestedCategory` changes
  const updateStrapiData = (category, subcategory) => {
    onChange({
      target: {
        name: "nestedCategory",
        value: JSON.stringify({
          // Convert to JSON string
          category: category ? category.name : null,
          subCategory: subcategory ? subcategory.name : null,
        }),
        type: "json",
      },
    });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    updateStrapiData(category, null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    updateStrapiData(selectedCategory, subcategory);
  };

  return (
    <div className="wrapper">
      <div>
        <label htmlFor="category" className="Cat_label">
          Category <span>*</span>
        </label>
        <Combobox
          className="input"
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <ComboboxOption value={null}>Select Cat</ComboboxOption>
          {categories.map((category) => (
            <ComboboxOption key={category.id} value={category}>
              {category.name}
            </ComboboxOption>
          ))}
        </Combobox>
      </div>

      {selectedCategory && (
        <div>
          <label htmlFor="subcategory" className="Cat_label">
            Subcategory <span>*</span>
          </label>
          <Combobox
            id="subcategory"
            value={selectedSubcategory}
            onChange={handleSubcategoryChange}
          >
            <ComboboxOption value={null}>Select Subcategory</ComboboxOption>
            {selectedCategory.subcategories.map((subcategory) => (
              <ComboboxOption key={subcategory.id} value={subcategory}>
                {subcategory.name}
              </ComboboxOption>
            ))}
          </Combobox>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
