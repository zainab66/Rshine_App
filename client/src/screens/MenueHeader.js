import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory } from '../actions/categoryActions';

export default function MenueHeader() {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);
  return (
    <div class="menueHedr">
      <ul class="nav justify-content-center">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (<>
          {categories.map((category) => (
            <li class="nav-item">
              <a class="nav-link" href="#"><div class="btn-group">
                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  {category.name}
                </button>
                <div class="dropdown-menu">
                  {category.childr.map((sub) =>
                    <a class="dropdown-item" href={`/${sub.slug}`}> {sub.name}</a>
                  )}
                </div>
              </div></a>
            </li>
          ))}</>)}
      </ul>
    </div>
  );

}
