/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

import java.io.Serializable;
import projekt.fhv.teama.classes.leistungen.IZusatzleistung;

/**
 *
 * @author GIGI
 */
 public class PackageWrapper implements Serializable{

        private IZusatzleistung packet;
        private Integer packageID;
        private String description;

        public PackageWrapper(IZusatzleistung packet, Integer packageID, String description) {
            this.packet = packet;
            this.packageID = packageID;
            this.description = description;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Integer getPackageID() {
            return packageID;
        }

        public void setPackageID(Integer packageID) {
            this.packageID = packageID;
        }

        public IZusatzleistung getPacket() {
            return packet;
        }

        public void setPacket(IZusatzleistung packet) {
            this.packet = packet;
        }
    }
