package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * The  Compte entity.\n@author A true hipster
 */
@ApiModel(description = "The  Compte entity.\n@author A true hipster")
@Entity
@Table(name = "acount")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Acount implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * fieldName
     */
    @NotNull
    @ApiModelProperty(value = "fieldName", required = true)
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "surname", nullable = false)
    private String surname;

    @Min(value = 0)
    @Max(value = 120)
    @Column(name = "age")
    private Integer age;

    @NotNull
    @Size(max = 16)
    @Column(name = "account_id", length = 16, nullable = false)
    private String accountID;

    @NotNull
    @Column(name = "adress", nullable = false)
    private String adress;

    @OneToMany(mappedBy = "acount")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Basket> baskets = new HashSet<>();

    @OneToOne(mappedBy = "acount")
    @JsonIgnore
    private Restaurant restaurant;

    @ManyToOne
    @JsonIgnoreProperties(value = "acounts", allowSetters = true)
    private Role role;

    @ManyToMany(mappedBy = "acounts")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<PaymentSys> paymentSys = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Acount name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Acount surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Integer getAge() {
        return age;
    }

    public Acount age(Integer age) {
        this.age = age;
        return this;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getAccountID() {
        return accountID;
    }

    public Acount accountID(String accountID) {
        this.accountID = accountID;
        return this;
    }

    public void setAccountID(String accountID) {
        this.accountID = accountID;
    }

    public String getAdress() {
        return adress;
    }

    public Acount adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public Acount baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public Acount addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.setAcount(this);
        return this;
    }

    public Acount removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.setAcount(null);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Acount restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public Role getRole() {
        return role;
    }

    public Acount role(Role role) {
        this.role = role;
        return this;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Set<PaymentSys> getPaymentSys() {
        return paymentSys;
    }

    public Acount paymentSys(Set<PaymentSys> paymentSys) {
        this.paymentSys = paymentSys;
        return this;
    }

    public Acount addPaymentSys(PaymentSys paymentSys) {
        this.paymentSys.add(paymentSys);
        paymentSys.getAcounts().add(this);
        return this;
    }

    public Acount removePaymentSys(PaymentSys paymentSys) {
        this.paymentSys.remove(paymentSys);
        paymentSys.getAcounts().remove(this);
        return this;
    }

    public void setPaymentSys(Set<PaymentSys> paymentSys) {
        this.paymentSys = paymentSys;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Acount)) {
            return false;
        }
        return id != null && id.equals(((Acount) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Acount{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", age=" + getAge() +
            ", accountID='" + getAccountID() + "'" +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
