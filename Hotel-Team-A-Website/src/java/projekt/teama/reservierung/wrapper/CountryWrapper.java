/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

import java.io.Serializable;

/**
 *
 * @author Team-A Erstellt am 28.06.2012 Methode um die Land ID und die Land
 * Bezeichung zu Wrappen
 */
public class CountryWrapper implements Serializable {

    private Integer countryId;
    private String description;

    public CountryWrapper(Integer countryId, String description) {
        this.countryId = countryId;
        this.description = description;
    }

    /**
     * Getter fuer die LandID
     *
     * @return Integer
     */
    public Integer getCountryId() {
        return countryId;
    }

    /**
     * Setter fur die Land ID
     *
     * @param countryId
     */
    public void setCountryId(Integer countryId) {
        this.countryId = countryId;
    }

    /**
     * Getter fuer die Landbezeichnung
     *
     * @return String
     */
    public String getDescription() {
        return description;
    }

    /**
     * Setter fur die Land Beschreibung
     *
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }
}
