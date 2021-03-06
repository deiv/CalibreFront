/*
 * @file PersistenceConfig.java
 *
 * @brief Persistence configuration bean for Spring
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

package org.deiv.calibrefront.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.sqlite.SQLiteConfig;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
public class PersistenceConfig {

    private static final String SQLITE_DRIVER_CLASSNAME    = "org.sqlite.JDBC";
    private static final String SQLITE_DRIVER_URL_TEMPLATE = "jdbc:sqlite:%s/metadata.db";

    @Autowired
    AppConfig appConfig;

    @Bean
    public DataSource dataSource()
    {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();
        
        dataSource.setDriverClassName(SQLITE_DRIVER_CLASSNAME);
        dataSource.setUrl(String.format(SQLITE_DRIVER_URL_TEMPLATE, appConfig.getCalibreDbDir()));

        Properties sqlLiteDriverProperties = new Properties();

        sqlLiteDriverProperties.setProperty(SQLiteConfig.Pragma.DATE_STRING_FORMAT.pragmaName, "yyyy-MM-dd HH:mm:ss.SSSXXX");
        sqlLiteDriverProperties.setProperty(SQLiteConfig.Pragma.OPEN_MODE.pragmaName, "1");

        dataSource.setConnectionProperties(sqlLiteDriverProperties);

        return dataSource;
    }
}
