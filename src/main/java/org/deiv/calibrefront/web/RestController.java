/*
 * @file RestController.java
 *
 * @brief Rest controller for books
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

package org.deiv.calibrefront.web;

import org.deiv.calibrefront.domain.dto.Book;
import org.deiv.calibrefront.domain.mapper.BookMapper;
import org.deiv.calibrefront.util.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private BookMapper bookMapper;

    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public ResponseEntity root()
    {
        List<Book> list = bookMapper.findAll();

        return  ResponseEntity.ok(list);
    }

    @RequestMapping(value = "/book/image/{id}", method = RequestMethod.GET)
    public void getImageAsResponseEntity(@PathVariable("id") long id, HttpServletResponse response)
    {
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);

        try {
            File image;
            String coverPath = bookMapper.getBookCoverPath(id);

            if (coverPath == null) {
                image = ResourceUtils.getFile("classpath:images/book-404.jpg");

            } else {
                image = new File(String.format("%s\\cover.jpg", coverPath));
            }

            ImageIO.write(ImageUtil.createThumbnailFromFile(image), "jpeg", response.getOutputStream());

        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
