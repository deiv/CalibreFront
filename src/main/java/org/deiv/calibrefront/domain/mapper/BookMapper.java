package org.deiv.calibrefront.domain.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.deiv.calibrefront.domain.dto.Book;

import java.util.List;

@Mapper
public interface  BookMapper {

    @Select("select book.*, paths.value as genre_path, author.authorsconcat as authors, \n" +
                "            data.uncompressed_size as size, data.format,\n" +
                "            rating.rating, comments.text as comments " +
                "from books book \n" +
                "  left join \n" +
                "    (select path_value.value, book_path.book \n" +
                "      from books_custom_column_1_link book_path \n" +
                "      inner join custom_column_1 path_value on path_value.id = book_path.value) paths \n" +
                "     on paths.book = book.id \n" +
                "  left join _mcs_authors_concatenate author on author.book = book.id \n" +
                "  left join data on data.book = book.id\n" +
                "  left join\n" +
                "    (select rating_link.book, ratings.rating\n" +
                "      from books_ratings_link rating_link\n" +
                "      inner join ratings on ratings.id = rating_link.rating) rating\n" +
                "    on rating.book = book.id\n" +
                "  left join comments on comments.book = book.id " +
                "order by paths.value asc, book.title asc")
    List<Book> findAll();

    @Select("select path from books book where book.id = #{id} and has_cover = 1")
    String getBookCoverPath(@Param("id") long id);
}
