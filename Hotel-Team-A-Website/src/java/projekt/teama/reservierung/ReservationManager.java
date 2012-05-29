/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import java.io.Serializable;
import java.text.SimpleDateFormat;

import projekt.fhv.teama.classes.zimmer.IKategorie;

/**
 *
 * @author mike
 */
@ManagedBean
@SessionScoped
public class ReservationManager implements Serializable{

    private String arrival;
    private String departure;


    private Integer packageID = null;
    private SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");

    public ReservationManager() {

    }

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

    public Integer getPackageID() {
        return packageID;
    }

    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }

    public String stepOne() {
        System.out.println("Test");
        return "Ok";
    }

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
