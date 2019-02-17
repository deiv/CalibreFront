/*
 * @file ImageUtil.java
 *
 * @brief Helper methods for images
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

package org.deiv.calibrefront.util;

import org.imgscalr.Scalr;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class ImageUtil {

    private static final int THUMBNAIL_WIDTH = 450;
    private static final int THUMBNAIL_HEIGHT = 300;

    public static BufferedImage createThumbnailFromFile(File file)
        throws IOException
    {
        BufferedImage img = ImageIO.read(file);

        return Scalr.resize(img,
                            Scalr.Method.SPEED,
                            Scalr.Mode.FIT_TO_WIDTH,
                            THUMBNAIL_WIDTH,
                            THUMBNAIL_HEIGHT,
                            Scalr.OP_ANTIALIAS);
    }
}
