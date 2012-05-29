/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import projekt.fhv.teama.classes.zimmer.IKategorie;

/**
 *
 * @author mike
 */
@ManagedBean
@SessionScoped
public class ReservationManager implements Serializable {

    //Zeitraum
    private String arrival;
    private String departure;
    //Gastdaten
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
    //Sonstiges
    private SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");

    public ReservationManager() {
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

//    public List<KategorieAuswahl> getCategories() {
//        List<KategorieAuswahl> list = new ArrayList<KategorieAuswahl>();
////        for (IKategorie categorie : KategorieDao.getInstance().getAll()) {
////            list.add(new KategorieAuswahl(categorie, 0));
////        }
//        
//        return list;
//    }
//    public Integer getFreieZimmerAnzahl(IKategorie categorie) {
////        try {
////        	java.sql.Date arival = new java.sql.Date(dateformatter.parse(arivalDay + "/" + arivalMonth + "/" + arivalYear).getTime());
////            java.sql.Date departure = new java.sql.Date(dateformatter.parse(departureDay + "/" + departureMonth + "/" + departureYear).getTime());
////            
////            ModelZimmer modelzimmer=new ModelZimmer();
////            
////          return  modelzimmer.getVerfügbareZimmer(categorie, arival, departure).size();
//        	
//            
////        } catch (ParseException ex) {
////            //TODO Auto-generated catch block
////        	return 0;
////        } catch (DatabaseException e) {
////			// TODO Auto-generated catch block
////        	return 0;
////		}
//        	
//        	return 1;
//    }
    public class KategorieAuswahl {

        private IKategorie cat;
        private Integer amount;

        public KategorieAuswahl(IKategorie c, Integer a) {
            this.cat = c;
            this.amount = a;
        }

        public Integer getAmount() {
            return amount;
        }

        public void setAmount(Integer amount) {
            this.amount = amount;
        }

        public IKategorie getCat() {
            return cat;
        }

        public void setCat(IKategorie cat) {
            this.cat = cat;
        }
    }
}
