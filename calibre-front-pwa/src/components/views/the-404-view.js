/*
 * @file the-404-view.js
 *
 * @brief 404 page
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

import {html, LitElement} from 'lit-element';

import { SharedStyles } from '../shared-styles.js';

class The404View extends LitElement {
    static get styles() {
        return [
            SharedStyles
        ];
    }

    render() {
        return html`
            <section>
                <h2>Oops! You hit a 404</h2>
                <p>
                    The page you're looking for doesn't seem to exist. Head back <a href="/">home</a> and try again?
                </p>
            </section>
        `
    }
}

window.customElements.define('the-404-view', The404View);
