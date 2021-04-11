package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class AcountTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Acount.class);
        Acount acount1 = new Acount();
        acount1.setId(1L);
        Acount acount2 = new Acount();
        acount2.setId(acount1.getId());
        assertThat(acount1).isEqualTo(acount2);
        acount2.setId(2L);
        assertThat(acount1).isNotEqualTo(acount2);
        acount1.setId(null);
        assertThat(acount1).isNotEqualTo(acount2);
    }
}
