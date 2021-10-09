import Link from 'next/link';

const CategoriesList = ({categories}) => {
    return (
      <div className="w-full p-5 bg-white rounded-lg shadow-md mt-6">
        <h3 className="p-3">Blog Categories</h3>
        <ul className="divide-y divide-gray-300">
          {categories.map((category, index) => (
            <li key={index} className="p-4">
              <Link href={`/blog/category/${category.toLowerCase()}`}>
                <a>{category}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default CategoriesList
