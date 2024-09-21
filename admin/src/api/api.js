// api.js

const token =
  "2a42054085761b6ec60aeac8d42025522fd8c40a36f97615d26d5e786268e35298946634eaa4853375ff999ccf4b0a60b73853b9f917f1685c52276f969edeed5d57726dd42db57a48a664a1b2d14064301ac642eaeca11663767824c019383f7941d9141b6a00f783ac68ad83aa77681d2b4e72802cbace0508fb10bd5ebc00";
export const fetchCategories = async () => {
  const response = await fetch(
    "http://127.0.0.1:1337/api/categories?populate=*",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await response.json();
  return transformData(data);
};

const transformData = (apiData) => {
  return apiData.data.map((category) => ({
    id: category.id,
    name: category.attributes.Name,
    subcategories: category.attributes.sub_categories.data.map((sub) => ({
      id: sub.id,
      name: sub.attributes.Name,
    })),
  }));
};
