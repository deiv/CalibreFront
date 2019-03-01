/*
 * @file BookMapper.java
 *
 * @brief Book MyBatis mapper
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

package org.deiv.calibrefront.domain.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.deiv.calibrefront.domain.dto.Book;

import java.util.List;

@Mapper
public interface  BookMapper {

    @Select("select book.*, author.authorsconcat as authors, \n" +
                "            data.uncompressed_size as size, data.format,\n" +
                "            rating.rating, comments.text as comments " +
                "from books book \n" +
                "  left join _mcs_authors_concatenate author on author.book = book.id \n" +
                "  left join data on data.book = book.id\n" +
                "  left join\n" +
                "    (select rating_link.book, ratings.rating\n" +
                "      from books_ratings_link rating_link\n" +
                "      inner join ratings on ratings.id = rating_link.rating) rating\n" +
                "    on rating.book = book.id\n" +
                "  left join comments on comments.book = book.id " +
                "order by book.title asc")
    List<Book> findAll();

    @Select("select path from books book where book.id = #{id} and has_cover = 1")
    String getBookCoverPath(@Param("id") long id);
}
