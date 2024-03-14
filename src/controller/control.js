import { createDropDown } from '../component/dropDown';
import createHeader from '../component/header';
import renderRestaurantList from '../component/restaurantList.js';
import { categoryFilterList, sortingFilterList } from '../constant/cons';
import { RestaurantManager } from '../domain/RestaurantManager';

export const set = {
  start() {
    const data = JSON.parse(localStorage.getItem('restaurantList')) || [];
    const restaurantManager = new RestaurantManager(data);

    this.setMainPage(restaurantManager);
  },

  setMainPage(restaurantManager) {
    document.body.insertAdjacentElement(
      'afterbegin',
      createHeader({
        className: 'gnb',
        left: 'logo',
        right: 'add',
        addRestaurant: (restaurant) => restaurantManager.add(restaurant),
        getRestaurantList: () => restaurantManager.filteredRestaurantList(),
      })
    );

    const restaurantFilterContainer = document.querySelector(
      '.restaurant-filter-container'
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'category',
        id: 'category-filter',
        options: categoryFilterList,
        className: 'restaurant-filter',
        callback: (category) => {
          restaurantManager.setCurrentCategory(category);

          if (category === '전체')
            return renderRestaurantList(restaurantManager.getRestaurantList());

          renderRestaurantList(restaurantManager.filteredRestaurantList());
        },
      })
    );

    restaurantFilterContainer.appendChild(
      createDropDown({
        name: 'sorting',
        id: 'sorting-filter',
        className: 'restaurant-filter',
        options: sortingFilterList,
        callback: (category) => {
          if (category === '이름순')
            renderRestaurantList(
              restaurantManager.sortByAscendingNameAndCategory()
            );
          if (category === '거리순')
            renderRestaurantList(
              restaurantManager.sortByAscendingWalkingTimeAndCategory()
            );
        },
      })
    );

    renderRestaurantList(restaurantManager.sortByAscendingNameAndCategory());
  },
};
