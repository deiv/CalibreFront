/*
 * @file rest-data.js
 *
 * @brief Redux reducer for rest requests
 * @author David Suárez
 * @date Sun, 17 Feb 2019 15:26:01 +0100
 *
 * @license
 *
 * calibre-front: web front for calibre ebook manager.
 *
 * Copyright (C) 2019 <David Suárez <david.sephirot@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 */

import {
  GET_BOOKS,
  RECEIVE_BOOKS
} from '../actions/rest-data.js';

const INITIAL_STATE = {
  books: [],
  error: '',
  isFetching: false,
  lastUpdated: ""
};

const restData = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case GET_BOOKS:
      return {
        ...state,
        isFetching: true
      };

    case RECEIVE_BOOKS:
      return {
        ...state,
        isFetching: false,
        books: action.books,
        lastUpdated: action.receivedAt
      };

    default:
      return state;
  }
};

export default restData;
