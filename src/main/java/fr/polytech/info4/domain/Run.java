package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Run.
 */
@Entity
@Table(name = "run")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Run implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "client_name", nullable = false)
    private String clientName;

    @NotNull
    @Column(name = "runner_name", nullable = false)
    private String runnerName;

    @NotNull
    @Column(name = "method", nullable = false)
    private String method;

    @OneToOne
    @JoinColumn(unique = true)
    private Basket basket;

    @ManyToOne
    @JsonIgnoreProperties(value = "runs", allowSetters = true)
    private Restaurant restaurant;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientName() {
        return clientName;
    }

    public Run clientName(String clientName) {
        this.clientName = clientName;
        return this;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public String getRunnerName() {
        return runnerName;
    }

    public Run runnerName(String runnerName) {
        this.runnerName = runnerName;
        return this;
    }

    public void setRunnerName(String runnerName) {
        this.runnerName = runnerName;
    }

    public String getMethod() {
        return method;
    }

    public Run method(String method) {
        this.method = method;
        return this;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public Basket getBasket() {
        return basket;
    }

    public Run basket(Basket basket) {
        this.basket = basket;
        return this;
    }

    public void setBasket(Basket basket) {
        this.basket = basket;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public Run restaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
        return this;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Run)) {
            return false;
        }
        return id != null && id.equals(((Run) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Run{" +
            "id=" + getId() +
            ", clientName='" + getClientName() + "'" +
            ", runnerName='" + getRunnerName() + "'" +
            ", method='" + getMethod() + "'" +
            "}";
    }
}
