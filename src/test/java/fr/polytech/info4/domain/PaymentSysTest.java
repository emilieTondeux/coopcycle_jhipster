package fr.polytech.info4.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import fr.polytech.info4.web.rest.TestUtil;

public class PaymentSysTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PaymentSys.class);
        PaymentSys paymentSys1 = new PaymentSys();
        paymentSys1.setId(1L);
        PaymentSys paymentSys2 = new PaymentSys();
        paymentSys2.setId(paymentSys1.getId());
        assertThat(paymentSys1).isEqualTo(paymentSys2);
        paymentSys2.setId(2L);
        assertThat(paymentSys1).isNotEqualTo(paymentSys2);
        paymentSys1.setId(null);
        assertThat(paymentSys1).isNotEqualTo(paymentSys2);
    }
}
