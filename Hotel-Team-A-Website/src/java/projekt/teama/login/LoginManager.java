/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.login;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.ManagedProperty;
import javax.faces.bean.RequestScoped;
import projekt.teama.reservierung.ReservationManager;

/**
 *
 * @author GIGI
 */
@ManagedBean
@RequestScoped
public class LoginManager {

    private String useremail = "kai.likes@to.ko";
    private String password = "1234";
    private boolean loggedin = false;
    
    @ManagedProperty(value = "#{reservationManager}")
    private ReservationManager reservationManager;
    
    public LoginManager() {
        
    }

    public boolean isLoggedin() {
        return loggedin;
    }

    public void setLoggedin(boolean loggedin) {
        this.loggedin = loggedin;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUseremail() {
        return useremail;
    }

    public void setUseremail(String useremail) {
        this.useremail = useremail;
    }
    
    
    
}
