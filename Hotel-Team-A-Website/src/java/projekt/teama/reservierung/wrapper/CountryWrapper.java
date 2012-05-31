/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

/**
 *
 * @author GIGI
 */
    public class CountryWrapper {
    
        private Integer countryId;
        private String description;

        public CountryWrapper(Integer countryId, String description) {
            this.countryId = countryId;
            this.description = description;
        }

        public Integer getCountryId() {
            return countryId;
        }

        public void setCountryId(Integer countryId) {
            this.countryId = countryId;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        } 
    }
