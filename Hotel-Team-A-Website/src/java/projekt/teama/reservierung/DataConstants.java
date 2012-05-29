/**
 * 
 */
package projekt.teama.reservierung;

import java.text.SimpleDateFormat;
import java.util.Date;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;

/**
 *
 * @author mike
 */
@ManagedBean
@SessionScoped
public class DataConstants {

	public class Option {

        private String label;
        private Integer value;

        public Option(String l, Integer v) {
            this.label = l;
            this.value = v;
        }

        public String getLabel() {
            return label;
        }

        public void setLabel(String label) {
            this.label = label;
        }

        public Integer getValue() {
            return value;
        }

        public void setValue(Integer value) {
            this.value = value;
        }
    }
    private Integer year;
    private Integer month;
    private Integer day;
    private Option[] monthList;
    private Option[] dayList;
    private Option[] yearList;

    public DataConstants() {
        year = Integer.parseInt(new SimpleDateFormat("yyyy").format(new Date()));
        month = Integer.parseInt(new SimpleDateFormat("MM").format(new Date()));
        day = Integer.parseInt(new SimpleDateFormat("dd").format(new Date()));

        monthList = new Option[]{new Option("January", 1), new Option("February", 2), new Option("March", 3), new Option("April", 4), new Option("May", 5), new Option("June", 6), new Option("July", 7), new Option("August", 8), new Option("September", 9), new Option("October", 10), new Option("November", 11), new Option("December", 12)};
        dayList = new Option[31];
        for (int i = 0; i < 31; i++) {
            dayList[i] = new Option((i + 1) + "", i + 1);
        }
        yearList = new Option[3];
        for (int i = 0; i < 3; i++) {
            yearList[i] = new Option((year + i) + "", year + i);
        }
    }

    public Option[] getMonthList() {
        return monthList;
    }

    public Integer getYear() {
        return year;
    }

    public Integer getDay() {
        return day;
    }

    public Option[] getDayList() {
        return dayList;
    }

    public Integer getMonth() {
        return month;
    }

    public Option[] getYearList() {
        return yearList;
    }
	
}
