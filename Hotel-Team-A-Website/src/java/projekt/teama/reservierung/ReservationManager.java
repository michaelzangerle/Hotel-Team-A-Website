/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import projekt.fhv.teama.classes.zimmer.IKategorie;
import java.util.List;
import java.util.ArrayList;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import projekt.fhv.teama.classes.personen.IAdresse;
import projekt.fhv.teama.classes.personen.Land;
import projekt.fhv.teama.classes.personen.ILand;
import projekt.fhv.teama.classes.personen.IGast;
import projekt.fhv.teama.hibernate.dao.personen.GastDao;
import projekt.fhv.teama.hibernate.dao.personen.IGastDao;
import projekt.fhv.teama.hibernate.dao.personen.ILandDao;
import projekt.fhv.teama.hibernate.dao.personen.LandDao;
import projekt.fhv.teama.hibernate.dao.zimmer.KategorieDao;
import projekt.fhv.teama.hibernate.exceptions.DatabaseException;
import projekt.fhv.teama.model.ModelZimmer;
import projekt.fhv.teama.model.ModelLand;
import projekt.fhv.teama.model.interfaces.IModelLand;

/**
 *
 * @author mike
 */
@ManagedBean
@SessionScoped
public class ReservationManager implements Serializable {

    //<editor-fold defaultstate="collapsed" desc="Filds und Ko">
    //Zeitraum
    private String arrival;
    private String departure;
    //Gastdaten
    
    //Gast
    private IGast gast;
    private String firstname;
    private String lastname;
    private String email;
    private String tel;
    //Addressdaten
    private String street;
    private String postcode;
    private Integer country;
    private String city;
    private String iban;
    private String bic;
    private String blz;
    private String accountnumber;
    //Packete
    private Integer packageID = null;
    //Sonstiges - Datum kommt als mm/dd/yyyy
    private SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");
    // für alle kategorien ein element mit kategorienamen und anzahl der freien zimmer
    //</editor-fold>
    
    
    //<editor-fold defaultstate="collapsed" desc="Konstuktoren">
    public ReservationManager() {
        try {
            IGastDao g = GastDao.getInstance();
            gast=g.getById(48);
            
            this.firstname=gast.getFirstname();
            this.lastname=gast.getNachname();
            this.email=gast.getEmail();
            this.tel=gast.getTelefonnummer();
            List<IAdresse> adr=new Vector<IAdresse>(gast.getAdressen());
            this.street=adr.get(0).getStrasse();
            this.postcode=adr.get(0).getPlz();
            this.city=adr.get(0).getOrt();
            this.country=adr.get(0).getLand().getID();
            
        } catch (Exception ex) {
            ex.printStackTrace();
            gast=null;
        }
    }
    //</editor-fold>
    

    //<editor-fold defaultstate="collapsed" desc="Timespan für den Aufenhalt">
    public String getArrival() {
        return arrival;
    }

    public void setArrival(String arrival) {
        this.arrival = arrival;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Kontodaten">
    public String getAccountnumber() {
        return accountnumber;
    }

    public void setAccountnumber(String accountnumber) {
        this.accountnumber = accountnumber;
    }

    public String getBic() {
        return bic;
    }

    public void setBic(String bic) {
        this.bic = bic;
    }

    public String getBlz() {
        return blz;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public void setBlz(String blz) {
        this.blz = blz;
    }
//</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Gastdaten">
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getCountry() {
        return country;
    }

    public void setCountry(Integer country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Zusatzleistungen">
    public Integer getPackageID() {
        return packageID;
    }

    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Schritte">
     public String stepOne() {
        return "reservation";
    }
    public String stepTwo() {
        return "reservation2";
    }
        public String stepThree() {
        return "reservation3";
    }
    
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Methode um Daten aus der DB zu holen">
    public List<CategoryWrapper> getCategories() {
        List<CategoryWrapper> list = new ArrayList<CategoryWrapper>();
        try {
            for (IKategorie category : KategorieDao.getInstance().getAll()) {
                list.add(new CategoryWrapper(category, 0, getAvailableRooms(category)));
            }
        } catch (DatabaseException ex) {
            Logger.getLogger(ReservationManager.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return list;
    }
    
    public Integer getAvailableRooms(IKategorie category) {
        try {
            java.sql.Date ar = new java.sql.Date(dateformatter.parse(dateAdapter(getArrival())).getTime());
            java.sql.Date de = new java.sql.Date(dateformatter.parse(dateAdapter(getDeparture())).getTime());
            ModelZimmer modelzimmer = new ModelZimmer();
            
            return modelzimmer.getVerfuegbareZimmer(category, ar, de).size();
            
        } catch (ParseException ex) {
            return 0;
        } catch (DatabaseException e) {
            return 0;
        }
    }
    
      public List<CountryWrapper> getCountries()
    {
        ILandDao landDao=LandDao.getInstance();
        List<ILand> countriesInDatabase=new Vector<ILand>();
        List<CountryWrapper> countries=new Vector<CountryWrapper>();
        try {
           countriesInDatabase=new Vector<ILand>(landDao.getAll());
            for (ILand country : countriesInDatabase) {
                countries.add(new CountryWrapper(country.getID(), country.getBezeichnung()));
            }
           return countries;
        } catch (DatabaseException ex) {
           return countries;
        }
    }
    
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Wrapper">
    public class CategoryWrapper {

        private IKategorie cat;
        private Integer chosenRooms;
        private Integer available;

        public Integer getAvailable() {
            return available;
        }

        public void setAvailable(Integer available) {
            this.available = available;
        }

        public Integer getChosenRooms() {
            return chosenRooms;
        }

        public void setChosenRooms(Integer chosenRooms) {
            this.chosenRooms = chosenRooms;
        }

        public CategoryWrapper(IKategorie c, Integer a, Integer b) {
            this.cat = c;
            this.chosenRooms = a;
            this.available = b;
        }

        public IKategorie getCat() {
            return cat;
        }

        public void setCat(IKategorie cat) {
            this.cat = cat;
        }
    }

    public class CountryWrapper{
    
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
//</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Adapter">
    private String dateAdapter(String str) {
        String[] temp = new String[10];
        String delimiter = "/";
        temp = str.split(delimiter);
        if(temp.length==3)
            return temp[1] + "/" + temp[0] + "/" + temp[2];
        else
            return "20/10/1990";
        
    }
    //</editor-fold>


    
  
}