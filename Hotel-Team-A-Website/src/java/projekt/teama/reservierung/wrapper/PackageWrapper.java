/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

import java.io.Serializable;
import projekt.fhv.teama.classes.leistungen.IZusatzleistung;

/**
 *
 * @author Team-A Erstellt am 28.06.2012 Um ein Paket zu Wrappen
 */
public class PackageWrapper implements Serializable {

    private IZusatzleistung packet;
    private Integer packageID;
    private String description;

    public PackageWrapper(IZusatzleistung packet, Integer packageID, String description) {
        this.packet = packet;
        this.packageID = packageID;
        this.description = description;
    }

    /**
     * Getter Paket Beschreibung
     *
     * @return String
     */
    public String getDescription() {
        return description;
    }

    /**
     * Setter Paket Beschreibung
     *
     * @param description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Getter Paket Id
     *
     * @return Integer
     */
    public Integer getPackageID() {
        return packageID;
    }

    /**
     * Setter Paket ID
     *
     * @param packageID
     */
    public void setPackageID(Integer packageID) {
        this.packageID = packageID;
    }

    /**
     * Getter fuer das Paket
     *
     * @return IZusatzleistung
     */
    public IZusatzleistung getPacket() {
        return packet;
    }

    /**
     * Setter uer das Paket
     *
     * @param packet
     */
    public void setPacket(IZusatzleistung packet) {
        this.packet = packet;
    }
}
