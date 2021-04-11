package fr.polytech.info4.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PaymentSys.
 */
@Entity
@Table(name = "payment_sys")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PaymentSys implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "crediteur", nullable = false)
    private String crediteur;

    @NotNull
    @Column(name = "debiteur", nullable = false)
    private String debiteur;

    @NotNull
    @Column(name = "method", nullable = false)
    private String method;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "payment_sys_acount",
               joinColumns = @JoinColumn(name = "payment_sys_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "acount_id", referencedColumnName = "id"))
    private Set<Acount> acounts = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCrediteur() {
        return crediteur;
    }

    public PaymentSys crediteur(String crediteur) {
        this.crediteur = crediteur;
        return this;
    }

    public void setCrediteur(String crediteur) {
        this.crediteur = crediteur;
    }

    public String getDebiteur() {
        return debiteur;
    }

    public PaymentSys debiteur(String debiteur) {
        this.debiteur = debiteur;
        return this;
    }

    public void setDebiteur(String debiteur) {
        this.debiteur = debiteur;
    }

    public String getMethod() {
        return method;
    }

    public PaymentSys method(String method) {
        this.method = method;
        return this;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Set<Acount> getAcounts() {
        return acounts;
    }

    public PaymentSys acounts(Set<Acount> acounts) {
        this.acounts = acounts;
        return this;
    }

    public PaymentSys addAcount(Acount acount) {
        this.acounts.add(acount);
        acount.getPaymentSys().add(this);
        return this;
    }

    public PaymentSys removeAcount(Acount acount) {
        this.acounts.remove(acount);
        acount.getPaymentSys().remove(this);
        return this;
    }

    public void setAcounts(Set<Acount> acounts) {
        this.acounts = acounts;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PaymentSys)) {
            return false;
        }
        return id != null && id.equals(((PaymentSys) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PaymentSys{" +
            "id=" + getId() +
            ", crediteur='" + getCrediteur() + "'" +
            ", debiteur='" + getDebiteur() + "'" +
            ", method='" + getMethod() + "'" +
            "}";
    }
}
