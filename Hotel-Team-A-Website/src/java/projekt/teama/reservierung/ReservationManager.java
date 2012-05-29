/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

import java.text.SimpleDateFormat;
import java.util.Date;

import projekt.fhv.teama.classes.zimmer.IKategorie;

/**
 *
 * @author mike
 */
@ManagedBean
@SessionScoped
public class ReservationManager {

	
	 private Integer arivalYear;
	 private Integer arivalMonth;
	 private Integer arivalDay;
	 private Integer departureYear;
	 private Integer departureMonth;
	 private Integer departureDay;
	 private Integer packageID = null;
	 
	 private SimpleDateFormat dateformatter = new SimpleDateFormat("dd/MM/yyyy");
	 
	 
	    public ReservationManager() {
	        arivalYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()));
	        arivalMonth = Integer.parseInt(new SimpleDateFormat("MM").format(new Date()));
	        arivalDay = Integer.parseInt(new SimpleDateFormat("dd").format(new Date()));

	        departureYear = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()));
	        departureMonth = Integer.parseInt(new SimpleDateFormat("MM").format(new Date()));
	        departureDay = Integer.parseInt(new SimpleDateFormat("dd").format(new Date()));
	    }
            

	 
	 
	 public Integer getArivalYear() {
		return arivalYear;
	}



	public void setArivalYear(Integer arivalYear) {
		this.arivalYear = arivalYear;
	}



	public Integer getArivalMonth() {
		return arivalMonth;
	}



	public void setArivalMonth(Integer arivalMonth) {
		this.arivalMonth = arivalMonth;
	}



	public Integer getArivalDay() {
		return arivalDay;
	}



	public void setArivalDay(Integer arivalDay) {
		this.arivalDay = arivalDay;
	}



	public Integer getDepartureYear() {
		return departureYear;
	}



	public void setDepartureYear(Integer departureYear) {
		this.departureYear = departureYear;
	}



	public Integer getDepartureMonth() {
		return departureMonth;
	}



	public void setDepartureMonth(Integer departureMonth) {
		this.departureMonth = departureMonth;
	}



	public Integer getDepartureDay() {
		return departureDay;
	}



	public void setDepartureDay(Integer departureDay) {
		this.departureDay = departureDay;
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

