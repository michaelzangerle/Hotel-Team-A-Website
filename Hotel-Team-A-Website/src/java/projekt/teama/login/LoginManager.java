/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.login;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import java.util.Set;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import projekt.fhv.teama.classes.personen.IGast;
import projekt.fhv.teama.hibernate.dao.personen.GastDao;
import projekt.teama.reservierung.ReservationManager;

/**
 *
 * @author Team-A
 * Erstellt am 01.06.2012
 * Bean fuer die Steuerung des Login Vorgangen
 */
@ManagedBean
@SessionScoped
public class LoginManager {

    //<editor-fold defaultstate="collapsed" desc="properties">
    private String useremail;
    private String password;
    private IGast guest;
    private HttpSession session;
    @ManagedProperty(value = "#{reservationManager}")
    private ReservationManager reservationManager;
    //</editor-fold>

    public LoginManager() {
        FacesContext context = FacesContext.getCurrentInstance();
        HttpServletRequest request = (HttpServletRequest) context.getExternalContext().getRequest();
        this.session = ((HttpServletRequest) request).getSession();
    }

    /**
     * Methode um zu Ueberpruefen ob ein Gast sich erfolgreich einloggen kann
     * @return String
     */
    public String checkLogin() {

        boolean validLoginData = getGuest();

        if (validLoginData) {
            this.session.setAttribute("loggedIn", true);
            this.reservationManager.setGuest(this.guest);
        } else {
            this.session.setAttribute("loggedIn", false);
        }

        return "reservation";
    }

    /**
     * Methode um sich wieder auszuloggen
     * @return 
     */
    public String logOut() {
        this.useremail = "";
        this.password = "";

        this.session.removeAttribute("loggedIn");
        this.session.removeAttribute("guest");
        return "reservation";
    }

    //<editor-fold defaultstate="collapsed" desc="getter und setter">
    /**
     * Getter fuer das Password
     * @return String
     */
    public String getPassword() {
        return password;
    }

    /**
     * Setter fuer das Password
     * @param password 
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Getter fuer den Username  (Email)
     * @return String
     */
    public String getUseremail() {
        return useremail;
    }
    /**
     * Setter fuer den Username (Email)
     * @param useremail 
     */
    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }

    /**
     * Getter fuer den ReservationManager
     * @return ReservationManager
     */
    public ReservationManager getReservationManager() {
        return reservationManager;
    }

    /**
     * Setter fuer den Reservation Manager
     * @param reservationManager 
     */
    public void setReservationManager(ReservationManager reservationManager) {
        this.reservationManager = reservationManager;
    }
    //</editor-fold>

    /**
     * Methode um einen Gast aus der Datenbank anhand seines Passwortes und seines Usernamens
     * @return boolean
     */
    private boolean getGuest() {

        try {
            Set<IGast> guests = GastDao.getInstance().getAll();
            for (IGast g : guests) {
                if (g.getEmail().equals(this.useremail) && g.getPasswort().equals(this.password)) {
                    this.guest = g;
                    return true;
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
