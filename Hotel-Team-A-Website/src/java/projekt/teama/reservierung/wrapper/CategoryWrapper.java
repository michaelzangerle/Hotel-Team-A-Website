/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

import java.io.Serializable;
import projekt.fhv.teama.classes.zimmer.IKategorie;

/**
 *
 * @author Team-A Erstellt am 28.06.2012 Klasse um eine Kategorie in Verbiendung
 * zur Verfuegbaren und ausgewahlten Zimmeranzahl zu setzten
 */
public class CategoryWrapper implements Serializable {

    private IKategorie cat;
    private Integer chosenRooms;
    private Integer available;
    private float cost;

    /**
     * Getter fuer die Verfuegbaren Zimmer
     *
     * @return Intger
     */
    public Integer getAvailable() {
        return available;
    }

    /**
     * Setter fuer die Verfuegbaren Zimmer
     *
     * @param available
     */
    public void setAvailable(Integer available) {
        this.available = available;
    }

    /**
     * Getter fuer die Ausgewaehlten Zimmer
     *
     * @return Intger
     */
    public Integer getChosenRooms() {
        return chosenRooms;
    }

    /**
     * Setter fuer die Ausgewaehlten Zimmer
     *
     *  * @param chosenRooms
     */
    public void setChosenRooms(Integer chosenRooms) {
        this.chosenRooms = chosenRooms;
    }

    public CategoryWrapper(IKategorie c, Integer a, Integer b, float co) {
        this.cat = c;
        this.chosenRooms = a;
        this.available = b;
        this.cost = co;
    }

    /**
     * Getter fuer die Kategorie
     *
     * @return IKategorie
     */
    public IKategorie getCat() {
        return cat;
    }

    /**
     * Setter fuer die Kategorie
     *
     *  * @param cat
     */
    public void setCat(IKategorie cat) {
        this.cat = cat;
    }

    /**
     * Getter fuer die Kosten
     *
     * @return Intger
     */
    public float getCost() {
        return cost;
    }

    /**
     * Setter fuer die Kosten
     *
     * @param cost
     */
    public void setCost(float cost) {
        this.cost = cost;
    }
}
