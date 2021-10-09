import Link from "next/link";

const Pagination = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) return <></>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirst && (
          <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1">
            <Link href={prevPage}>
              <a>Previous</a>
            </Link>
          </li>
        )}
        {Array.from({ length: numPages }, (_, i) => (
          <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1">
            <Link href={`/blog/page/${i + 1}`}>
              <a>{i + 1}</a>
            </Link>
          </li>
        ))}
        {!isLast && (
          <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1">
            <Link href={nextPage}>
              <a>Next</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
