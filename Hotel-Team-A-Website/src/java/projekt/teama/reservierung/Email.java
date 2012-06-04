/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import projekt.fhv.teama.classes.personen.IAdresse;
import projekt.fhv.teama.classes.personen.IGast;
import projekt.fhv.teama.hibernate.dao.leistungen.ZusatzleistungDao;
import projekt.teama.reservierung.wrapper.CategoryWrapper;

/**
 * Die Klasse Email ist bei einer erfolgreichen Registrierung für die zusendung einer automatisch generierten E-mail verwantwortlich.
 * Bei Aenderung der Hotelemail Adresse muessen nur die member dieser Klasse auf die neuen Verbindungsdaten angepasst werden.
 * @author Team A
 */
public class Email {
    private static final String user = "smarthotelsystem.a@gmail.com"; //PW = shsteama
    private static final String password = "vxujhlifslsbwxbq";
    private static final String server = "smtp.gmail.com";
    private static final String port = "587";
    
    
    /**
     * Die sendMail Methode generiert eine automatische Mail die an den uebergebenen Gast verschickt wird. 
     * Dabei sind alle relevanten Reservierungsdaten an die sendMail Methode zu übergeben.
     * @param guest
     * @param categories
     * @param pet
     * @param aPackage
     * @param arrival
     * @param departure
     * @param address
     * @param land
     * @param totalCosts
     * @return boolean
     */
    boolean sendMail(IGast guest, List<CategoryWrapper> categories, boolean pet, String aPackage, String arrival, String departure, IAdresse address, String land, double totalCosts) {
        String headerFrom=new String();
        String headerTo = new String();
        
        headerFrom ="From:\nParadise Hotel\nPalma \n2034 BXU \ntel. +353 1 234 566 78 \nfax +353 1 234 566 79 \nemail " + user + "\nvisit us www.paradise.com\n\n";
        headerTo = "To:\n"+ guest.getVorname() + " " + guest.getNachname() + "\n" + address.getStrasse() + "\n" + address.getPlz() + " " + address.getOrt()+"\n\n";
        
        StringBuilder sb = new StringBuilder();
        for (CategoryWrapper category : categories) {
            sb.append(String.valueOf(category.getChosenRooms() + "x "+ category.getCat().getBezeichnung() + "\n"));
        }
        
        String salutation = "";
        if (guest.getGeschlecht() == 'F') {
            salutation =  "Dear Madam! \n\n";
        } else {
            salutation = "Dear Sir! \n\n";
        }
        String optionPet = "";
        if (pet) {
            optionPet = "pets included";
        }
        
        String sBody = headerFrom + headerTo +"\n\n"+ salutation + "You have successfully reservated:\n\n" + sb.toString() + "\n\nfrom " + arrival + " to " + departure + "\n";
        sBody=sBody+"\n\nYou have choosen the following options:\n" + aPackage + "\n" + optionPet + "\n\nTotal costs = " + totalCosts + "Euro";
        sBody+= "\n\nYours sincerely\nParadise Hotel\n\nIf you have any questions feel free to contact us!";
        
        Properties prop = System.getProperties();
        
        prop.put("mail.smtp.auth", "true");
        prop.put("mail.smtp.starttls.enable", "true");
        prop.put("mail.smtp.host", server);
        prop.put("mail.smtp.port", port);
        Authenticator auth = new Authenticator() {
            @Override
            public PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        };
        
        try {
            javax.mail.Session ses1 = Session.getInstance(prop, auth);
            MimeMessage msg = new MimeMessage(ses1);
            
            msg.setFrom(new InternetAddress(user, "Your SHS Service"));
            msg.addRecipient(Message.RecipientType.TO, new InternetAddress(guest.getEmail())); //Falls gewünscht email adresse hartcodiert eingeben
            
            msg.setSubject("Your online SHS reservation");
            msg.setText(sBody);
            
            Transport.send(msg);
        } catch (MessagingException e) {
            return false;
        } catch (UnsupportedEncodingException e) {
            return false;
        }
        return true;
    }
    
}
