package fr.polytech.info4.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Restaurant.
 */
@Entity
@Table(name = "restaurant")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Restaurant implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "adress", nullable = false)
    private String adress;

    @OneToOne
    @JoinColumn(unique = true)
    private Acount acount;

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Product> products = new HashSet<>();

    @OneToMany(mappedBy = "restaurant")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<Run> runs = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "restaurants", allowSetters = true)
    private Cooperative cooperative;

    @ManyToMany(mappedBy = "restaurants")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<Basket> baskets = new HashSet<>();

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

    public Restaurant name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAdress() {
        return adress;
    }

    public Restaurant adress(String adress) {
        this.adress = adress;
        return this;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public Acount getAcount() {
        return acount;
    }

    public Restaurant acount(Acount acount) {
        this.acount = acount;
        return this;
    }

    public void setAcount(Acount acount) {
        this.acount = acount;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public Restaurant products(Set<Product> products) {
        this.products = products;
        return this;
    }

    public Restaurant addProduct(Product product) {
        this.products.add(product);
        product.setRestaurant(this);
        return this;
    }

    public Restaurant removeProduct(Product product) {
        this.products.remove(product);
        product.setRestaurant(null);
        return this;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Run> getRuns() {
        return runs;
    }

    public Restaurant runs(Set<Run> runs) {
        this.runs = runs;
        return this;
    }

    public Restaurant addRun(Run run) {
        this.runs.add(run);
        run.setRestaurant(this);
        return this;
    }

    public Restaurant removeRun(Run run) {
        this.runs.remove(run);
        run.setRestaurant(null);
        return this;
    }

    public void setRuns(Set<Run> runs) {
        this.runs = runs;
    }

    public Cooperative getCooperative() {
        return cooperative;
    }

    public Restaurant cooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
        return this;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Set<Basket> getBaskets() {
        return baskets;
    }

    public Restaurant baskets(Set<Basket> baskets) {
        this.baskets = baskets;
        return this;
    }

    public Restaurant addBasket(Basket basket) {
        this.baskets.add(basket);
        basket.getRestaurants().add(this);
        return this;
    }

    public Restaurant removeBasket(Basket basket) {
        this.baskets.remove(basket);
        basket.getRestaurants().remove(this);
        return this;
    }

    public void setBaskets(Set<Basket> baskets) {
        this.baskets = baskets;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Restaurant)) {
            return false;
        }
        return id != null && id.equals(((Restaurant) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Restaurant{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", adress='" + getAdress() + "'" +
            "}";
    }
}
