/*
 * @file app.js
 *
 * @brief The app Redux reducer
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
 * @license
 *
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 *
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 *
 */

import {
  UPDATE_PAGE,
  UPDATE_OFFLINE,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR,
  UPDATE_DRAWER_STATE,
  UPDATE_BK_JOB_STATE
} from '../actions/app.js';

const INITIAL_STATE = {
  page: '',
  offline: false,
  drawerOpened: false,
  snackbarOpened: false,
  runningJobs: false
};

const app = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        page: action.page
      };

    case UPDATE_OFFLINE:
      return {
        ...state,
        offline: action.offline
      };

    case UPDATE_DRAWER_STATE:
      return {
        ...state,
        drawerOpened: action.opened
      };

    case OPEN_SNACKBAR:
      return {
        ...state,
        snackbarOpened: true
      };

    case CLOSE_SNACKBAR:
      return {
        ...state,
        snackbarOpened: false
      };

    /*
     * NOTE: XXX: assume that we only have one job/task running at same time
     */
    case UPDATE_BK_JOB_STATE:
      return {
          ...state,
          runningJobs: action.running
      };

    default:
      return state;
  }
};

export default app;
