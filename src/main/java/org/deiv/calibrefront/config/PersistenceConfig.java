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

    @Autowired
    PersistenceProperties persistenceProperties;

    @Bean
    public DataSource dataSource()
    {
        final DriverManagerDataSource dataSource = new DriverManagerDataSource();

        dataSource.setDriverClassName(persistenceProperties.getDriver());
        dataSource.setUrl(persistenceProperties.getUrl());

        Properties sqlLiteDriverProperties = new Properties();
        sqlLiteDriverProperties.setProperty(SQLiteConfig.Pragma.DATE_STRING_FORMAT.pragmaName, "yyyy-MM-dd HH:mm:ss.SSSXXX");
        dataSource.setConnectionProperties(sqlLiteDriverProperties);

        return dataSource;
    }
}
