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
import java.util.logging.Level;
import java.util.logging.Logger;
import projekt.fhv.teama.classes.personen.Land;
import projekt.fhv.teama.classes.personen.ILand;
import projekt.fhv.teama.classes.personen.IGast;
import projekt.fhv.teama.hibernate.dao.personen.GastDao;
import projekt.fhv.teama.hibernate.dao.personen.IGastDao;
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

	//Funkt git jetzt
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
    private String country;
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
    
 
    public ReservationManager() {
        try {
            IModelLand ml = new ModelLand();
            ILand l = ml.getLandByKuerzel("AT");
            this.country = l.getBezeichnung();
//          IGastDao g = GastDao.getInstance();
//          gast=g.getById(48);
//          this.firstname=gast.getFirstname();
        } catch (Exception ex) {
            ex.printStackTrace();
            gast=null;
        }
    }

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

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
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
        System.out.println("Test");
        return "reservation2";
    }
    //</editor-fold>

    public List<CategoryWrapper> getCategories() {
        List<CategoryWrapper> list = new ArrayList<CategoryWrapper>();
        try {
            for (IKategorie category : KategorieDao.getInstance().getAll()) {
                list.add(new CategoryWrapper(category, 0, getFreieZimmerAnzahl(category)));
            }
        } catch (DatabaseException ex) {
            Logger.getLogger(ReservationManager.class.getName()).log(Level.SEVERE, null, ex);
        }

        return list;
    }

    public Integer getFreieZimmerAnzahl(IKategorie category) {
        try {
            java.sql.Date ar = new java.sql.Date(dateformatter.parse(dateAdapter(getArrival())).getTime());
            java.sql.Date de = new java.sql.Date(dateformatter.parse(dateAdapter(getDeparture())).getTime());
            ModelZimmer modelzimmer = new ModelZimmer();

            return modelzimmer.getVerfügbareZimmer(category, ar, de).size();

        } catch (ParseException ex) {
            return 0;
        } catch (DatabaseException e) {
            return 0;
        }
    }

    //<editor-fold defaultstate="collapsed" desc="CategoryWrapper">
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