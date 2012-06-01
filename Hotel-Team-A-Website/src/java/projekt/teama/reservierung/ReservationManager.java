/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Vector;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import projekt.fhv.teama.classes.leistungen.IZusatzleistung;
import projekt.fhv.teama.classes.personen.IAdresse;
import projekt.fhv.teama.classes.personen.IGast;
import projekt.fhv.teama.classes.personen.ILand;
import projekt.fhv.teama.classes.zimmer.*;
import projekt.fhv.teama.hibernate.dao.leistungen.IZusatzleistungDao;
import projekt.fhv.teama.hibernate.dao.leistungen.ZusatzleistungDao;
import projekt.fhv.teama.hibernate.dao.personen.*;
import projekt.fhv.teama.hibernate.dao.zimmer.*;
import projekt.fhv.teama.hibernate.exceptions.DatabaseException;
import projekt.fhv.teama.model.ModelZimmer;
import projekt.teama.reservierung.wrapper.CategoryWrapper;
import projekt.teama.reservierung.wrapper.CountryWrapper;
import projekt.teama.reservierung.wrapper.PackageWrapper;

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
    // fuer alle kategorien ein element mit kategorienamen und anzahl der freien zimmer
    private List<CategoryWrapper> categories = null;
    //Fuer den Hund
    private boolean pet = false;

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Konstuktoren">
    public ReservationManager() {
        try {
            IGastDao g = GastDao.getInstance();
            gast = g.getById(48);

            this.firstname = gast.getFirstname();
            this.lastname = gast.getNachname();
            this.email = gast.getEmail();
            this.tel = gast.getTelefonnummer();
            List<IAdresse> adr = new Vector<IAdresse>(gast.getAdressen());
            this.street = adr.get(0).getStrasse();
            this.postcode = adr.get(0).getPlz();
            this.city = adr.get(0).getOrt();
            this.country = adr.get(0).getLand().getID();

        } catch (Exception ex) {
            ex.printStackTrace();
            gast = null;
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

    //<editor-fold defaultstate="collapsed" desc="Dog">
    public boolean getPet() {
        return pet;
    }

    public void setPet(boolean pet) {
        this.pet = pet;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Set Gast">
    public IGast getGast() {
        return gast;
    }

    public void setGast(IGast gast) {
        this.gast = gast;
    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Schritte">
    public String stepOne() {
        return "reservation";
    }

    public String stepTwo() {
        if (checkDate()) {
            return "reservation2";
        } else {
            setArrival("");
            setDeparture("");
            FacesContext context = FacesContext.getCurrentInstance();  
            HttpServletRequest request = (HttpServletRequest)context.getExternalContext().getRequest();  
            HttpSession session=((HttpServletRequest)request).getSession();
            session.setAttribute("DateError", "Arrival Date after Departure Date");
            return "reservation";
        }
    }

    public String stepThree() {

        if (testIfRoomSelected()) {
            return "reservation3";
        } else {
            return "reservation2";
        }
    }

    public String finish() {
        if (saveReservationInDB()) {
            return "index";
        } else {
            FacesContext context = FacesContext.getCurrentInstance();  
            HttpServletRequest request = (HttpServletRequest)context.getExternalContext().getRequest();  
            HttpSession session=((HttpServletRequest)request).getSession();
            session.setAttribute("ErrorSave", "Database Saving Error");
            return "reservation3";
        }
    }

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Methode um Daten aus der DB zu holen">
    public List<CategoryWrapper> getCategories() {
        if (categories == null) {
            categories = new Vector<CategoryWrapper>();
            IZimmerpreisDao zpDao = ZimmerpreisDao.getInstance();
            try {
                for (IKategorie category : KategorieDao.getInstance().getAll()) {
                    List<IZimmerpreis> zimmerpreise = new Vector<IZimmerpreis>(zpDao.getAll());
                    float preisOfKategorie = 0.0f;
                    for (IZimmerpreis preis : zimmerpreise) {
                        if (preis.getKategorie().equals(category)) {
                            preisOfKategorie = preis.getPreis();
                        }
                    }
                    categories.add(new CategoryWrapper(category, 0, getAvailableRooms(category), preisOfKategorie));
                }
            } catch (DatabaseException ex) {
                Logger.getLogger(ReservationManager.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        return categories;
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

    public List<CountryWrapper> getCountries() {
        ILandDao landDao = LandDao.getInstance();
        List<ILand> countriesInDatabase = new Vector<ILand>();
        List<CountryWrapper> countries = new Vector<CountryWrapper>();
        try {
            countriesInDatabase = new Vector<ILand>(landDao.getAll());
            for (ILand country : countriesInDatabase) {
                countries.add(new CountryWrapper(country.getID(), country.getBezeichnung()));
            }
            return countries;
        } catch (DatabaseException ex) {
            return countries;
        }
    }

    public List<PackageWrapper> getPackages() {
        IZusatzleistungDao zbDao = ZusatzleistungDao.getInstance();
        List<IZusatzleistung> packagesInDatabase = new Vector<IZusatzleistung>();
        List<PackageWrapper> packages = new Vector<PackageWrapper>();
        try {
            packagesInDatabase = new Vector<IZusatzleistung>(zbDao.getAll());
            for (IZusatzleistung p : packagesInDatabase) {
                if (p.getWarengruppe().getID() == 11) {
                    packages.add(new PackageWrapper(p, p.getID(), p.getBezeichnung()));
                }
            }
            return packages;
        } catch (DatabaseException ex) {
            return packages;
        }
    }

    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Adapter">
    private String dateAdapter(String str) {
        String[] temp = new String[10];
        String delimiter = "/";
        temp = str.split(delimiter);
        if (temp.length == 3) {
            return temp[1] + "/" + temp[0] + "/" + temp[2];
        } else {
            return "20/10/1990";
        }

    }
    //</editor-fold>

    //<editor-fold defaultstate="collapsed" desc="Sonstiges">
    private boolean testIfRoomSelected() {
        int count = 0;
        for (CategoryWrapper entry : categories) {
            if (entry.getChosenRooms().equals(0)) {
                count++;
            }
        }

        if (count >= categories.size()) {
            return false;
        }

        return true;
    }

   
    private boolean checkDate() {

        try {
            java.sql.Date ar = new java.sql.Date(dateformatter.parse(dateAdapter(getArrival())).getTime());
            java.sql.Date de = new java.sql.Date(dateformatter.parse(dateAdapter(getDeparture())).getTime());

            if (ar.after(de)) {
                return false;
            } else {
                return true;
            }

        } catch (ParseException ex) {
            return false;
        }
    }
    //</editor-fold>
    
    //<editor-fold defaultstate="collapsed" desc="Speicher Methode">
    private boolean saveReservationInDB() {
        if (gast != null) {
            try {
                //Adresse Updaten
                List<IAdresse> adrs = new Vector<IAdresse>(gast.getAdressen());
                adrs.get(0).setStrasse(this.street);
                adrs.get(0).setPlz(this.postcode);
                adrs.get(0).setOrt(this.city);
                ILand land = LandDao.getInstance().getById(this.country);
                adrs.get(0).setLand(land);
                //DB aktion Adresse
                IAdresseDao adressDao = AdresseDao.getInstance();
                adressDao.update(adrs.get(0));
                
                //Gast Updaten
                this.gast.setVorname(this.firstname);
                this.gast.setNachname(this.lastname);
                this.gast.setEmail(this.email);
                this.gast.setTelefonnummer(this.tel);
                
                //DB aktion Gast
                IGastDao gastDao = GastDao.getInstance();
                gastDao.create(this.gast);
                
                //Reservierung erstellen;
                
                //Datum fuer die Reservierung
                java.sql.Date ar = new java.sql.Date(dateformatter.parse(dateAdapter(getArrival())).getTime());
                java.sql.Date de = new java.sql.Date(dateformatter.parse(dateAdapter(getDeparture())).getTime());
                
                //Zusatzleistung
                IZusatzleistungDao zlDao = ZusatzleistungDao.getInstance();
                IZusatzleistung pack = zlDao.getById(this.packageID);
                
                //Gäste der Reservierung hinzufügen
                Set<IGast> gaeste = new HashSet<IGast>();
                gaeste.add(this.gast);
                
                //Reservierung
                IReservierung res = new Reservierung(ar, de, gast, null, false, this.pet, pack, null, null, gaeste, null);
                
                IReservierungDao resDao = ReservierungDao.getInstance();
                resDao.create(res);
                
                //Teilreservierungen
                ITeilreservierungDao teilresDao = TeilreservierungDao.getInstance();
                for (CategoryWrapper entry : this.categories) {
                    if(entry.getChosenRooms()>0)
                    {
                    ITeilreservierung tres = new Teilreservierung(entry.getCat(), res, entry.getChosenRooms());
                    try {
                        teilresDao.create(tres);
                    } catch (DatabaseException ex) {
                        return false;
                    }
                    }
                }
                
                return true;
                
            } catch (DatabaseException ex) {
                return false;
            } catch (ParseException e) {
                return false;
            }
            
        }
        
        return false;
    }
    //</editor-fold>

}