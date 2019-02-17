/*
 * @file Book.java
 *
 * @brief Book DTO
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

package org.deiv.calibrefront.domain.dto;

import java.util.Date;

public class Book {

    private Integer id;
    private String title;
    private String sort;
    // private Date timestamp;
    //private Date pubdate;
    private Long series_index;
    private String author_sort;
    private String isbn;
    private String lccn;
    private String path;
    private Integer flags;
    private String uuid;
    private Boolean has_cover;
    private Date last_modified;
    private String authors;
    private long size; // XXX: nulls ?
    private String format;
    private int rating; // XXX: nulls ?
    private String comments;

    private String genre_path;

    public Integer getId()
    {
        return id;
    }

    public void setId(Integer id)
    {
        this.id = id;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public String getSort()
    {
        return sort;
    }

    public void setSort(String sort)
    {
        this.sort = sort;
    }

    public Long getSeries_index()
    {
        return series_index;
    }

    public void setSeries_index(Long series_index)
    {
        this.series_index = series_index;
    }

    public String getAuthor_sort()
    {
        return author_sort;
    }

    public void setAuthor_sort(String author_sort)
    {
        this.author_sort = author_sort;
    }

    public String getIsbn()
    {
        return isbn;
    }

    public void setIsbn(String isbn)
    {
        this.isbn = isbn;
    }

    public String getLccn()
    {
        return lccn;
    }

    public void setLccn(String lccn)
    {
        this.lccn = lccn;
    }

    public String getPath()
    {
        return path;
    }

    public void setPath(String path)
    {
        this.path = path;
    }

    public Integer getFlags()
    {
        return flags;
    }

    public void setFlags(Integer flags)
    {
        this.flags = flags;
    }

    public String getUuid()
    {
        return uuid;
    }

    public void setUuid(String uuid)
    {
        this.uuid = uuid;
    }

    public Boolean getHas_cover()
    {
        return has_cover;
    }

    public void setHas_cover(Boolean has_cover)
    {
        this.has_cover = has_cover;
    }

    public Date getLast_modified()
    {
        return last_modified;
    }

    public void setLast_modified(Date last_modified)
    {
        this.last_modified = last_modified;
    }

    public String getAuthors()
    {
        return authors;
    }

    public void setAuthors(String authors)
    {
        this.authors = authors;
    }

    public long getSize()
    {
        return size;
    }

    public void setSize(long size)
    {
        this.size = size;
    }

    public String getFormat()
    {
        return format;
    }

    public void setFormat(String format)
    {
        this.format = format;
    }

    public int getRating()
    {
        return rating;
    }

    public void setRating(int rating)
    {
        this.rating = rating;
    }

    public String getComments()
    {
        return comments;
    }

    public void setComments(String comments)
    {
        this.comments = comments;
    }

}
