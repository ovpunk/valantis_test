import { useEffect, useState } from "react";
import styles from "./pagination.module.scss";

export const Pagination = ({ offset, setOffset, pagesCount }) => {
  const [currentPage, setCurrentPage] = useState(offset / 50 + 1);

  const changeOffset = (pageNumber) => {
    setOffset(pageNumber * 50);
  };

  useEffect(() => {
    setCurrentPage(offset / 50 + 1);
  }, [offset]);

  const pagesToShow = 10;
  const generatePages = (currentPage, total) => {
    const pagesArray = [];
    if (total <= pagesToShow) {
      // Если общее количество страниц меньше или равно количеству страниц для отображения, отобразить все страницы
      return Array.from({ length: pagesCount }, (_, index) => index + 1);
    }
    let startPage = currentPage - Math.floor(pagesToShow / 2);
    startPage = Math.max(startPage, 1);
    let endPage = startPage + pagesToShow - 1;
    if (endPage > total) {
      // Если конечная страница превышает общее количество страниц,установим конечную страницу в общее количество страниц
      endPage = total;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }
    for (let i = startPage - 1; i < endPage; i++) {
      pagesArray.push(i);
    }

    return pagesArray;
  };

  const pages = generatePages(currentPage, pagesCount);

  return (
    <div className={styles.pagination}>
      <ul>
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => changeOffset(pageNumber)}
            className={currentPage - 1 === pageNumber ? styles.active : ""}
          >
            {pageNumber + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};
