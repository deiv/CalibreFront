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
