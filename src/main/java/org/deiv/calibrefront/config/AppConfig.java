package org.deiv.calibrefront.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:application.properties")
public class AppConfig {

    @Value("${calibre.db.dir}")
    private String calibreDbDir;

    public String getCalibreDbDir()
    {
        return calibreDbDir;
    }

    public void setCalibreDbDir(String calibreDbDir)
    {
        this.calibreDbDir = calibreDbDir;
    }

}
