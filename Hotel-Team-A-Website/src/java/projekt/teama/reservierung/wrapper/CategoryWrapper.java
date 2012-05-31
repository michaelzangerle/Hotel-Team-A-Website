/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package projekt.teama.reservierung.wrapper;

import java.io.Serializable;
import projekt.fhv.teama.classes.zimmer.IKategorie;

/**
 *
 * @author GIGI
 */
public class CategoryWrapper implements Serializable{

        private IKategorie cat;
        private Integer chosenRooms;
        private Integer available;
        private float cost;

        public Integer getAvailable() {
            return available;
        }

        public void setAvailable(Integer available) {
            this.available = available;
        }

        public Integer getChosenRooms() {
            return chosenRooms;
        }

        public void setChosenRooms(Integer chosenRooms) {
            this.chosenRooms = chosenRooms;
        }

        public CategoryWrapper(IKategorie c, Integer a, Integer b,float co) {
            this.cat = c;
            this.chosenRooms = a;
            this.available = b;
            this.cost=co;
        }

        public IKategorie getCat() {
            return cat;
        }

        public void setCat(IKategorie cat) {
            this.cat = cat;
        }

        public float getCost() {
            return cost;
        }

        public void setCost(float cost) {
            this.cost = cost;
        }
        
    }

